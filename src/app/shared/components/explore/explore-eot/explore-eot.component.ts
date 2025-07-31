import {AfterViewInit, EventEmitter, Input, Output,Component, OnDestroy, ViewChild, inject, SimpleChanges} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { distinctUntilChanged, finalize, Subscription, take } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CosInterfaceService } from '@app/shared/services/external/cos-interface.service';
import { EotInterfaceService } from '@app/shared/services/external/eot-interface.service';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { ApprovalStatus, DialogOperation } from '@app/shared/models/constant.config';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { untilDestroyed } from '@app/core/until-destroyed';
import { ViewLetterDetailsComponent } from '../../letters/view-letter-details/view-letter-details.component';


@Component({
  selector: 'app-explore-eot',
  standalone: false,
  templateUrl: './explore-eot.component.html',
  styleUrl: './explore-eot.component.scss'
})
export class ExploreEotComponent {
eotList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','project','contractor','eotcode', 'initiatedate','days',  'approveddate','eotstatus','letters'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  statusCounts = { approved: 0, rejected: 0, pending: 0 };
  @Input() filters:any={};
  readonly dialog = inject(MatDialog);
  private subscription: Subscription = new Subscription();
  @Output() OnControlFilter:EventEmitter<any> = new EventEmitter();
   private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '700px', 
    disableClose: false,
    data: {},
  };

  constructor(private sessionService : SessionService,private eotService:EotInterfaceService,
    private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService : NotifyBarService) {     
    this.dataSource = new MatTableDataSource(this.eotList);
  }


  ngOnInit()  {      
    this.OnControlFilter.emit({value:{
      daterange:true,
      isproject:true,
      iscompany:true,
      approvalstatus:true,
    }}); 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnChanges(changes: SimpleChanges) {   
    if (changes['filters']) {
      this.isLoading=true;    
      const payload = {
        ...changes['filters'].currentValue,
        startdate: changes['filters'].currentValue.startdate || null,
        enddate: changes['filters'].currentValue.enddate || null
      }; 
      this.statusCounts={ approved: 0, rejected: 0, pending: 0 };
      this.subscription = this.eotService.exploreEOTDetailsByOrdIdProjectId(payload, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
        if (response && response.success) {
          this.eotList = response.data;
          this.dataSource = new MatTableDataSource(this.eotList);               
          this.updateTable(this.eotList);           
           this.eotList.forEach(item => {
            const status = item.status?.toLowerCase();
            if (status === ApprovalStatus.APPROVED) this.statusCounts.approved++;
            else if (status === ApprovalStatus.REJECTED) this.statusCounts.rejected++;
            else if (status === ApprovalStatus.PENDING) this.statusCounts.pending++;
          });         
        }
      });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private updateTable(info: any) {
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, 10);
    this.pageSize = this.helperService.getPageSize();
  }

  import() {
    const config = this.defaultdialogoptions;
      config.minWidth='75vw';
        config.data = {
          pageGuid: this.route.snapshot.data['pageGuid'],
          type: this.route.snapshot.data['type'], 
          template_type: TemplateType.EOT   
        };
      this.dialog.open(UploadFileComponent,config);    
    }

    export() {
      
    }  

  viewletter(data:any){
    const config = this.defaultdialogoptions;
    config.minWidth='75vw';
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element:{id:data}
    };
    this.dialog.open(ViewLetterDetailsComponent,config);
  }
}


