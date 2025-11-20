import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PdfViewerComponent } from '@app/shared/components/pdf-viewer/pdf-viewer.component';
import { CommonService } from '@app/shared/services/common.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { SiteControlService } from '@app/site-control/site-control.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-consultant-account-list',
  standalone: false,
  templateUrl: './consultant-account-list.component.html',
  styleUrl: './consultant-account-list.component.scss'
})
export class ConsultantAccountListComponent {
  accounts: any[] = [];
  isLoading = true;
  displayedColumns: string[] = ['serial', 'bankname', 'accountno', 'ifsccode', 'panno', 'gstno', 'bankaddress', 'docaddress'];
  dataSource!: MatTableDataSource<any[]>;
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

  constructor(private siteControlService: SiteControlService, private helperService: HelperService,
    private router: Router, private stateDataService: StateDataService,
    private notifybarservice: NotifyBarService, private route: ActivatedRoute, private commonService: CommonService
  ) {
    this.dataSource = new MatTableDataSource(this.accounts);
  }

  ngOnInit() {
    this.stateDataService.stateDataSubject.subscribe((data) => {
      if (data.event == 'accedit' && data.valid && data.value) {
        this.updateRowData(data.value);
        this.notifybarservice.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'accAdd' && data.valid && data.value) {
        this.addRowData(data.value);
        this.notifybarservice.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'accdelete' && data.valid && data.value) {
        this.deleteRow(data.value.id);
        this.notifybarservice.showsnackbar(data.msg);
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
        this.siteControlService.getConsultantAccountListByOrgId({}, '')
          .pipe(finalize(() => this.isLoading = false))
          .subscribe((response: any) => {
            if (response && response.success) {
              this.updateTable(response.data);
            }
          });
      }
    });

  }

  private updateTable(info: any) {
    this.accounts = info;
    this.dataSource = new MatTableDataSource(this.accounts);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);
    this.resultsLength = this.accounts.length;
  }

  ngAfterViewInit() {
    this.pageSize = this.helperService.getPageSize();
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  updateRowData(data: any) {
    const element: any = this.dataSource.data.find((x: any) => x.id == data.id);
    if (element) {
      element.bankname = data.bankName;
      element.accountno = data.accountNo;
      element.ifsccode = data.ifscCode;
      element.panno = data.panNo;
      element.gstno = data.gstNo,
        element.bankaddress = data.bankAddress
      this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(newdata: any) {
    const data1: any = {
      id: newdata.id,
      bankname: newdata.bankName,
      accountno: newdata.accountNo,
      ifsccode: newdata.ifscCode,
      panno: newdata.panNo,
      gstno: newdata.gstNo,
      bankaddress: newdata.bankAddress,
      companyid: newdata.companyId,
      acctypeid: newdata.accTypeId,
      docaddress: newdata.docAddress
    }
    this.accounts.unshift(data1);
    this.updateTable(this.accounts);
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x: any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  openDoc(row: any) {
    window.open(row.docaddress, "_blank");
  }
  clear() {
    this.filterChange('');
  }
  filterChange(data: any) {
    if (data && data.value) {
      this.dataSource.filter = data.value.trim().toLowerCase()
    }
    else {
      this.dataSource.filter = '';
    }
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

