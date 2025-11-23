import { group } from '@angular/animations';
import { Component, ElementRef, inject, Inject, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogOperation, PermissionGuids } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { ProfitLossInterfaceService } from '@app/shared/services/external/profit-loss-interface.service';
import { GeneratePdfService } from '@app/shared/services/generate-pdf.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, forkJoin, take } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { ActivatedRoute } from '@angular/router';
import { ManageAdminExpenseComponent } from './dialog/manage-admin-expense/manage-admin-expense.component';
import { PdfViewerComponent } from '@app/shared/components/pdf-viewer/pdf-viewer.component';

export type Row = { type: 'group'; label: string, id: string, key: string } | {
  id?: string;
  type?: 'data' | 'totalinfo' | 'totalfooter' | 'totalSeparate';
  name?: string;
  isEditing?: boolean,
  isEdited?: false,
  actualamount?: number;
  previousexpenditure?: number;
  group?: string;
  isincome?: boolean;
  noteno?: string;
  order?: number;
};
@Component({
  selector: 'app-profit-loss-detailed',
  standalone: false,
  templateUrl: './profit-loss-detailed.component.html',
  styleUrl: './profit-loss-detailed.component.scss'
})
export class ProfitLossDetailedComponent {
  readonly dialog = inject(MatDialog);
  public data: any;
  isPdfGenerating = false;
  displayedColumns: string[] = ['name', 'actualamount'];
  groupTotal:string[]=['totalHeader','totalcurrent'];
  groupFooter:string[]=['totalfooter','totalfootercurrent'];
  isLoading = true;
  scopes: any[] = [];
  dataRecords: any[] = [];
  scopeLoaded = false;
  currentTotalIncome = 0;
  currentTotalExpense = 0;
  previousTotalIncome = 0;
  previousTotalExpense = 0;
  dataSource: Row[] = [];
  pagePermissions: any = {};
  profitLossData: any;
  footerRow: string = 'totalfooter';
  isClicked = false;
  dataObj: any = {};
  private defaultdialogoptions: MatDialogConfig = {
    minWidth: '65vw',
    data: {},
  };
  today: Date = new Date();
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  keyToGroup: any[] = ['KEY_PROFESSIONAL', 'VEHILCE_LEASING', 'REVENUE', 'EXTERNAL_COMPANY', 'OFFICE_RENT', 'IMPREST', 'INSURANCES'];
  constructor(private profitLossService: ProfitLossInterfaceService, private sessionService: SessionService,
    private commonService: CommonService, private pdfService: GeneratePdfService, private notifyBarService: NotifyBarService,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit() {
    if (PermissionGuids.profitloss) {
      this.commonService.getPermissionsForCurrentPage(PermissionGuids.profitloss).then((permissions: any) => {
        if (permissions) {
          this.pagePermissions = permissions;
          if (this.pagePermissions && this.pagePermissions.canRead) {
            if (this.pagePermissions.canDelete || this.pagePermissions.canUpdate){
              this.displayedColumns.push('action');
              this.groupTotal.push('totalempty');
              this.groupFooter.push('totalempty')
            }
            const state = history.state;
            console.log(state);
            if (state.value) {
              this.dataObj.project = state.value.project;
              this.dataObj.generatedate = state.value.createdate;
              forkJoin({
                scopeAPI: this.profitLossService.getProfitLossScopes({}, ''),
                byId: this.profitLossService.getProfitLossListById({ id: state.value.id }, ''),
              }).pipe(finalize(() => this.isLoading = false))
                .subscribe({
                  next: (response: any) => {
                    if (response.scopeAPI && response.scopeAPI.success) {
                      this.scopes = response.scopeAPI.data;
                      this.sessionService.setProfileLossScope(response.scopeAPI.data);
                      this.scopeLoaded = true;
                      if (response.byId && response.byId.success) {
                        this.profitLossData = response.byId.data;
                        this.addDatatoSheet({ type: DialogOperation.ADD, value: this.profitLossData.scopes });
                        this.dataObj.percentage = this.commonService.netPercentage(
                          this.dataObj.totalincome,
                          this.dataObj.totalexpense,
                          this.dataObj.totalincome - this.dataObj.totalexpense);
                      }
                    }
                  }
                });
            }
          }
        }
      });

    }
  }
  download() {
    this.isPdfGenerating = true;
    this.pdfService.generateAndGetPDF(this.pdfContent, 'Profit_Loss.pdf').then((pdf) => {
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

    let result: Row[] = [];
    const groups = Array.from(new Set(data.map(d => ({ group: d.group, order: d.order }))));
    let sortedGroups = groups.sort((a, b) => a.order - b.order).map(item => item.group);
    //const groups = Array.from(new Set(data.map(d => d.group)));
    const filteredScopesToGrouped = this.scopes.filter(item => this.keyToGroup.includes(item.key));
    let rowIndex = -1;
    let numberindexUsed = 0;
    let sortedScopes = filteredScopesToGrouped.sort((a, b) => a.order - b.order).map(item => item.value);
    filteredScopesToGrouped.forEach((groupName, index) => {
      numberindexUsed = index + 1;
      const sectionNumber = `${this.commonService.toRoman(index + 1)} - `;

      result.push({
        type: 'group',
        label: `${sectionNumber} ${groupName.value}`,
        id: groupName.id,
        key: groupName.key
      });
      data.filter(d => d.group === groupName.key).forEach((d, index) => {
        d.items.forEach((c: any, cindex: any) => {
          if (!c.isdeleted && d.type !== 'totalfooter') {
            result.push({
              ...c, actualamount: this.commonService.roundValue(+c.actualamount), srno: cindex + 1,
              type: 'data', isNew: c.isNew ?? false, isEditing: c.isEditing ?? false,
              realamount: this.commonService.roundValue(+c.actualamount)
            });
          }
        });

      });

      result.push({
        type: 'totalinfo',
        name: 'Total',
        id: groupName.id,
        actualamount: this.commonService.roundValue(this.getCurrentAmount(data.filter(d => d.group === groupName.key))),
        previousexpenditure: this.getPreviousAmount(data.filter(d => d.group === groupName.key)),
        isincome: this.scopes.find(x => x.key == groupName.key)?.accounttype.toLowerCase() == 'income'
      });
    });

    data.filter(item => !this.keyToGroup.includes(item.group) && !item.isadmin).forEach((d, index) => {
      rowIndex = rowIndex + 1;
      if (!d.isdeleted && d.type !== 'totalfooter') {
        result.push({
          ...d, srno: index + 1, type: 'data', isNew: d.isNew ?? false, isEditing: d.isEditing ?? false,
          realamount: this.commonService.roundValue(+d.actualamount)
        });
      }
    });
    const sectionNumber = `${this.commonService.toRoman(numberindexUsed + 1)} - `;
    result.push({
      type: 'group',
      label: `${sectionNumber} Admin`,
      id: '',
      key: ''
    });
    data.filter(item => !this.keyToGroup.includes(item.group) && item.isadmin).forEach((d, index) => {
      rowIndex = rowIndex + 1;
      if (!d.isdeleted && d.type !== 'totalfooter') {
        result.push({
          ...d, srno: index + 1, type: 'data', isNew: d.isNew ?? false, isEditing: d.isEditing ?? false,
          realamount: this.commonService.roundValue(+d.actualamount)
        });
      }
    });
    result = result.filter((record: any) => !this.footerRow.includes(record.type));
    this.setFooter(result);
    return result;
  }
  isGroup = (_: number, row: Row) => row.type === 'group';
  isData = (_: number, row: Row) => row.type === 'data';
  isTotalSeparate = (_: number, row: Row) => row.type === 'totalSeparate';
  isTotalInfo = (_: number, row: Row) => row.type === 'totalinfo';
  isFooterInfo = (_: number, row: Row) => row.type === 'totalfooter';

  addControls(item: any, index: number) {
    if (this.keyToGroup.includes(item.key)) {
      let id = this.dataRecords.find(x => x.group == item.key).id;
      this.dataRecords.find(x => x.id == id).items;
      var newObj = {
        sid: item.id,
        pid: id,
        isNew: true,
        isEditing: false,
        isdeleted: false,
        actualamount: 0,
        index: this.getHighestIndex(this.dataRecords) + 1,
        id: '',
        name: "",
        otheramount: 0,
        total: 0
      };
      this.dataRecords.find(x => x.id == id).items.push(newObj);
      this.dataSource = this.buildGroupedRows(this.dataRecords);
    }
    else {
      const config = this.defaultdialogoptions;
      const filteredScopes = this.scopes.filter(scope =>
        !this.dataRecords.map(x => x.scopeid).includes(scope.id) && scope.isadmin
      );
      config.data = {
        element: filteredScopes
      };
      const dialogRef = this.dialog.open(ManageAdminExpenseComponent, config);
      dialogRef.afterClosed().subscribe((response) => {
        if (response && response.valid) {
          let highestIndex = this.getHighestIndex(this.dataRecords);
          let records = response.value.map((item: any) => ({
            sid: item.id,
            scopeid: item.id,// added to decide its a new item and grab scopeid from this to sent for addition 
            pid: '',
            isNew: true,
            isadmin: item.isadmin,
            isEditing: false,
            isdeleted: false,
            isincome: this.scopes.find(x => x.id == item.id)?.accounttype.toLowerCase() == 'income',
            actualamount: +item.amount,
            index: ++highestIndex,
            id: '',
            name: item.value,
            otheramount: 0,
            total: +item.amount
          }));
          records.forEach((item: any) => {
            this.dataRecords.push(item);
            this.dataSource = this.buildGroupedRows(this.dataRecords);
          })

        }
      })
    }

  }
  // Remove any row
  removeRow(row: any, index: number): void {
    this.findByIndex(this.dataRecords, row.index).isdeleted = true;
    this.findByIndex(this.dataRecords, row.index).isEdited = true;
    this.setTotalForIndividual(row.pid);
    this.dataSource = this.buildGroupedRows(this.dataRecords);
  }
  editRow(row: any, index: number): void {

    this.findByIndex(this.dataRecords, row.index).isEdited = true;
    this.findByIndex(this.dataRecords, row.index).isEditing = true;
    this.dataSource = this.buildGroupedRows(this.dataRecords);
  }
  cancelEdit(item: any, index: number): void {
    this.findByIndex(this.dataRecords, item.index).isEdited = false;
    this.findByIndex(this.dataRecords, item.index).isEditing = false;
    this.findByIndex(this.dataRecords, item.index).actualamount = this.findByIndex(this.dataRecords, item.index).realamount;
    this.setTotalForIndividual(item.pid);
    this.dataSource = this.buildGroupedRows(this.dataRecords);

  }
  setFooter(records: Row[]) {
    let totalIncome: Row = {
      type: 'totalfooter',
      name: 'Total Income',
      actualamount: this.commonService.roundValue(this.getTotalCurrentIncome()),
      previousexpenditure: this.getTotalPreviousIncome(),
      isincome: true
    }
    let totalExpense: Row = {
      type: 'totalfooter',
      name: 'Total Expense',
      actualamount: this.commonService.roundValue(this.getTotalCurrentExpense()),
      previousexpenditure: this.getTotalPreviousExpense(),
      isincome: false
    }
    records.push(totalIncome);
    records.push(totalExpense);
    this.dataObj.totalincome = this.commonService.roundValue(this.getTotalCurrentIncome());
    this.dataObj.totalexpense = this.commonService.roundValue(this.getTotalCurrentExpense());

  }
  saveRow(row: any, index: number): void {
    this.findByIndex(this.dataRecords, row.index).isEditing = false;
    this.findByIndex(this.dataRecords, row.index).isEdited = true;
    this.findByIndex(this.dataRecords, row.index).realamount = this.findByIndex(this.dataRecords, row.index).actualamount;
    this.dataSource = this.buildGroupedRows(this.dataRecords);

  }
  onRowAmountChange(item: any, index: number, value: string) {
    this.findByIndex(this.dataRecords, item.index).actualamount = (+value);
    this.setTotalForIndividual(item.pid);
    let rowitem: any = this.dataSource.find(x => x.id == item.sid && x.type == 'totalinfo');

    if (rowitem)
      rowitem.actualamount = this.findById(this.dataRecords, item.pid).actualamount;

    this.dataSource = [...this.dataSource];
    this.setTotalExpense();
    this.setTotalIncome();
  }
  onRowNameChange(item: any, index: number, value: string) {
    this.findByIndex(this.dataRecords, item.index).name = value;
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
    //expFooter.actualamount = expenses.map((t: any) => t.actualamount).reduce((acc: number, value: number) => acc + value, 0);
    expFooter.actualamount = this.getTotalCurrentExpense();
    this.dataSource = [...this.dataSource];
  }
  findByIndex(records: any[], targetIndex: number): any | undefined {
    for (const record of records) {
      // Check top-level record
      if (record.index === targetIndex) return record;

      // Check nested items
      const foundItem = record.items?.find((item: any) => item.index === targetIndex);
      if (foundItem) return foundItem;
    }
    return undefined;  // Not found
  }

  setTotalForIndividual(id: string) {
    var mainItem = this.findById(this.dataRecords, id);
    if (mainItem.items?.length > 0) {
      this.findById(this.dataRecords, id).actualamount = mainItem.items.filter((x: any) => !x.isdeleted).map((t: any) => t.actualamount).reduce((acc: number, value: number) => acc + value, 0);
    }
    else {
      this.findById(this.dataRecords, id).actualamount = mainItem.actualamount;
    }
  }

  findById(records: any[], id: string): any | undefined {
    for (const record of records) {
      // Check top-level record
      if (record.id === id) return record;

      // Check nested items
      const foundItem = record.items?.find((item: any) => item.id === id);
      if (foundItem) return foundItem;
    }
    return undefined;  // Not found
  }
  revenueDataLoad(data: any) {
    if (data)
      this.addDatatoSheet(data);
  }
  getHighestIndex(records: any[]): number {
    let maxIndex = -Infinity;
    records.forEach(record => {
      if (record.index != null && record.index > maxIndex) {
        maxIndex = record.index;
      }

      if (Array.isArray(record.items)) {
        record.items.forEach((item: any) => {
          if (item.index != null && item.index > maxIndex) {
            maxIndex = item.index;
          }
        });
      }
    });

    return maxIndex === -Infinity ? 0 : maxIndex;
  }

  rowIndex = -1;
  addDatatoSheet(data: any) {
    this.sessionService.profileLossScopeSubject$.pipe(take(1)).subscribe((response: any) => {
      if (response.length > 0) {
        if (data.type == DialogOperation.ADD) {

          let records = data.value.map((item: any) => ({
            id: item.id,
            index: ++this.rowIndex,
            type: 'data',
            scopeid: item.scopeid,
            pid: item.id,
            name: item.name,
            actualamount: this.commonService.roundValue(+item.total),
            realamount: this.commonService.roundValue(+item.total),
            noteno: '',
            isadmin: item.isadmin,
            isNew: false,
            isdeleted: false,
            isEditing: false,
            isEdited: false,
            isremovable: item.isremovable,
            order: this.scopes.find(x => x.id == item.scopeid)?.order,
            group: this.scopes.find(x => x.id == item.scopeid)?.key,
            acctype: this.scopes.find(x => x.id == item.scopeid)?.accounttype,
            isincome: this.scopes.find(x => x.id == item.scopeid)?.accounttype.toLowerCase() == 'income',
            items: item.items.map((subitem: any) => ({
              ...subitem, index: ++this.rowIndex,
              isdeleted: false,
              isNew: false,
              isEdited: false,
              sid: this.scopes.find(x => x.id == item.scopeid)?.id,
              pid: item.id,
              isremovable: subitem.isremovable,
              realamount: this.commonService.roundValue(+subitem.total),
            }))
          }));
          this.dataRecords.splice(0, 0, ...records);
          this.dataSource = this.buildGroupedRows(this.dataRecords);
        }
        else if (data.type == DialogOperation.EDIT) {
          const element: any = this.dataRecords.find((x: any) => x.id == data.value.id);
          if (element) {
            element.id = data.value.id;
            element.name = data.value.name,
              element.actualamount = this.commonService.roundValue(+data.value.amount),
              element.noteno = '';
          }
          this.dataSource = this.buildGroupedRows(this.dataRecords);
        }
        else if (data.type == DialogOperation.DELETE) {
          const index = this.dataRecords.findIndex((x: any) => x.id == data.value);
          this.dataRecords.splice(index, 1);
          this.dataSource = this.buildGroupedRows(this.dataRecords);
        }
        this.getTotalCurrentIncome();
        let totalIncome = {
          type: 'totalfooter',
          name: 'Total Income',
          actualamount: this.commonService.roundValue(this.getTotalCurrentIncome()),
          previousexpenditure: this.getTotalPreviousIncome(),
          isincome: true
        }
        let totalExpense = {
          type: 'totalfooter',
          name: 'Total Expense',
          actualamount: this.commonService.roundValue(this.getTotalCurrentExpense()),
          previousexpenditure: this.getTotalPreviousExpense(),
          isincome: false
        }
        this.dataRecords.push(totalIncome);
        this.dataRecords.push(totalExpense);
        //this.dataSource = this.buildGroupedRows(this.dataRecords);
      }
    })
  }

  getCurrentAmount(data: Row[]) {
    let total = data.map((t: any) => t.actualamount).reduce((acc, value) => acc + value, 0);
    return !isNaN(total) ? total : 0;
  }
  getPreviousAmount(data: Row[]) {
    let total = data.map((t: any) => t.previousexpenditure).reduce((acc, value) => acc + value, 0);
    return !isNaN(total) ? total : 0;
  }
  getTotalCurrentIncome() {
    let total = this.dataRecords.filter(x => x.isincome && x.type != this.footerRow).map((t: any) => t.actualamount).reduce((acc: number, value: number) => acc + value, 0);
    return !isNaN(total) ? total : 0;
  }
  getTotalCurrentExpense() {
    let total = this.dataRecords.filter(x => x.isincome == false && (!('isdeleted' in x) || !x.isdeleted) && x.type != this.footerRow).map((t: any) => t.actualamount).reduce((acc: number, value: number) => acc + value, 0);
    return !isNaN(total) ? total : 0;
  }

  getTotalPreviousIncome() {
    let total = this.dataRecords.filter(x => x.isincome && x.type != this.footerRow).map((t: any) => t.previousexpenditure).reduce((acc: number, value: number) => acc + value, 0);
    return !isNaN(total) ? total : 0;
  }
  getTotalPreviousExpense() {
    let total = this.dataRecords.filter(x => x.isincome == false && x.type != this.footerRow).map((t: any) => t.previousexpenditure).reduce((acc: number, value: number) => acc + value, 0);
    return !isNaN(total) ? total : 0;
  }
  ngAfterViewInit(): void {
  }
  submit() {
    this.isClicked = true;
    const updateobj: any[] = this.dataRecords.map(scope => {
      let filteredItems = [];
      if (scope.items && scope.items.length > 0) {
        filteredItems = scope.items
          .filter((item: any) => (item.id == '' || item.isEdited || item.isdeleted))
          .map((item: any) => ({
            id: item.id,
            name: item.name?.trim(),
            actualamount: item.actualamount,
            otheramount: item.otheramount,
            isedited: item.isEdited,
            isdeleted: item.isdeleted
          }));
      }

      if (!scope.isNew && !scope.isEdited && filteredItems.length == 0)
        return { id: null };

      return {
        id: scope.id,
        name: scope.name,
        scopeid: scope.scopeid,
        total: scope.actualamount,
        items: filteredItems,
        isedited: scope.isEdited,
        isdeleted: scope.isdeleted
      };
    }).filter(x => x.id != null);
    this.profitLossService.updateProfitLossById({ id: this.profitLossData.id, scopes: updateobj }, '')
      .pipe(finalize(() => { this.isLoading = false; this.isClicked = false; }))
      .subscribe({
        next: (response: any) => {
          if (response && response.success) {
            this.profitLossData = response.data;
            this.dataRecords = [];
            this.dataSource = [];
            this.addDatatoSheet({ type: DialogOperation.ADD, value: this.profitLossData.scopes });
            this.dataObj.percentage = this.commonService.netPercentage(
              this.dataObj.totalincome,
              this.dataObj.totalexpense,
              this.dataObj.totalincome - this.dataObj.totalexpense);
          }
          this.notifyBarService.showsnackbar('Profit Loss Sheet Updated successfully');
        }
      });
  }

}



