import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InventoryControlService } from '@app/inventory-control/inventory-control.service';
import { RequestService } from '@app/requests/request.service';
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
  selector: 'app-imperest-billing-list',
  standalone: false,
  templateUrl: './imperest-billing-list.component.html',
  styleUrl: './imperest-billing-list.component.scss'
})
export class ImperestBillingListComponent {
  imperestList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','project','office','name','date','gamount','apramount', 'view','action'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  isSearching=false;
  statusList:any[]=[];
  userObj:any={};
  billingSummary:any;
  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private requestService:RequestService,private helperService:HelperService,
  private stateDataService:StateDataService, private notifyBarService:NotifyBarService,
  private sessionService:SessionService, private commonService:CommonService,private router:Router,
 ){
  this.dataSource = new MatTableDataSource(this.imperestList);
 }

 ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data) => {   
    if (data.event == 'impaprv'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'impdelete' && data.valid && data.value){
      this.deleteRow(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
  });
  this.sessionService.approvalStatusSubject$.subscribe((statusresponse:any)=>{
    if(statusresponse){
     this.statusList= statusresponse;
    }
  })
  this.sessionService.userSubject$.subscribe((response:any)=>{
    if(response){
     this.userObj= response;
    }
  })
  this.filterImprest();
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

  updateRowData(updatedata: any) {
    let data= updatedata.acted;
    const index:any = this.dataSource.data.findIndex((x:any) => x.id == data.id);   
    if (index !== -1) {
      const updatedRow = {
        ...data,
        ...this.setLevelConfig(this.setLevel(data.levels))
      };  
      this.dataSource.data[index] = updatedRow;          
    }
    this.dataSource._updateChangeSubscription();
    this.billingSummary= [...updatedata.summary];
  }
  setLevel(items:any) {
    if(items){ 
      return  items.map((level:any) => ({
          ...level,
          status: this.statusList.find((x:any)=>x.id==level.statusid)?.name 
        }))
      }
   }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data.id);    
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
    this.billingSummary= [...data.summary];
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
  clear(){
    this.searchObj={
      projectid:'',
      companyid:''
    };
    this.filterImprest();
  }
  filterImprest(){
  this.isSearching=true;
    this.requestService.searchImperestBillingRequests({...this.searchObj,employeeid:this.userObj.employeeid}, '')
      .pipe(finalize(() => {this.isLoading = false;this.isSearching=false}))
      .subscribe({next : (response: any) => {
        if (response && response.success) {
          this.billingSummary= response.data.summary;
          this.imperestList = response.data.billings.map((item:any) => ({
            ...item,
            ...this.setLevelConfig(item.levels)
          }));
          this.dataSource = new MatTableDataSource(this.imperestList);
          this.pageSize= this.helperService.getPageSize();
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
  edit(data:any){
     this.router.navigate(['/imperest-billing-request', 'edit', data.id], {state:{value :data,searchObj:this.searchObj}});
  }
  delete_row(data:any){
     this.router.navigate(['/imperest-billing-request', 'delete', data.id], {state:{value :data,searchObj:this.searchObj}});
  }
}


