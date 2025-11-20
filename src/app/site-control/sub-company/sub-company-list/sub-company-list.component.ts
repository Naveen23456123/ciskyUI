import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ViewEmployeeListComponent } from '@app/shared/components/employee/view-employee-list/view-employee-list.component';
import { CommonService } from '@app/shared/services/common.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { SiteControlService } from '@app/site-control/site-control.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-sub-company-list',
  standalone: false,
  templateUrl: './sub-company-list.component.html',
  styleUrl: './sub-company-list.component.scss'
})
export class SubCompanyListComponent {
  subCompanies: any[] = [];
  isLoading = true;
  displayedColumns: string[] = ['serial', 'name', 'employeecount', 'viewemp'];
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
    minWidth: '1200px',
    disableClose: false,
    data: {},
  };

  constructor(private siteControlService: SiteControlService, private helperService: HelperService,
    private notifyBarService: NotifyBarService, private stateDataService: StateDataService,
    private route: ActivatedRoute, private commonService: CommonService
  ) {
    this.dataSource = new MatTableDataSource(this.subCompanies);
  }

  ngOnInit() {
    this.stateDataService.stateDataSubject.subscribe((data) => {
      if (data.event == 'subcomedit' && data.valid && data.value) {
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'subcomadd' && data.valid && data.value) {
        this.addRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'subcomdelete' && data.valid && data.value) {
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
        this.siteControlService.getSubCompanyListByOrgId({ organizationId: this.activeOrgId }, '')
          .pipe(finalize(() => this.isLoading = false))
          .subscribe((response: any) => {
            if (response && response.success) {
              this.subCompanies = response.data;
              this.updateTable(this.subCompanies);
              console.log(this.dataSource.data);
            }
          });
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private updateTable(info: any) {
    this.subCompanies = info;
    this.dataSource = new MatTableDataSource<any>(this.subCompanies);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);
    this.resultsLength = this.subCompanies.length;
    this.pageSize = this.helperService.getPageSize();

  }

  updateRowData(data: any) {
    const element: any = this.dataSource.data.find((x: any) => x.id == data.id);
    if (element) {
      element.id = data.id;
      element.name = data.name;
      this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(newdata: any) {
    const data1: any = {
      id: newdata.id,
      name: newdata.name,
      employeecount: 0
    }
    this.subCompanies.unshift(data1);
    this.updateTable(this.subCompanies);
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x: any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  viewEmp(data: any) {
    const config = this.defaultdialogoptions;

    config.data = {
      element: data,
      type: 'comp'
    };
    const dialogRef = this.dialog.open(ViewEmployeeListComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
      }
      else {
      }
    });
  }

}
