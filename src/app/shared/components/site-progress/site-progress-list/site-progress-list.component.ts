import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { config, finalize, Subscription, take } from 'rxjs';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MilestoneInterfaceService } from '@app/shared/services/external/milestone-interface.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManageSiteProgressComponent } from '../manage-site-progress/manage-site-progress.component';
import { SiteProgressInterfaceService } from '@app/shared/services/external/site-progress-interface.service';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { DialogOperation } from '@app/shared/models/constant.config';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { untilDestroyed } from '@app/core/until-destroyed';
import moment from 'moment';
import { ViewLetterDetailsComponent } from '../../letters/view-letter-details/view-letter-details.component';
import { GenerateCsvService } from '@app/shared/services/generate-csv.service';
@Component({
  selector: 'app-site-progress-list',
  standalone: false,
  templateUrl: './site-progress-list.component.html',
  styleUrl: './site-progress-list.component.scss'
})
export class SiteProgressListComponent {
 siteProgressList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','month', 'year', 'status','submitted','acted','letters', 'action'];
  dataSource!: MatTableDataSource<any[]>;
 @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!:number;
  readonly dialog = inject(MatDialog);
  private subscription: Subscription = new Subscription();

   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
      };

  constructor(private sessionService : SessionService,private siteProgressService:SiteProgressInterfaceService,
    private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService:NotifyBarService, private csvService:GenerateCsvService){     
       this.dataSource = new MatTableDataSource(this.siteProgressList);
    }

  ngOnInit()  {
    this.subscription = this.sessionService.projectEntitySubject$.pipe(untilDestroyed(this)).subscribe((response)=>{
      if(response){
        this.siteProgressService.getAllSiteProgressByOrdIdProjectId({ 
          projectId: response.projectId,
          contractorId: response.isConsultant? '': response.contractorId 
        }, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((response: any) => {
          if (response && response.success) {
            this.siteProgressList = response.data;              
            this.updateTable(this.siteProgressList);          
          }
        });
      }
    });
  }
  ngOnDestroy(): void {
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

  private updateTable(info: any) {
    this.siteProgressList = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.resultsLength= this.siteProgressList.length;   
  }
  import() {
    const config = this.defaultdialogoptions;
    config.minWidth='1200px';
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: this.route.snapshot.data['type'], 
        template_type: TemplateType.SITEPROGRESS   
      };
      this.dialog.open(UploadFileComponent,config);
  }
 export(){
    if(this.siteProgressList && this.siteProgressList.length>0)
      this.csvService.downloadFile(this.siteProgressList,this.siteProgressService.getCSVTemplateColumnList(),'SiteProgress');
  }   

  add_sp(){
    const config = this.defaultdialogoptions;
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: DialogOperation.ADD
      };
      this.defaultdialogoptions.minWidth='50vw';
      const dialogRef = this.dialog.open(ManageSiteProgressComponent, config);
      dialogRef.afterClosed().subscribe((data) => {
        if (data && data.valid) {       
          this.notifyBarService.showsnackbar('The Site Progress created successfully.');
          this.addRowData(data.value);
        }
        else {
        }
      });
    }
  
  edit_sp(row:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.EDIT,
      element: row
    };
    this.defaultdialogoptions.minWidth='50vw';
    const dialogRef = this.dialog.open(ManageSiteProgressComponent, this.defaultdialogoptions);
      dialogRef.afterClosed().subscribe((data) => {       
        if (data && data.valid) {
          this.notifyBarService.showsnackbar('The Site Progress updated successfully.');
          this.updateRowData(data.value);
        }
        else {
        }
      });
    }

  delete_sp(row:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.DELETE,
      element: row
    };
    this.defaultdialogoptions.minWidth='45vw';
    const dialogRef = this.dialog.open(ManageSiteProgressComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        this.notifyBarService.showsnackbar('The Site Progress removed successfully.');
        this.deleteRow(data.value);
      }
      else {
      }
    });
  }
  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element) {
      element.id = data.id;
      element.contractorid=data.contractorid,
      element.projectid=data.projectid,
      element.monthandyear=data.monthandyear,
      element.physicalprogress= data.physicalprogress,
      element.financialprogress=data.financialprogress,
      element.submittedphysicalprogress= data.submittedphysicalprogress,
      element.submittedfinancialprogress=data.submittedfinancialprogress,
      element.statusid=data.statusid,
      element.status=data.status,
      element.submittedletterid=data.submittedletterid,
      element.approvedletterid=data.approvedletterid
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(data: any) {
    const data1:any = {
      id:data.id,
      contractorid:data.contractorid,
      projectid:data.projectid,
      monthandyear:data.monthandyear,
      physicalprogress: data.physicalprogress,
      financialprogress:data.financialprogress,
      submittedphysicalprogress: data.submittedphysicalprogress,
      submittedfinancialprogress:data.submittedfinancialprogress,
      statusid:data.statusid,
      status:data.status,
      submittedletterid:data.submittedletterid,
      approvedletterid:data.approvedletterid
    }   
    this.siteProgressList.unshift(data1);
    this.updateTable(this.siteProgressList);  
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data.id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
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

