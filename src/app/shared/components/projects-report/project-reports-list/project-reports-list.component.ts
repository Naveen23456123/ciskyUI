import {AfterViewInit, Component, OnDestroy, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { distinctUntilChanged, finalize, Subscription, take } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManageProjectReportsComponent } from '../manage-project-reports/manage-project-reports.component';
import { DialogOperation } from '@app/shared/models/constant.config';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { untilDestroyed } from '@app/core/until-destroyed';
import { ViewLetterDetailsComponent } from '../../letters/view-letter-details/view-letter-details.component';
import { ProjectReportInterfaceService } from '@app/shared/services/external/project-report-interface.service';
import { GenerateCsvService } from '@app/shared/services/generate-csv.service';


@Component({
  selector: 'app-project-reports-list',
  standalone: false,
  templateUrl: './project-reports-list.component.html',
  styleUrl: './project-reports-list.component.scss'
})
export class ProjectReportsListComponent {
reportList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','type','name', 'no','letterno',  'date','file','action'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  readonly dialog = inject(MatDialog);
  private subscription: Subscription = new Subscription();

   private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '700px', 
    disableClose: false,
    data: {},
  };

  constructor(private sessionService : SessionService,private reportService:ProjectReportInterfaceService,
    private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService : NotifyBarService,private csvService:GenerateCsvService) {     
    this.dataSource = new MatTableDataSource(this.reportList);
  }


  ngOnInit()  {  
    this.subscription = this.sessionService.projectEntitySubject$.pipe(untilDestroyed(this)).subscribe((response)=>{     
      if(response && response.projectId){
       this.reportService.getPReportList({ 
          projectId: response.projectId,
          contractorId: response.isConsultant? '': response.contractorId 
        }, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((response: any) => {
          if (response && response.success) {
            this.reportList = response.data;
            this.dataSource = new MatTableDataSource(this.reportList);               
            this.updateTable(this.reportList);          
          }
        });
      }
    });   
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

  private updateTable(info: any) {
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, 10);
    this.pageSize = this.helperService.getPageSize();
  }


 export(){
    if(this.reportList && this.reportList.length>0)
      this.csvService.downloadFile(this.reportList,this.reportService.getCSVTemplateColumnList(),'Report');
  } 

  add_report(){
    const config = this.defaultdialogoptions;
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: DialogOperation.ADD
      };
      this.defaultdialogoptions.minWidth='50vw';
      const dialogRef = this.dialog.open(ManageProjectReportsComponent, config);
      dialogRef.afterClosed().subscribe((data) => {
        if (data && data.valid) {       
          this.notifyBarService.showsnackbar('The Report created successfully.');
          this.addRowData(data.value);
        }
        else {
        }
      });
    }
  
  edit_eot(row:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.EDIT,
      element: row
    };
    this.defaultdialogoptions.minWidth='50vw';
    const dialogRef = this.dialog.open(ManageProjectReportsComponent, this.defaultdialogoptions);
      dialogRef.afterClosed().subscribe((data) => {       
        if (data.valid) {
          this.notifyBarService.showsnackbar('The Report updated successfully.');
          this.updateRowData(data.value);
        }
        else {
        }
      });
    }

  delete_eot(row:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.DELETE,
      element: row
    };
    this.defaultdialogoptions.minWidth='45vw';
    const dialogRef = this.dialog.open(ManageProjectReportsComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        this.notifyBarService.showsnackbar('The Report removed successfully.');
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
    element.typeid=data.typeid,
    element.name= data.name,
    element.date =data.date,
    element.no=data.no,
    element.letterno=data.letterno,
    element.remark=data.remark,
    element.type=data.type
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(data: any) {
    const data1:any = {
      id:data.id,
      name: data.name,
      date :data.date,
      no:data.no,
      letterno:data.letterno,
      remark:data.remark,
      docaddress:data.docaddress,
      type:data.type,
      typeid:data.typeid
    }      
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription();
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
}


