import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryControlService } from '@app/inventory-control/inventory-control.service';
import { ApprovalStatus } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { SiteControlService } from '@app/site-control/site-control.service';
import { SiteopsService } from '@app/siteops-fund/siteops.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-imperest-list',
  standalone: false,
  templateUrl: './imperest-list.component.html',
  styleUrl: './imperest-list.component.scss'
})
export class ImperestListComponent {
  imperestList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','project','office','name','date','gamount','apramount', 'view','action'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
 @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!:number;
  isSearching=false;
  statusList:any[]=[];
  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private siteopsService:SiteopsService,private helperService:HelperService,
  private stateDataService:StateDataService, private notifyBarService:NotifyBarService,
  private sessionService:SessionService, private commonService:CommonService
 ){
  this.dataSource = new MatTableDataSource(this.imperestList);
 }

 ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data) => {   
    if (data.event == 'impedit'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if (data.event == 'impadd' && data.valid && data.value) {
      this.addRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'impdelete' && data.valid && data.value){
      this.deleteRow(data.value.id);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
  });
  this.sessionService.approvalStatusSubject$.subscribe((statusresponse:any)=>{
    if(statusresponse){
     this.statusList= statusresponse;
     this.filterImprest();
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
    this.imperestList = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.resultsLength= this.imperestList.length;   
  }

  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element){
    element.id = data.id;
    element.name = data.name;
    element.date=data.date,
    element.days=data.days,
    element.remarks=data.remarks,
    element.details = data.details;
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(newdata: any) {
    const data1:any = {
      id:newdata.id,
      companyid:newdata.companyid,
      projectid:newdata.projectid,
      officeid:newdata.officeid,
      project:newdata.project,
      office:newdata.office,
      name:newdata.name,
      date:newdata.date,
      days:newdata.days,
      remarks:newdata.remarks, 
      details:newdata.details,
      ...this.setLevelConfig(newdata.levels) 
    } 
    this.imperestList.unshift(data1);
    this.updateTable(this.imperestList); 
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  searchObj:any={
    projectid:'',   
    companyid:''
  };
  projectChange(data:any){ 
   this.searchObj.projectid= data.value ?? '';
   this.filterImprest();
  }
  compChange(data:any){
    this.searchObj.companyid= data.value ?? '';
    this.searchObj.projectid= data.projectid ?? '';
    this.filterImprest();
  }
  anyChange(data:any){
    if(data && data.value){ 
      this.dataSource.filter = data.value.trim().toLowerCase()
    }
    else{
      this.dataSource.filter = '';
    }
  }
  clear() {
    this.searchObj={
      projectid:'',
      companyid:'',
    };
    this.filterImprest();
  }
  filterImprest(){
  this.isSearching=true;
    this.siteopsService.searchImperestListByOrgId(this.searchObj, '')
      .pipe(finalize(() => {this.isLoading = false;this.isSearching=false}))
      .subscribe({next : (response: any) => {
        if (response && response.success) {
          this.imperestList = response.data.map((item:any) => {
            return{
            ...item,
            ...this.setLevelConfig(item.levels)          
            }          
          });
          this.updateTable(this.imperestList);
        }
    }});
  }
  setLevelConfig(levels:any){
    const overallstatus=this.commonService.getOverallStatus(levels);
    return {
      levels:overallstatus==ApprovalStatus.REJECTED ? levels?.filter((x:any)=>x.status.toLowerCase()==ApprovalStatus.REJECTED.toLocaleLowerCase()):levels,
      hasRejected:overallstatus==ApprovalStatus.REJECTED,
      status:overallstatus, 
      isedit:overallstatus==ApprovalStatus.PENDING
    }
  }
}

