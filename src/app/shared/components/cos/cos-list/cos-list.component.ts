import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { finalize, Subscription, take } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManageCosComponent } from '../manage-cos/manage-cos.component';
import { CosInterfaceService } from '@app/shared/services/external/cos-interface.service';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { DialogOperation } from '@app/shared/models/constant.config';
import { untilDestroyed } from '@app/core/until-destroyed';
import { ViewLetterDetailsComponent } from '../../letters/view-letter-details/view-letter-details.component';
import { GenerateCsvService } from '@app/shared/services/generate-csv.service';

@Component({
  selector: 'app-cos-list',
  standalone: false,
  templateUrl: './cos-list.component.html',
  styleUrl: './cos-list.component.scss'
})
export class CosListComponent {
cosList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','coscode', 'initiatedate','amount',  'approveddate','cosstatus','letters','action'];
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

  constructor(private sessionService : SessionService,private cosService:CosInterfaceService,
    private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService : NotifyBarService,private csvService:GenerateCsvService) {     
    this.dataSource = new MatTableDataSource(this.cosList);
  }

  ngOnInit()  {  
    this.subscription= this.sessionService.projectEntitySubject$.pipe(untilDestroyed(this)).subscribe((response)=>{     
      if(response && response.projectId){
        this.subscription = this.cosService.getAllCOSDetailsByOrdIdProjectId({ 
          projectId: response.projectId,
          contractorId: response.isConsultant? '': response.contractorId 
        }, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((response: any) => {
          if (response && response.success) {
            this.cosList = response.data;              
            this.updateTable(this.cosList);          
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
    this.cosList = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.resultsLength= this.cosList.length;   
  }
  export(){
    if(this.cosList && this.cosList.length>0)
      this.csvService.downloadFile(this.cosList,this.cosService.getCSVTemplateColumnList(),'COS');
  }   

  add_cos(){
    const config = this.defaultdialogoptions;
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: DialogOperation.ADD
      };
      this.defaultdialogoptions.minWidth='50vw';
      const dialogRef = this.dialog.open(ManageCosComponent, config);
      dialogRef.afterClosed().subscribe((data) => {
        if (data && data.valid) {       
          this.notifyBarService.showsnackbar('The COS created successfully.');
          this.addRowData(data.value);
        }
        else {
        }
      });
    }
  
  edit_cos(row:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.EDIT,
      element: row
    };
    this.defaultdialogoptions.minWidth='50vw';
    const dialogRef = this.dialog.open(ManageCosComponent, this.defaultdialogoptions);
      dialogRef.afterClosed().subscribe((data) => {       
        if (data.valid) {
          this.notifyBarService.showsnackbar('The COS updated successfully.');
          this.updateRowData(data.value);
        }
        else {
        }
      });
    }

  delete_cos(row:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.DELETE,
      element: row
    };
    this.defaultdialogoptions.minWidth='45vw';
    const dialogRef = this.dialog.open(ManageCosComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        this.notifyBarService.showsnackbar('The COS removed successfully.');
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
    element.projectid=data.projectid,
    element.contractorid=data.contractorid,
    element.code= data.code,
    element.initiatedate =data.initiatedate,
    element.amount=data.amount,
    element.initiateletterid=data.initiateletterid,
    element.approvedamount=data.approvedamount,
    element.closedate=data.closedate,
    element.statusid=data.statusid,
    element.status=data.status,
    element.closeletterid=data.closeletterid
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(data: any) {
    const data1:any = {
      id:data.id,
      projectid:data.projectid,
      contractorid:data.contractorid,
      code: data.code,
      initiatedate :data.initiatedate,
      amount:data.amount,
      initiateletterid:data.initiateletterid,
      approvedamount:data.approvedamount,
      closedate:data.closedate,
      statusid:data.statusid,
      status:data.status,
      closeletterid:data.closeletterid
    }      
    this.cosList.unshift(data1);
    this.updateTable(this.cosList);
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

