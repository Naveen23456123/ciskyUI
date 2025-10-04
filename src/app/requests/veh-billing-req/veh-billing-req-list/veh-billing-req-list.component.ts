import { ChangeDetectorRef, Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RequestService } from '@app/requests/request.service';
import { CommonService } from '@app/shared/services/common.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { VehicleService } from '@app/vehicle-control/vehicle.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-veh-billing-req-list',
  standalone: false,
  templateUrl: './veh-billing-req-list.component.html',
  styleUrl: './veh-billing-req-list.component.scss'
})
export class VehBillingReqListComponent {
 vehicleBilings:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','monthyear','vehicle', 'fixeddetails', 'totaldetails','aaproved','status', 'action'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
 @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!:number;
  isSearchLoading=false;
  statusList:any[]=[];
  userObj:any={};
  readonly dialog = inject(MatDialog);
  billingSummary:any;
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private requestService:RequestService,private helperService:HelperService,private router:Router,
  private stateDataService:StateDataService, private notifyBarService:NotifyBarService,
  private cdr : ChangeDetectorRef, private sessionService:SessionService, private commonService:CommonService
 ){
  this.dataSource = new MatTableDataSource(this.vehicleBilings);
 }

 ngOnInit()  {

  this.stateDataService.stateDataSubject.subscribe((data:any) => {   
    if (data.event == 'vehaprv'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'vehreqdelete' && data.valid && data.value){
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
  this.filterVehicleBilling();
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
    this.vehicleBilings = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.pageSize= this.helperService.getPageSize();
    this.resultsLength= this.vehicleBilings.length;   
  }
  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.billingid);    
      if(element) {
        let level = element.levels.find((x:any) => x.id == data.id);       
        if(level){
          level.totalamount=data.amount,
          level.actedamount=data.approved,
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
    this.filterVehicleBilling();
   }
   compChange(data:any){
     this.searchObj.companyid= data.value ?? '';
     this.searchObj.projectid= data.projectid ?? '';
     this.filterVehicleBilling();
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
    this.filterVehicleBilling();
   }
  clear(){
    this.searchObj={
      projectid:'',
      companyid:'',
      monthandyear:null
    };
    this.filterVehicleBilling();
  }
   filterVehicleBilling(){
    this.isSearchLoading=true;
    this.requestService.searchVehicleBillingRequests({...this.searchObj,employeeid:this.userObj.employeeid}, '')
    .pipe(finalize(() => {this.isLoading = false; this.isSearchLoading=false}))
    .subscribe((response: any) => {
      if (response && response.success) {
      this.billingSummary= response.data.summary;
      this.vehicleBilings = response.data.billings.map((item:any) => ({
        ...item,
        levels: this.setLevel(item.levels) 
      }));
      this.updateTable(this.vehicleBilings);
      }
      this.cdr.detectChanges();
  });
   }
   getVehicleBilling(data:any){
    return this.commonService.getVehicleBillingInfo(data);
  }
  edit(data:any){
     this.router.navigate(['/veh-billing-request', 'edit', data.id], {state:{value :data,searchObj:this.searchObj}});
  }
  delete_row(data:any){
     this.router.navigate(['/veh-billing-request', 'delete', data.id], {state:{value :data,searchObj:this.searchObj}});
  }
}



