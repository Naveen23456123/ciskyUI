import { Component, Inject, Optional, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApprovalStatus, DialogOperation, PermissionGuids } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { ExpenseInterfaceService } from '@app/shared/services/external/expense-interface.service';
import { HelperService } from '@app/shared/services/helper.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';
import { ManageExpenseComponent } from '../manage-expense/manage-expense.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { PdfViewerComponent } from '../../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-view-exp-details-info',
  standalone: false,
  templateUrl: './view-exp-details-info.component.html',
  styleUrl: './view-exp-details-info.component.scss'
})
export class ViewExpDetailsInfoComponent {
  expenseList: any[] = [];
  public data: any;
  isLoading = true;
  displayedColumns: string[] = ['serial', 'date', 'gamount', 'apramount', 'status'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId = '123';
  isSearching = false;
  pagePermissions: any = {};
  statusList: any[] = [];
  userObj: any = {};
  billingSummary: any;
  wholeExpenses: any;
  readonly dialog = inject(MatDialog);

  private defaultdialogoptions: MatDialogConfig = {
    disableClose: false,
    data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ViewExpDetailsInfoComponent>, private helperService: HelperService,
    private sessionService: SessionService, private commonService: CommonService, private expenseService: ExpenseInterfaceService,
    private router: Router, private route: ActivatedRoute, private notifyBarService: NotifyBarService
  ) {
    this.dataSource = new MatTableDataSource(this.expenseList);
    this.data = data || {};
  }

  ngOnInit() {
    if (PermissionGuids.expense) {
      this.commonService.getPermissionsForCurrentPage(PermissionGuids.expense).then((permissions: any) => {
        if (permissions) {
          this.pagePermissions = permissions;
          if (this.pagePermissions && this.pagePermissions.canRead) {
            if (this.pagePermissions.canUpdate || this.pagePermissions.canDelete)
              this.displayedColumns.push('action');
            this.sessionService.approvalStatusSubject$.subscribe((statusresponse: any) => {
              if (statusresponse) {
                this.statusList = statusresponse;
                this.getExpenseDetails(this.data.element);
              }
            });            
          }
        }
      })
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  setLevel(items: any) {
    if (items) {
      return items.map((level: any) => ({
        ...level,
        status: this.statusList.find((x: any) => x.id == level.statusid)?.name
      }))
    }
  }

  anyChange(data: any) {
    if (data && data.value) {
      this.dataSource.filter = data.value.trim().toLowerCase()
    }
    else {
      this.dataSource.filter = '';
    }
  }
  getExpenseDetails(data: any) {
    this.isSearching = true;
    this.expenseService.getExpenseDetailsListById({ id: data }, '')
      .pipe(finalize(() => { this.isLoading = false; this.isSearching = false }))
      .subscribe({
        next: (response: any) => {
          if (response && response.success) {
            this.billingSummary = response.data.summary;
            this.wholeExpenses = response.data.billings;
            this.expenseList = response.data.billings.expenses.map((item: any) => ({
              ...item,
              isedit: !item.inprocess,
              levels: this.setLevel(item.levels)
            }));
            console.log(this.expenseList);
            this.dataSource = new MatTableDataSource(this.expenseList);
          }
        }
      });
  }
  setLevelConfig(levels: any) {
    const overallstatus = this.commonService.getOverallStatus(levels);
    return {
      levels: overallstatus == ApprovalStatus.REJECTED ? levels?.filter((x: any) => x.status.toLowerCase() == ApprovalStatus.REJECTED.toLocaleLowerCase()) : levels,
      hasRejected: overallstatus == ApprovalStatus.REJECTED,
      status: overallstatus,
      isedit: overallstatus == ApprovalStatus.PENDING
    }
  }

  edit(data: any) {
    const selectedExpense = this.wholeExpenses.expenses?.find((exp: any) =>
      data.id.includes(exp.id)
    );
    const filteredBilling = {
      ...this.wholeExpenses,
      expenseid: selectedExpense?.id,
      date: selectedExpense.date,
      claimeddetails: selectedExpense?.claimeddetails
    }
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.EDIT,
      element: filteredBilling
    };
    this.defaultdialogoptions.minWidth = '70vw';
    const dialogRef = this.dialog.open(ManageExpenseComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        this.updateRow(data.value);
        this.notifyBarService.showsnackbar("The Expenses updated successfully");
      } else {

      }
    });
  }
  updateRow(updatedData: any) {
    let data = updatedData.updated;
    let element = this.expenseList.find(x => x.id == data.expenseid);
    if (element) {
      element.claimeddetails = data.claimeddetails.map((ele: any) => ({
        ...ele,
        itemname: ele.item
      }));
      element.date = data.date;
      element.name = data.name;
      if (this.wholeExpenses.expenses)
        this.wholeExpenses.expenses.find((exp: any) => exp.id == data.expenseid).claimeddetails = element.claimeddetails;
    }
    this.dataSource._updateChangeSubscription();
    this.billingSummary = [...updatedData.summary];
  }
  delete(data: any) {
    let deleteObj = {
      id: this.wholeExpenses.id,
      expenseid: data.id,
    }
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.DELETE,
      element: deleteObj,
      operation: 'expdelete'
    };
    this.defaultdialogoptions.minWidth = '45vw';
    const dialogRef = this.dialog.open(ManageExpenseComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        this.deleteRow(data.value);
        this.notifyBarService.showsnackbar('The Expense removed successfully');
      }
    });
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x: any) => x.id == data.expenseid);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
    this.billingSummary = [...data.summary];
  }
  onCloseClick(): void {
    this.dialogRef.close({ value: { expenses: this.expenseList, id: this.data.element } });
  }
  viewPdf(data: any) {
    const config = this.defaultdialogoptions;
    config.minWidth = '80vw';
    config.data = {
      element: data
    };
    this.dialog.open(PdfViewerComponent, config);
  }
}




