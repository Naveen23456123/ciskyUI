import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RequestService } from '@app/requests/request.service';
import { PdfViewerComponent } from '@app/shared/components/pdf-viewer/pdf-viewer.component';
import { ApprovalStatus } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-exp-req-billing-list',
  standalone: false,
  templateUrl: './exp-req-billing-list.component.html',
  styleUrl: './exp-req-billing-list.component.scss'
})
export class ExpReqBillingListComponent {
 expenseList:any[]= [];
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
  private sessionService:SessionService, private commonService:CommonService,private router:Router
 ){
  this.dataSource = new MatTableDataSource(this.expenseList);
 }

 ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data) => {   
    if (data.event == 'expaprv'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'expdelete' && data.valid && data.value){
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
  this.filterExpRequest();
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
    this.expenseList = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);
    this.pageSize= this.helperService.getPageSize();   
    this.resultsLength= this.expenseList.length;   
  }
  updateRowData(updateddata: any) {
    let data= updateddata.acted;
    const index:any = this.dataSource.data.findIndex((x:any) => x.id == data.id);   
    if (index !== -1) {
      const updatedRow = {
        ...data,
        ...this.setLevelConfig(this.setLevel(data.levels))
      };  
      this.dataSource.data[index] = updatedRow; 
      console.log(updatedRow);     
    }
    this.dataSource._updateChangeSubscription();
    this.billingSummary= [...updateddata.summary];
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
    const index = this.dataSource.data.findIndex((x:any) => x.id == data.expenseid);
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
   this.filterExpRequest();
  }
  compChange(data:any){
    this.searchObj.companyid= data.value ?? '';
    this.searchObj.projectid= data.projectid ?? '';
    this.filterExpRequest();
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
    this.filterExpRequest();
  }
  filterExpRequest(){
  this.isSearching=true;
    this.requestService.searchExpenseBillingRequests({...this.searchObj,employeeid:this.userObj.employeeid}, '')
      .pipe(finalize(() => {this.isLoading = false;this.isSearching=false}))
      .subscribe({next : (response: any) => {
        if (response && response.success) {
          this.billingSummary= response.data.summary;
          this.expenseList = response.data.billings.map((item:any) => ({
            ...item,
            levels:this.setLevel(item.levels)
          }));
          this.updateTable(this.expenseList);
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
     this.router.navigate(['/exp-billing-request', 'edit', data.id], {state:{value :data,searchObj:this.searchObj}});
  }
  delete_row(data:any){
     this.router.navigate(['/exp-billing-request', 'delete', data.id], {state:{value :data,searchObj:this.searchObj}});
  }
  viewPdf(data:any){
    const config = this.defaultdialogoptions;
    config.minWidth='80vw';
    config.data = {
      element:data
    };
    this.dialog.open(PdfViewerComponent,config);
  }
}



