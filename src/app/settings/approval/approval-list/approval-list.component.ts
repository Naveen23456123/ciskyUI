import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { InventoryControlService } from '@app/inventory-control/inventory-control.service';
import { CommonService } from '@app/shared/services/common.service';
import { SettingInterfaceService } from '@app/shared/services/external/setting-interface.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-approval-list',
  standalone: false,
  templateUrl: './approval-list.component.html',
  styleUrl: './approval-list.component.scss'
})
export class ApprovalListComponent {
  approvals: any[] = [];
  isLoading = true;
  displayedColumns: string[] = ['serial', 'cname', 'name', 'view'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId = '123';
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!: number;
  pagePermissions: any = {};
  readonly dialog = inject(MatDialog);

  private defaultdialogoptions: MatDialogConfig = {
    minWidth: '900px',
    disableClose: false,
    data: {},
  };

  constructor(private approvalService: SettingInterfaceService, private helperService: HelperService,
    private stateDataService: StateDataService, private notifyBarService: NotifyBarService,
    private route: ActivatedRoute, private commonService: CommonService
  ) {
    this.dataSource = new MatTableDataSource(this.approvals);
  }

  ngOnInit() {
    this.stateDataService.stateDataSubject.subscribe((data) => {
      if (data.event == 'apredit' && data.valid && data.value) {
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'apradd' && data.valid && data.value) {
        this.addRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'aprdelete' && data.valid && data.value) {
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
    });
    let pageGuid = this.route.snapshot.data['pageGuid'];
    this.commonService.getPermissionsForCurrentPage(pageGuid).then((permissions: any) => {
      this.pagePermissions = permissions;
      if (this.pagePermissions?.canUpdate || this.pagePermissions?.canDelete) {
        this.displayedColumns.push('action');
      }
      if (this.pagePermissions?.canRead) {
        this.getApprovalDetails();
      }
    });

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  filterChange(data: any) {
    if (data && data.value) {
      this.dataSource.filter = data.value.trim().toLowerCase()
    }
    else {
      this.dataSource.filter = '';
    }
  }
  clear() {
    this.getApprovalDetails();
  }
  getApprovalDetails() {
    this.isLoading = true;
    this.approvalService.getApprovalDetails({ organizationId: this.activeOrgId }, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
        if (response && response.success) {
          this.approvals = response.data;
          this.updateTable(this.approvals);
        }
      });
  }
  private updateTable(info: any) {
    this.approvals = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);
    this.resultsLength = this.approvals.length;
  }

  updateRowData(data: any) {
    const element: any = this.dataSource.data.find((x: any) => x.id == data.id);
    if (element) {
      element.id = data.id;
      element.name = data.name;
      element.moduleid = data.moduleid;
      element.levels = data.levels
      this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(newdata: any) {
    const data1: any = {
      id: newdata.id,
      name: newdata.name,
      company: newdata.company,
      moduleid: newdata.moduleid,
      modulename: newdata.modulename,
      levels: newdata.levels
    }
    this.approvals.unshift(data1);
    this.updateTable(this.approvals);
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x: any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

}


