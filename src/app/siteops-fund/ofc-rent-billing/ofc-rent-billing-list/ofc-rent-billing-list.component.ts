import { ChangeDetectorRef, Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-ofc-rent-billing-list',
  standalone: false,
  templateUrl: './ofc-rent-billing-list.component.html',
  styleUrl: './ofc-rent-billing-list.component.scss'
})
export class OfcRentBillingListComponent {

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
  isSearchLoading=false;

  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private officeService:OfficeInterfaceService,private helperService:HelperService,
  private stateDataService:StateDataService, private notifyBarService:NotifyBarService,
  private cdr : ChangeDetectorRef, private commonService:CommonService, private sessionService:SessionService
 ){
  this.dataSource = new MatTableDataSource(this.ofcBilling);
 }

 ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data:any) => {   
    if (data.event == 'ofcrentbilledit'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if (data.event == 'ofcrentbilladd' && data.valid && data.value) {
      this.addBulkBilling(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'ofcrentbilldelete' && data.valid && data.value){
      this.deleteRow(data.value.id);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
  });
  this.sessionService.approvalStatusSubject$.subscribe((statusresponse:any)=>{
    if(statusresponse){
     this.statusList= statusresponse;
    }
  })
  this.officeService.searchOfficeBilling({}, '')
  .pipe(finalize(() => this.isLoading = false))
  .subscribe((response: any) => {
    if (response && response.success) {      
      this.ofcBilling = response.data.map((item:any) => ({
        ...item,
        levels: this.setLevel(item.levels) 
      }));
      this.updateTable(this.ofcBilling);
    }
  });
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
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
      if(element) {
        element.id=data.id,
        element.projectid =data.projectid,
        element.companyid=data.companyid,
       
        this.dataSource._updateChangeSubscription();
      }
  }
  addRowData(data: any) {
    const data1:any = {
      id: data.id,
      projectid :data.projectid,
      companyid :data.companyid,
      officeid:data.officeid,
      monthandyear:data.monthandyear,
      project:data.project,
      totalamount:data.totalamount,
      levels: this.setLevel(data.levels)
    }
    this.ofcBilling.unshift(data1);
    this.updateTable(this.ofcBilling); 
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
    this.filterOfcBilling();
   }
   compChange(data:any){
     this.searchObj.companyid= data.value ?? '';
     this.searchObj.projectid= data.projectid ?? '';
     this.filterOfcBilling();
   }

  vehicleChange(data:any){ 
    this.searchObj.vehicleid= data.value ?? '';
    this.filterOfcBilling();
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
    this.filterOfcBilling();
   }

  clear() {
    this.searchObj={
      projectid:'',
      companyid:'',
      monthandyear:null,
      vehicleid:''
    };
    this.filterOfcBilling();
  }
   filterOfcBilling(){
    this.isSearchLoading=true;
    this.officeService.searchOfficeBilling(this.searchObj, '')
    .pipe(finalize(() => {this.isLoading = false; this.isSearchLoading=false}))
    .subscribe((response: any) => {
      if (response && response.success) {
        this.ofcBilling = response.data.map((item:any) => ({
          ...item,
          levels: this.setLevel(item.levels) 
        }));
        this.dataSource = new MatTableDataSource(this.ofcBilling);
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
}



