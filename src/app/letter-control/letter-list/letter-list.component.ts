import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { finalize, Subscription, take } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CosInterfaceService } from '@app/shared/services/external/cos-interface.service';
import { EotInterfaceService } from '@app/shared/services/external/eot-interface.service';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { ApprovalStatus, LetterType } from '@app/shared/models/constant.config';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { AttachLetterComponent } from '@app/shared/components/letters/attach-letter/attach-letter.component';
import { UploadFileComponent } from '@app/shared/components/upload-file/upload-file.component';
import { StateDataService } from '@app/shared/services/state-data.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { ManageLetterDocComponent } from '@app/shared/components/letters/manage-letter-doc/manage-letter-doc.component';
import { GenerateCsvService } from '@app/shared/services/generate-csv.service';
import { CommonService } from '@app/shared/services/common.service';

@Component({
  selector: 'app-letter-list',
  standalone: false,
  templateUrl: './letter-list.component.html',
  styleUrl: './letter-list.component.scss'
})
export class LetterListComponent {

  lettersList: any[] = [];
  isLoading = true;
  displayedColumns: string[] = ['serial', 'letterno', 'letterdate', 'project', 'lettertype', 'subject', 'from', 'to', 'status', 'docs'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!: number;
  projectEntity: any;
  letterCount: any = { pending: 0, close: 0 };
  isSearchLoading = false;
  isConsultantLetter: boolean = true;
  subscription: Subscription = new Subscription();
  readonly dialog = inject(MatDialog);
  pagePermissions: any = {};
  private defaultdialogoptions: MatDialogConfig = {
    minWidth: '1000px',
    disableClose: false,
    data: {},
  };

  constructor(private sessionService: SessionService, private letterService: LetterInterfaceService,
    private router: Router, private route: ActivatedRoute, private helperService: HelperService,
    private stateDataService: StateDataService, private notifyBarService: NotifyBarService,
    private csvService: GenerateCsvService, private commonService: CommonService) {
    this.dataSource = new MatTableDataSource(this.lettersList);
  }

  ngOnInit() {
    this.subscription = this.stateDataService.stateDataSubject.subscribe((data: any) => {
      if (data.event == 'letteredit' && data.valid && data.value) {
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'letteradd' && data.valid && data.value) {
        this.addRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'letterdelete' && data.valid && data.value) {
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'uploadlet' && data.valid && data.value) {
        this.addBulkLetters(data.value);
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
        this.filterLetter();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
  searchObj: any = {
    projectid: '',
    companyid: '',
    exchangetypeId: '',
    lettertypeid: '',
    relatedtoid: '',
    statusid: '',
    startdate: '',
    enddate: ''
  };
  projectChange(data: any) {
    this.searchObj.projectid = data.value ?? '';
    this.filterLetter();
  }
  compChange(data: any) {
    this.searchObj.companyid = data.value ?? '';
    this.searchObj.projectid = data.projectid ?? '';
    this.filterLetter();
  }
  letterTypeChange(data: any) {
    this.searchObj.lettertypeid = data.value ?? '';
    this.filterLetter();
  }
  relatedChange(data: any) {
    this.searchObj.relatedtoid = data.value ?? '';
    this.filterLetter();
  }
  exchangeChange(data: any) {
    this.searchObj.exchangetypeId = data.value ?? '';
    this.filterLetter();
  }
  generalChange(data: any) {
    this.searchObj.statusid = data.value ?? '';
    this.filterLetter();
  }
  anyChange(data: any) {
    if (data && data.value) {
      this.dataSource.filter = data.value.trim().toLowerCase()
    }
    else {
      this.dataSource.filter = '';
    }
  }
  dateRangeChange(data: any) {
    if (data) {
      this.searchObj.startdate = data.start ?? '';
      this.searchObj.enddate = data.end ?? '';
    }
    this.filterLetter();
  }
  clear() {
    this.searchObj = {
      projectid: '',
      companyid: '',
      exchangetypeId: '',
      lettertypeid: '',
      relatedtoid: '',
      statusid: '',
      startdate: null,
      enddate: null
    };
    this.filterLetter();
  }
  addBulkLetters(data: any) {
    data.forEach((element: any) => {
      this.addRowData(element);
    });
  }
  filterLetter() {
    this.isSearchLoading = true;
    this.letterService.searchLetters(this.searchObj, '')
      .pipe(finalize(() => { this.isLoading = false; this.isSearchLoading = false; }))
      .subscribe((response: any) => {
        if (response && response.success) {
          this.lettersList = response.data;
          this.updateTable(this.lettersList);
          this.letterCount.pending = this.lettersList.filter(x => x.status.toLowerCase() === ApprovalStatus.PENDING).length;
          this.letterCount.close = this.lettersList.filter(x => x.status.toLowerCase() === ApprovalStatus.CLOSE).length;

        }
      });
  }
  private updateTable(info: any) {
    this.lettersList = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);
    this.resultsLength = this.lettersList.length;
  }
  import() {
    const config = this.defaultdialogoptions;
    config.minWidth = '1200px';
    //config.minHeight='600px';
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      template_type: TemplateType.ALLLETTER
    };
    this.dialog.open(UploadFileComponent, config);

  }

  export() {
    if (this.lettersList && this.lettersList.length > 0)
      this.csvService.downloadFile(this.lettersList, this.letterService.getCSVTemplateColumnList(), 'Letters');
  }

  letter_attach() {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      letter_type: LetterType.allLetter
    };
    const dialogRef = this.dialog.open(AttachLetterComponent, config);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'letteradd', valid: true, msg: 'The milestone created successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
      }
      else {
        //this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  updateRowData(data: any) {
    const element: any = this.dataSource.data.find((x: any) => x.id == data.id);
    if (element) {
      element.id = data.id,
        element.lettertype = data.lettertype,
        element.letternumber = data.letternumber,
        element.letterdate = data.letterdate,
        element.subject = data.subject,
        element.status = data.status,
        element.letterfrom = data.letterfrom,
        element.letterto = data.letterto,
        element.remarks = data.remarks,
        element.associatedletterids = data.associatedletterids,
        this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(data: any) {
    const data1: any = {
      id: data.id,
      project: data.project,
      lettertype: data.lettertype,
      letternumber: data.letternumber,
      letterdate: data.letterdate,
      subject: data.subject,
      status: data.status,
      letterfrom: data.letterfrom,
      letterto: data.letterto,
      remarks: data.remarks,
      associatedletterids: data.associatedletterids,
    }
    this.lettersList.unshift(data1);
    this.updateTable(this.lettersList);
  }

  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x: any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  viewdocs(data: any) {
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      element: { id: data }
    };
    this.defaultdialogoptions.minWidth = '75vw';
    const dialogRef = this.dialog.open(ManageLetterDocComponent, this.defaultdialogoptions);

  }
}

