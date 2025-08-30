import { ChangeDetectorRef, Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApprovalStatus } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { VehicleService } from '@app/vehicle-control/vehicle.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-vehicle-billing-list',
  standalone: false,
  templateUrl: './vehicle-billing-list.component.html',
  styleUrl: './vehicle-billing-list.component.scss'
})
export class VehicleBillingListComponent {
  vehicleBilings:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','vehiclename', 'vehiclenum', 'extraamtkmabovefix', 'fixeddetails', 'extraDetails','totaldetails','aaproved','status', 'action'];
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
  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private vehicleService:VehicleService,private helperService:HelperService,
  private stateDataService:StateDataService, private notifyBarService:NotifyBarService,
  private cdr : ChangeDetectorRef, private sessionService:SessionService, private commonService:CommonService
 ){
  this.dataSource = new MatTableDataSource(this.vehicleBilings);
 }

 ngOnInit()  {

  this.stateDataService.stateDataSubject.subscribe((data:any) => {   
    if (data.event == 'billingedit'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if (data.event == 'billingadd' && data.valid && data.value) {
      if(data.bulk)
        this.addBulkBilling(data.value);
      else
        this.addRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'billingdelete' && data.valid && data.value){
      this.deleteRow(data.value.id);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
  });
  this.sessionService.approvalStatusSubject$.subscribe((statusresponse:any)=>{
    if(statusresponse){
     this.statusList= statusresponse;
     this.vehicleService.getVehicleBillingDetailsByOrgId({}, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
        if (response && response.success) {        
        this.vehicleBilings = response.data.map((item:any) => ({
          ...item,
          ...this.setLevelConfig(item.levels) 
        }));
        this.updateTable(this.vehicleBilings);
        }
    });
    }
  })
    
  }
  setLevel(items:any) {
    if(items){ 
    return  items.map((level:any) => ({
        ...level,
        status: this.statusList.find((x:any)=>x.id==level.statusid)?.name 
      }))
    }
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
    this.resultsLength= this.vehicleBilings.length;   
  }

  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
      if(element) {
        element.id=data.id,
        element.projectid =data.projectid,
        element.vehicleid=data.vehicleid,
        element.project=data.project,
        element.vehicleno=data.vehicleno,
        element.vehiclename=data.vehiclename,
        element.ownername=data.ownername,
        element.monthandyear=data.monthandyear,
        element.enddate=data.enddate,
        element.extrakm=data.extrakm,
        element.fixedkm=data.fixedkm,
        element.extraamountperkmafterfixedkm=data.extraamountperkmafterfixedkm,
        element.fixedamount=data.fixedamount
        this.dataSource._updateChangeSubscription();
      }
  }
  addRowData(data: any) {
    const data1:any = {
      id: data.id,
      projectid :data.projectid,
      vehicleid:data.vehicleid,
      ownername:data.ownername,
      monthandyear:data.monthandyear,
      enddate:data.enddate,
      extrakm:data.extrakm,
      currentkm:data.currentkm,
      fixedkm:data.fixedkm,
      extraamountperkmafterfixedkm:data.extraamountperkmafterfixedkm,
      fixedamount:data.fixedamount,
      project:data.project,
      vehicleno:data.vehicleno,
      vehiclename:data.vehiclename,
      levels: this.setLevel(data.levels)
    }   
    this.vehicleBilings.unshift(data1);
    this.updateTable(this.vehicleBilings); 
  }
  addBulkBilling(data:any){
    data.forEach((element:any) => {
      this.addRowData(element);
    });
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  searchObj:any={};
  projectChange(data:any){ 
    this.searchObj.projectid= data.value ?? '';
    this.filterVehicleBillings();
   }
   compChange(data:any){
     this.searchObj.companyid= data.value ?? '';
     this.searchObj.projectid= data.projectid ?? '';
     this.filterVehicleBillings();
   }

  vehicleChange(data:any){ 
    this.searchObj.vehicleid= data.value ?? '';
    this.filterVehicleBillings();
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
    this.filterVehicleBillings();
   }
  clear(){
    this.searchObj.projectid= '';
    this.searchObj.companyid= '';
    this.searchObj.monthandyear= null;
    this.searchObj.vehicleid= '';
    this.filterVehicleBillings();
  }
   filterVehicleBillings(){
    this.isSearchLoading=true;
    this.vehicleService.getVehicleBillingDetailsByOrgId(this.searchObj, '')
    .pipe(finalize(() => {this.isLoading = false; this.isSearchLoading=false}))
    .subscribe((response: any) => {
      if (response && response.success) {
      this.vehicleBilings = response.data;
      this.dataSource = new MatTableDataSource(this.vehicleBilings);
      }
      this.cdr.detectChanges();
  });
   }
   getVehicleBilling(data:any){
    return this.commonService.getVehicleBillingInfo(data);
  }
}


