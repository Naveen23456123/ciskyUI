import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';;
import { InvoiceService } from '@app/invoice-control/invoice.service';
import { ManageOfficeRentComponent } from '@app/shared/components/invoices/boq/manage-office-rent/manage-office-rent.component';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-boq-office-rent-list',
  standalone: false,
  templateUrl: './boq-office-rent-list.component.html',
  styleUrl: './boq-office-rent-list.component.scss'
})
export class BoqOfficeRentListComponent {
  data: any[] = [];
  isLoading = true;
  description = '';
  dataColumn: string[] = ['serial', 'desc', 'month', 'ratemonth', 'amount'];
  footerColumns: string[] = ['serial', 'amount'];
  dataSource!: MatTableDataSource<any[]>;
  @Output() onAmountChange: EventEmitter<any> = new EventEmitter();
  @Input() pagePermissions: any = {};
  readonly dialog = inject(MatDialog);

  private defaultdialogoptions: MatDialogConfig = {
    minWidth: '900px',
    disableClose: false,
    data: {},
  };

  constructor(private invoiceService: InvoiceService, private helperService: HelperService,
    private stateDataService: StateDataService, private notifyBarService: NotifyBarService,
    private sessionService: SessionService
  ) {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit() {
    this.stateDataService.stateDataSubject.subscribe((data) => {
      if (data.event == 'oredit' && data.valid && data.value) {
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'oradd' && data.valid && data.value) {
        this.addRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'ordelete' && data.valid && data.value) {
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
    });
    if (this.pagePermissions?.canUpdate || this.pagePermissions?.canDelete) {
      this.dataColumn.push('action');
      this.footerColumns.push('action');
    }
    this.sessionService.projectEntitySubject$.pipe(take(1)).subscribe((projectEntity: any) => {
      if (projectEntity && projectEntity.projectId) {
        this.invoiceService.getBoqOfficeRentListByProjectId({ id: projectEntity.projectId }, '')
          .pipe(finalize(() => this.isLoading = false))
          .subscribe((response: any) => {
            if (response && response.success && response.data) {
              this.description = response.data.description;
              this.data = response.data.scopes;
              this.dataSource = new MatTableDataSource(this.data);
              this.getTotalAmount();
            }
          });
      }
    });

  }
  updateRowData(data: any) {
    const element: any = this.dataSource.data.find((x: any) => x.id == data.id);
    if (element) {
      element.id = data.id;
      element.projectid = data.projectid,
        element.description = data.description,
        element.totalamount = data.totalamount,
        element.numberofmonths = data.numberofmonths,
        element.ratepermonth = data.ratepermonth,
        this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(data: any) {
    const data1: any = {
      id: data.id,
      projectid: data.projectid,
      description: data.description,
      totalamount: data.totalamount,
      numberofmonths: data.numberofmonths,
      ratepermonth: data.ratepermonth,
    }
    this.dataSource.data.unshift(data1);
    this.dataSource._updateChangeSubscription();
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x: any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  getTotalAmount() {
    let total = this.data.map(t => t.totalamount).reduce((acc, value) => acc + value, 0);
    this.onAmountChange.emit(total);
    return total;
  }
  add_desc() {
    this.sessionService.projectEntitySubject$.pipe(take(1)).subscribe((projectEntity: any) => {
      if (projectEntity && projectEntity.projectId) {
        const config = this.defaultdialogoptions;
        config.minWidth = '45vw';
        config.data = {
          type: 'heading',
          element: {
            invoiceId: projectEntity.invoiceId,
            description: this.description
          }
        };
        const dialogRef = this.dialog.open(ManageOfficeRentComponent, config);
        dialogRef.afterClosed().subscribe((data) => {
          if (data && data.valid) {
            this.description = data.value.description;
            this.notifyBarService.showsnackbar('The Description updated successfully.');
          }
        });
      }
    });
  }
}





