import { group } from '@angular/animations';
import { Component, ElementRef, inject, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogOperation, TOTAL_PROFIT_LOSS_HEADING } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { ProfitLossInterfaceService } from '@app/shared/services/external/profit-loss-interface.service';
import { GeneratePdfService } from '@app/shared/services/generate-pdf.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, forkJoin, take } from 'rxjs';
import { PdfViewerComponent } from '../../pdf-viewer/pdf-viewer.component';
export type Row = { type: 'group'; label: string, id: string, key: string } | {
  id?: string;
  type?: 'data' | 'totalinfo' | 'totalfooter' | 'totalSeparate';
  name?: string;
  isEditing?: boolean,
  actualamount?: number;
  previousexpenditure?: number;
  group?: string;
  isincome?: boolean;
  noteno?: string;
  order?: number;
};
@Component({
  selector: 'app-profit-loss-commulative',
  standalone: false,
  templateUrl: './profit-loss-commulative.component.html',
  styleUrl: './profit-loss-commulative.component.scss'
})
export class ProfitLossCommulativeComponent {
  public data: any;
  isPdfGenerating = false; 
  displayedColumns: string[] = ['name', 'actualamount'];
  isLoading = true;
  scopes: any[] = [];
  dataRecords: any[] = [];
  scopeLoaded = false;
  currentTotalIncome = 0;
  currentTotalExpense = 0;
  previousTotalIncome = 0;
  previousTotalExpense = 0;
  dataSource: Row[] = [];
  profitLossData: any;
  emptyData = false;
  readonly dialog = inject(MatDialog);
  private defaultdialogoptions: MatDialogConfig = {
    disableClose: false,
    data: {},
  };
  dataObj: any = { today: new Date() };
  footerRow: string = 'totalfooter';
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  keyToGroup: any[] = TOTAL_PROFIT_LOSS_HEADING;
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private profitLossService: ProfitLossInterfaceService, private sessionService: SessionService,
    private commonService: CommonService, private pdfService: GeneratePdfService
  ) {
    this.data = data || {};
  }
  ngOnInit() {
    if (this.data.element) {
      let apiCalls: any = {}
      this.dataObj.project = this.data.element.projectshortname;
      forkJoin({
        byId: this.profitLossService.getCommulativeProfitLossByProjectIdId({ id: this.data.element.id }, ''),
      }).pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (response: any) => {
            if (response.byId && response.byId.success) {
              this.profitLossData = response.byId.data;
              if (this.profitLossData && this.profitLossData.length === 0) {
                this.emptyData = true;
                return;
              }
              this.addDatatoSheet({ type: DialogOperation.ADD, value: this.profitLossData });
              this.dataObj.percentage = this.commonService.netPercentage(
                this.dataObj.totalincome,
                this.dataObj.totalexpense,
                this.dataObj.totalincome - this.dataObj.totalexpense);
            }
          }
        });
    }
  }
  download() {
    this.isPdfGenerating = true; 
    this.pdfService.generateAndGetPDF(this.pdfContent, 'ProfitLoss_Commulative.pdf').then((pdf) => {
      if (pdf) {
        const config = this.defaultdialogoptions;
        config.minWidth = '80vw';
        config.data = {
          url: false,
          element: pdf
        };
        this.dialog.open(PdfViewerComponent, config);
      }
    }).finally(() => {
      this.isPdfGenerating = false; 
    });
  }
  buildGroupedRows(data: any[]): Row[] {
    console.log(data);
    let result: Row[] = [];
    this.keyToGroup.forEach((groupName, index) => {
      const sectionNumber = `${this.commonService.toRoman(index + 1)} - `;

      result.push({
        type: 'group',
        label: `${sectionNumber} ${groupName.Name}`,
        id: "",
        key: ""
      });
      data.filter(d => d.key?.toLowerCase() === groupName.key?.toLowerCase()).forEach((d, index) => {
        if (d.type !== 'totalfooter') {
          result.push({
            ...d, srno: index + 1,
            type: 'data'
          });
        }
      });

      result.push({
        type: 'totalinfo',
        name: 'Total',
        id: groupName.id,
        actualamount: this.commonService.roundValue(this.getCurrentAmount(data.filter(d => d.key?.toLowerCase() === groupName.key?.toLowerCase()))),
        isincome: groupName.key == 'income'
      });
    });
    result = result.filter((record: any) => !this.footerRow.includes(record.type));
    this.setFooter(result);
    return result;
  }
  isGroup = (_: number, row: Row) => row.type === 'group';
  isData = (_: number, row: Row) => row.type === 'data';
  isTotalInfo = (_: number, row: Row) => row.type === 'totalinfo';
  isFooterInfo = (_: number, row: Row) => row.type === 'totalfooter';


  setFooter(records: Row[]) {
    let totalIncome: Row = {
      type: 'totalfooter',
      name: 'Total Income',
      actualamount: this.commonService.roundValue(this.getTotalCurrentIncome()),
      isincome: true
    }
    let totalExpense: Row = {
      type: 'totalfooter',
      name: 'Total Expense',
      actualamount: this.commonService.roundValue(this.getTotalCurrentExpense()),
      isincome: false
    }
    records.push(totalIncome);
    records.push(totalExpense);
    this.dataObj.totalincome = this.commonService.roundValue(this.getTotalCurrentIncome());
    this.dataObj.totalexpense = this.commonService.roundValue(this.getTotalCurrentExpense());
  }

  setTotalIncome() {
    let incomes: any = this.dataRecords.filter((x: any) => x.isincome && x.type != 'totalfooter');
    let incomeFooter: any = this.dataSource.find((x: any) => x.isincome && x.type == 'totalfooter');
    incomeFooter.actualamount = incomes.map((t: any) => t.actualamount).reduce((acc: number, value: number) => acc + value, 0);
    this.dataSource = [...this.dataSource];
  }
  setTotalExpense() {
    let expenses: any = this.dataRecords.filter((x: any) => !x.isincome && x.type != 'totalfooter');
    let expFooter: any = this.dataSource.find((x: any) => !x.isincome && x.type == 'totalfooter');
    expFooter.actualamount = expenses.map((t: any) => t.actualamount).reduce((acc: number, value: number) => acc + value, 0);
    this.dataSource = [...this.dataSource];
  }

  revenueDataLoad(data: any) {
    if (data)
      this.addDatatoSheet(data);
  }
  rowIndex = -1;
  addDatatoSheet(data: any) {

    let records = data.value.map((item: any) => ({
      id: item.id,
      index: ++this.rowIndex,
      type: 'data',
      name: item.name,
      actualamount: this.commonService.roundValue(+item.total),
      noteno: '',
      isadmin: item.isadmin,
      ispersonal: item.ispersonal,
      group: item.isincome ? 'Income' : 'Expense',
      key: item.group,
      isincome: item.isincome
    }));
    this.getTotalCurrentIncome();
    let totalIncome = {
      type: 'totalfooter',
      name: 'Total Income',
      actualamount: this.commonService.roundValue(this.getTotalCurrentIncome()),
      isincome: true
    }
    let totalExpense = {
      type: 'totalfooter',
      name: 'Total Expense',
      actualamount: this.commonService.roundValue(this.getTotalCurrentExpense()),
      isincome: false
    }
    this.dataRecords.push(totalIncome);
    this.dataRecords.push(totalExpense);

    this.dataRecords.splice(0, 0, ...records);
    this.dataSource = this.buildGroupedRows(this.dataRecords);
  }

  getCurrentAmount(data: Row[]) {
    let total = data.map((t: any) => t.actualamount).reduce((acc, value) => acc + value, 0);
    return !isNaN(total) ? total : 0;
  }

  getTotalCurrentIncome() {
    let total = this.dataRecords.filter(x => x.isincome && x.type != this.footerRow).map((t: any) => t.actualamount).reduce((acc: number, value: number) => acc + value, 0);
    return !isNaN(total) ? total : 0;
  }
  getTotalCurrentExpense() {
    let total = this.dataRecords.filter(x => x.isincome == false && x.type != this.footerRow).map((t: any) => t.actualamount).reduce((acc: number, value: number) => acc + value, 0);
    return !isNaN(total) ? total : 0;
  }

  ngAfterViewInit(): void {
  }

}


