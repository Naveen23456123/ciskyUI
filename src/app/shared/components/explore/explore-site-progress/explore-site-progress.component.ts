import {AfterViewInit, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { config, finalize, Subscription, take } from 'rxjs';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SiteProgressInterfaceService } from '@app/shared/services/external/site-progress-interface.service';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { ApprovalStatus, CONSTANTS, DialogOperation } from '@app/shared/models/constant.config';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { untilDestroyed } from '@app/core/until-destroyed';
import moment from 'moment';
import { ViewLetterDetailsComponent } from '../../letters/view-letter-details/view-letter-details.component';

@Component({
  selector: 'app-explore-site-progress',
  standalone: false,
  templateUrl: './explore-site-progress.component.html',
  styleUrl: './explore-site-progress.component.scss'
})
export class ExploreSiteProgressComponent {
siteProgressList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','project','contractor','month', 'year', 'status','submitted','acted','letters'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  @Input() filters:any={};
  statusCounts = { approved: 0, rejected: 0, pending: 0 };
  readonly dialog = inject(MatDialog);
  private subscription: Subscription = new Subscription();
  @Output() OnControlFilter:EventEmitter<any> = new EventEmitter();
   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
      };

  constructor(private sessionService : SessionService,private siteProgressService:SiteProgressInterfaceService,
    private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService:NotifyBarService){     
       this.dataSource = new MatTableDataSource(this.siteProgressList);
    }

    ngOnInit()  {     
      this.OnControlFilter.emit({value:{
        relatedto:true,
        isproject:true,
        iscompany:true,
        approvalstatus:true
      }}); 
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters']) {
      this.isLoading=true;   
      this.statusCounts={ approved: 0, rejected: 0, pending: 0 };  
      this.siteProgressService.getAllSiteProgressByOrdIdProjectId(changes['filters'].currentValue, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
        if (response && response.success) {
          this.siteProgressList = response.data;
          this.dataSource = new MatTableDataSource(this.siteProgressList);               
          this.updateTable(this.siteProgressList);
          this.statusCounts={ approved: 0, rejected: 0, pending: 0 };
          this.siteProgressList.forEach(item => {
            const status = item.status?.toLowerCase();
            if (status === ApprovalStatus.APPROVED) this.statusCounts.approved++;
            else if (status === ApprovalStatus.REJECTED) this.statusCounts.rejected++;
            else if (status === ApprovalStatus.PENDING) this.statusCounts.pending++;
          });           
        }
      });
    }
  }
    private updateTable(info: any) {
      this.dataSource = new MatTableDataSource<any>(info);
      this.pagination = this.helperService.paginationOptionGeneration(info, 10);
      this.pageSize = this.helperService.getPageSize();
    }
    import() {
      const config = this.defaultdialogoptions;
      config.minWidth='1200px';
      //config.minHeight='600px';
        config.data = {
          pageGuid: this.route.snapshot.data['pageGuid'],
          type: this.route.snapshot.data['type'], 
          template_type: TemplateType.SITEPROGRESS   
        };
          this.dialog.open(UploadFileComponent,config);

    }
    export() {
      
    }   

  getMonthandYear(data:any){
    if(data){
      return {month:moment(data).format('MMMM'),year :moment(data).format('YYYY')};
    }
    return {month:'-',year:'-'};
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


