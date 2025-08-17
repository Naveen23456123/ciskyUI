import { ChangeDetectorRef, Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RequestService } from '@app/requests/request.service';
import { CommonService } from '@app/shared/services/common.service';
import { OfficeInterfaceService } from '@app/shared/services/external/office-interface.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { VehicleService } from '@app/vehicle-control/vehicle.service';
import moment from 'moment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-office-billing-list',
  standalone: false,
  templateUrl: './office-billing-list.component.html',
  styleUrl: './office-billing-list.component.scss'
})
export class OfficeBillingListComponent {


  ofcBilling:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','ofc','project', 'month', 'year', 'amount','aamount','status', 'action'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
 @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!:number;
  statusList:any[]=[];
  userObj:any={};
  isSearchLoading=false;
  billingSummary:any;
  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private requestService:RequestService,private helperService:HelperService,
  private stateDataService:StateDataService, private notifyBarService:NotifyBarService,private router:Router,
  private cdr : ChangeDetectorRef, private commonService:CommonService, private sessionService:SessionService
 ){
  this.dataSource = new MatTableDataSource(this.ofcBilling);
 }

 ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data:any) => {   
    if (data.event == 'ofcaprv'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'ofcreq-delete' && data.valid && data.value){
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
  this.filterRequestData();
}
 setLevel(items:any) {
  if(items){ 
  return  items.map((level:any) => ({
      ...level,
      status: this.statusList.find((x:any)=>x.id==level.statusid)?.name 
    }))
  }
 }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  private updateTable(info: any) {
    this.ofcBilling = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.resultsLength= this.ofcBilling.length;   
  }
  updateRowData(data: any) {   
    const element:any = this.dataSource.data.find((x:any) => x.id == data.billingid); 
      if(element) {
        let level = element.levels.find((x:any) => x.id == data.id); 
        if(level){
          level.totalamount=data.amount,
          level.actedamount=data.amount,
          level.statusid=data.statusid,
          level.status= this.statusList.find((x:any)=>x.id==level.statusid)?.name;    
        }
        element.approved= data.approved;
        this.dataSource._updateChangeSubscription();
         this.billingSummary= [...data.summary];
      }
  }

  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data.id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
    this.billingSummary= [...data.summary];
  }
  searchObj:any={};
  projectChange(data:any){ 
    this.searchObj.projectid= data.value ?? '';
    this.filterRequestData();
   }
   compChange(data:any){
     this.searchObj.companyid= data.value ?? '';
     this.searchObj.projectid= data.projectid ?? '';
     this.filterRequestData();
   }

  vehicleChange(data:any){ 
    this.searchObj.vehicleid= data.value ?? '';
    this.filterRequestData();
   }

   anyChange(data:any){
     if(data && data.value){ 
       this.dataSource.filter = data.value.trim().toLowerCase()
     }
     else{
       this.dataSource.filter = '';
     }
   }
   monthYearChange(data:any){
    this.searchObj.monthandyear= data.value ?? '';
    this.filterRequestData();
   }
  clear(){
    this.searchObj={
      projectid:'',
      companyid:'',
      monthandyear:null
    };
    this.filterRequestData();
  }
   filterRequestData(){
    this.isSearchLoading=true;
    this.requestService.searchOfficeBillingRequests({...this.searchObj,employeeid:this.userObj.employeeid}, '')
    .pipe(finalize(() => {this.isLoading = false; this.isSearchLoading=false}))
    .subscribe((response: any) => {
      if (response && response.success) {
        this.billingSummary= response.data.summary;
        this.ofcBilling = response.data.billings.map((item:any) => ({
          ...item,
          levels: this.setLevel(item.levels) 
        }));
        this.updateTable(this.ofcBilling);
      }
      
    });
    this.cdr.detectChanges();
  }

  getMonthandYear(data:any){
    if(data){
      return {month:moment(data).format('MMMM'),year :moment(data).format('YYYY')};
    }
    return {month:'-',year:'-'};
  }
  edit(data:any){
     this.router.navigate(['/ofc-billing-request', 'edit', data.id], {state:{value :data,searchObj:this.searchObj}});
  }
  delete_row(data:any){
     this.router.navigate(['/ofc-billing-request', 'delete', data.id], {state:{value :data,searchObj:this.searchObj}});
  }
}




