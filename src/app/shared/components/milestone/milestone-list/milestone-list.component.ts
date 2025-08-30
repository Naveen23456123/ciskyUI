import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { finalize } from 'rxjs';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MilestoneInterfaceService } from '@app/shared/services/external/milestone-interface.service';
import { ManageMilestoneComponent } from '../manage-milestone/manage-milestone.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { DialogOperation } from '@app/shared/models/constant.config';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { ViewLetterDetailsComponent } from '../../letters/view-letter-details/view-letter-details.component';
import { CommonService } from '@app/shared/services/common.service';
import { GenerateCsvService } from '@app/shared/services/generate-csv.service';

@Component({
  selector: 'app-milestone-list',
  standalone: false,
  templateUrl: './milestone-list.component.html',
  styleUrl: './milestone-list.component.scss'
})
export class MilestoneListComponent {
 milestones:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','name', 'milestonedate', 'day','status','actual','reschd','letters', 'action'];
  dataSource!: MatTableDataSource<any[]>;
 @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!:number;
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {       
        disableClose: false,
        data: {},
      };

  constructor(private sessionService : SessionService,private milestoneService:MilestoneInterfaceService,
      private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService:NotifyBarService, private commonService:CommonService,
  private csvService:GenerateCsvService){     
       this.dataSource = new MatTableDataSource(this.milestones);
    }

    ngOnInit()  {
      this.sessionService.projectEntitySubject$.subscribe((response:any)=>{
        if(response){
          this.milestoneService.getAllMilestonesDetailsByOrdIdProjectId({
            projectId: response.projectId,
            contractorId: response.isConsultant? '': response.contractorId 
          }, '')
          .pipe(finalize(() => this.isLoading = false))
          .subscribe((response: any) => {
            if (response && response.success) {
             this.milestones = response.data;               
             this.updateTable(this.milestones);
            }
          });
        }
        else {
          this.milestoneService.getAllMilestonesDetailsByOrdIdProjectId({ }, '')
          .pipe(finalize(() => this.isLoading = false))
          .subscribe((response: any) => {
            if (response && response.success) {
             this.milestones = response.data;               
             this.updateTable(this.milestones);
            }
          });
        }
      })     
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
    this.milestones = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.resultsLength= this.milestones.length;   
  }
    import() {
      const config = this.defaultdialogoptions;
              config.minWidth='75vw';
                config.data = {
                  pageGuid: this.route.snapshot.data['pageGuid'],
                  type: this.route.snapshot.data['type'], 
                  template_type: TemplateType.MILESTONE   
                };
      this.dialog.open(UploadFileComponent,config);
    }

 export(){
    if(this.milestones && this.milestones.length>0)
      this.csvService.downloadFile(this.milestones,this.milestoneService.getCSVTemplateColumnList(),'MileStone');
  } 
    
  milestone(){
    const config = this.defaultdialogoptions;
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: this.route.snapshot.data['type'],  

      };
      config.minWidth='50vw';
      const dialogRef = this.dialog.open(ManageMilestoneComponent, config);
      dialogRef.afterClosed().subscribe((data:any) => {
        if (data && data.valid) {
          this.notifyBarService.showsnackbar('The MileStone created successfully.');
          this.addRowData(data.value);
        }
        else {
          //this.router.navigate(['../'], { relativeTo: this.route });
        }
    });
  }

  editms(data:any){
    const config = this.defaultdialogoptions;
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: DialogOperation.EDIT,
        element:data
      };
      config.minWidth='50vw';
      const dialogRef = this.dialog.open(ManageMilestoneComponent, config);
      dialogRef.afterClosed().subscribe((data) => {
        if (data && data.valid) {
          this.notifyBarService.showsnackbar('The MileStone updated successfully.');
          this.updateRowData(data.value);
        }
        else {
        }
    });
  }

  deletems(data:any){
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.DELETE,
      element:data
    };
    config.minWidth='45vw';
    const dialogRef = this.dialog.open(ManageMilestoneComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        this.notifyBarService.showsnackbar('The MileStone removed successfully.');
        this.deleteRow(data.value);
      }
      else {
      }
  });
  }
  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element){
    element.id = data.id;
    element.projectid=data.projectid,
    element.contractorid=data.contractorid,
    element.name=data.name,
    element.appointeddate=data.appointeddate,
    element.days=data.days,
    element.milestonedate=data.milestonedate,
    element.statusid=data.statusid,
    element.status=data.status,
    element.actualdate=data.actualdate,
    element.rescheduledate=data.rescheduledate,
    element.actualletterid=data.actualletterid,
    element.rescheduleletterid=data.rescheduleletterid
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(data: any) {
    const data1:any = {
      id:data.id,
      projectid:data.projectid,
      contractorid:data.contractorid,
      name:data.name,
      appointeddate:data.appointeddate,
      days:data.days,
      milestonedate:data.milestonedate,
      statusid:data.statusid,
      status:data.status,
      actualdate:data.actualdate,
      rescheduledate:data.rescheduledate,
      actualletterid:data.actualletterid,
      rescheduleletterid:data.rescheduleletterid
    }     
    this.milestones.unshift(data1);
    this.updateTable(this.milestones); 
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data.id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
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
  getDays(sDate:any,eDate:any){
    return this.commonService.getDaysDifference(sDate,eDate);
  }
}
