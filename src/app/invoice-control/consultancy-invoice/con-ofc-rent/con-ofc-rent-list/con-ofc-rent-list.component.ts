import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';;
import { InvoiceService } from '@app/invoice-control/invoice.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-con-ofc-rent-list',
  standalone: false,
  templateUrl: './con-ofc-rent-list.component.html',
  styleUrl: './con-ofc-rent-list.component.scss'
})
export class ConOfcRentListComponent {
  data: any[] = [];
  isLoading = true;
  headerColumn: string[] = ['no', 'descth', 'ctrtamt', 'previousinvc', 'currentinvc', 'cumulativeinvc', 'reminvc'];
  dataColumn: string[] = ['serial', 'desc', 'months', 'rate', 'totalamt', 'prev_month', 'prev_amt', 'curr_month', 'curr_amt', 'comlt_month', 'comlt_amt', 'rem_month', 'rem_amt'];
  footerColumns: string[] = ['serial', 'amount'];
  dataSource!: MatTableDataSource<any[]>;
  @Input() pagePermissions: any;
  @Output() onAmountChange: EventEmitter<any> = new EventEmitter();
  readonly dialog = inject(MatDialog);
  amount: any | null;

  private defaultdialogoptions: MatDialogConfig = {
    minWidth: '900px',
    disableClose: false,
    data: {},
  };

  constructor(private invoiceService: InvoiceService, private helperService: HelperService,
    private stateDataService: StateDataService, private notifyBarService: NotifyBarService,
    private sessionService: SessionService
  ) {

  }

  ngOnInit() {
    this.stateDataService.stateDataSubject.subscribe((data) => {
      if (data.event == 'conoredit' && data.valid && data.value) {
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'conoradd' && data.valid && data.value) {
        this.addBulkData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'conordelete' && data.valid && data.value) {
        this.deleteRow(data);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
      this.getTotalAmount();
    });
    if (this.pagePermissions?.canUpdate || this.pagePermissions?.canDelete) {
      this.headerColumn.push('actionth');
      this.dataColumn.push('action');
      this.footerColumns.push('action');
    }
    this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((invEntity: any) => {
      if (invEntity && invEntity.invoiceId) {
        this.invoiceService.getOfcRentScopeByProjectId({ id: invEntity.invoiceId, projectid: invEntity.projectId }, '')
          .pipe(finalize(() => this.isLoading = false))
          .subscribe((response: any) => {
            if (response && response.success) {
              let rentData = response.data.map((data: any) => ({
                id: data.id,
                description: data.description,
                rate: data.rate,
                months: data.months,
                invoiceid: data.invoiceid,
                previousbillmonths: data.previousbillmonths,
                currentbillmonths: data.currentbillmonths,
                contractamount: this.getattributes(data).contractamount,
                previousbill: this.getattributes(data).previousbill,
                currentbill: this.getattributes(data).currentbill,
                commulativemonth: this.getattributes(data).commulativemonth,
                commulativeamount: this.getattributes(data).commulativeamount,
                remainingmonth: this.getattributes(data).remainingmonth,
                remainingamount: this.getattributes(data).remainingamount
              }));
              this.data = rentData;
              this.dataSource = new MatTableDataSource(this.data);
              this.getTotalAmount();
            }
          });
      }
    });
  }

  getattributes(data: any) {
    return {
      contractamount: data.months * data.rate,
      previousbill: data.previousbillmonths * data.rate,
      currentbill: data.currentbillmonths * data.rate,
      commulativemonth: data.previousbillmonths + data.currentbillmonths,
      commulativeamount: (data.previousbillmonths + data.currentbillmonths) * data.rate,
      remainingmonth: (data.months) - (data.previousbillmonths + data.currentbillmonths),
      remainingamount: ((data.months) * data.rate) - ((data.previousbillmonths + data.currentbillmonths) * data.rate)
    }
  }


  updateRowData(data: any) {
    const element: any = this.dataSource.data.find((x: any) => x.id == data.boqid);
    if (element) {
      element.currentbillmonths = data.currentbillmonths;
    }
    this.bindBilling(element);
    this.dataSource._updateChangeSubscription();
  }

  addBulkData(data: any) {
    data.forEach((element: any) => {
      this.addRowData(element);
    });
  }

  addRowData(data: any) {

    const data1: any = {
      id: data.boqid,
      description: data.description,
      rate: data.rate,
      months: data.months,
      currentbillmonths: data.currentbillmonths,
      previousbillmonths: data.previousbillmonths,
      invoiceid: data.invoiceid,
    }
    this.bindBilling(data1);
    console.log(data1);
    this.dataSource.data.unshift(data1);
    this.dataSource._updateChangeSubscription();
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x: any) => x.id == data.value.scopeid);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }


  bindBilling(data: any) {
    data.contractamount = data.months * data.rate,
      data.previousbill = data.previousbillmonths * data.rate,
      data.currentbill = data.currentbillmonths * data.rate,
      data.commulativemonth = data.previousbillmonths + data.currentbillmonths,
      data.commulativeamount = (data.previousbillmonths + data.currentbillmonths) * data.rate,
      data.remainingmonth = (data.months) - (data.previousbillmonths + data.currentbillmonths),
      data.remainingamount = ((data.months) * data.rate) - ((data.previousbillmonths + data.currentbillmonths) * data.rate)
  }
  getTotalAmount(): any | null {
    if (this.dataSource && this.dataSource.data) {
      this.amount = {
        total: this.dataSource.data.map((t: any) => t.contractamount).reduce((acc, value) => acc + value, 0),
        previous: this.dataSource.data.map((t: any) => t.previousbill).reduce((acc, value) => acc + value, 0),
        current: this.dataSource.data.map((t: any) => t.currentbill).reduce((acc, value) => acc + value, 0),
        commulative: this.dataSource.data.map((t: any) => t.commulativeamount).reduce((acc, value) => acc + value, 0),
        remaining: this.dataSource.data.map((t: any) => t.remainingamount).reduce((acc, value) => acc + value, 0)
      }
    }
    this.onAmountChange.emit(this.amount);
    return this.amount;
  }
}






