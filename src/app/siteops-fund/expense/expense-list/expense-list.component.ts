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
  selector: 'app-expense-list',
  standalone: false,
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent {
  expenseList:any[]= [];
    isLoading = true;
    displayedColumns: string[] = ['serial','project','office','name','gamount','apramount','status', 'view','action'];
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
  
   constructor(private siteOpsService:SiteopsService,private helperService:HelperService,
    private stateDataService:StateDataService, private notifyBarService:NotifyBarService,
    private sessionService:SessionService, private commonService:CommonService
   ){
    this.dataSource = new MatTableDataSource(this.expenseList);
   }
  
  ngOnInit()  {
    this.stateDataService.stateDataSubject.subscribe((data) => {   
      if (data.event == 'expedit'  && data.valid && data.value) {      
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if(data.event == 'expdelete' && data.valid && data.value){
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'expadd'  && data.valid && data.value) {      
        this.addRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }else if (data.event == 'expclose'  && data.valid && data.value) {      
        this.updateRecord(data.value);
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
    this.filterExpense();
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
    this.resultsLength= this.expenseList.length;   
  }
  addRowData(newdata: any) {
    const data1:any = {
      id:newdata.id,
      companyid:newdata.companyid,
      projectid:newdata.projectid,
      officeid:newdata.officeid,
      project:newdata.project,
      officename:newdata.officename,
      expensename:newdata.expensename,
      officelocation:newdata.officelocation,
      claimed:newdata.claimed,
      remarks:newdata.remarks, 
      approved:newdata.approved,
      ...this.setLevelConfig(newdata.levels) 
    }     
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription();
  }
  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element){
      element.date = data.date;
      element.expensename = data.name;
      this.dataSource._updateChangeSubscription();
    }
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
    this.filterExpense();
  }
  compChange(data:any){
    this.searchObj.companyid= data.value ?? '';
    this.searchObj.projectid= data.projectid ?? '';
    this.filterExpense();
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
    this.filterExpense();
  }
  filterExpense(){
  this.isSearching=true;
    this.siteOpsService.searchExpenseListByOrgId({...this.searchObj,employeeid:this.userObj.employeeid}, '')
      .pipe(finalize(() => {this.isLoading = false;this.isSearching=false}))
      .subscribe({next : (response: any) => {
        if (response && response.success) {
          this.expenseList = response.data.map((item:any) => ({
            ...item,
            ...this.setLevelConfig(item.levels)
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
  updateRecord(data:any){
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element && data.expenses){
      console.log(data.expenses);
      const claimedMap = new Map<string, { categoryid: string, categoryname: string, amount: number }>();
      const approvedMap = new Map<string, { categoryid: string, categoryname: string, amount: number }>();

      for (const entry of data.expenses) {

        // Aggregate claimed
        for (const detail of entry.claimeddetails) {
          const key = detail.categoryid;
          if (!claimedMap.has(key)) {
            claimedMap.set(key, {
              categoryid: detail.categoryid,
              categoryname: detail.categoryname,
              amount: detail.amount
            });
          } else {
            claimedMap.get(key)!.amount += detail.amount;
          }
        }

        // Aggregate approved, get category name from claimed if exists
        for (const detail of entry.approveddetails) {
          const key = detail.categoryid;
          const categoryname = claimedMap.get(key)?.categoryname || '';

          if (!approvedMap.has(key)) {
            approvedMap.set(key, {
              categoryid: detail.categoryid,
              categoryname: categoryname,
              amount: detail.amount
            });
          } else {
            approvedMap.get(key)!.amount += detail.amount;
          }
        }
      }
      element.claimed=Array.from(claimedMap.values());
      element.approved= Array.from(approvedMap.values());
      this.dataSource._updateChangeSubscription();
    }    
  }
}
  
  
  
  