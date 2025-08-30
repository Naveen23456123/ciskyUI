import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ViewReadingImageComponent } from '@app/shared/components/vehicle/view-reading-image/view-reading-image.component';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { VehicleService } from '@app/vehicle-control/vehicle.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-vehicle-log-list',
  standalone: false,
  templateUrl: './vehicle-log-list.component.html',
  styleUrl: './vehicle-log-list.component.scss'
})
export class VehicleLogListComponent {
  vehicleLogs:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','vehiclename','vehicleno', 'date','starttime','endtime','commencementoftrip','purposeandplace','images', 'action'];
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

  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private vehicleService:VehicleService,private helperService:HelperService,
  private stateDataService:StateDataService, private notifyBarService:NotifyBarService,
  private route:ActivatedRoute
 ){
  this.dataSource = new MatTableDataSource(this.vehicleLogs);
 }

 ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data:any) => {   
    if (data.event == 'logedit'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if (data.event == 'logadd' && data.valid && data.value) {
      this.addRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'logdelete' && data.valid && data.value){
      this.deleteRow(data.value.id);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
  });
    this.vehicleService.getVehicleLogDetailsByOrgId({}, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
      if (response && response.success) {
        this.vehicleLogs = response.data;
        this.updateTable(this.vehicleLogs);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  searchObj:any={};
  projectChange(data:any){ 
    this.searchObj.projectid= data.value ?? '';
    this.filterVehicleLogs();
   }
   compChange(data:any){
     this.searchObj.companyid= data.value ?? '';
     this.searchObj.projectid= data.projectid ?? '';
     this.filterVehicleLogs();
   }
   startTimeChange(data:any){
    this.searchObj.starttime= data.value ?? '';
    this.filterVehicleLogs();
   }
   endTimeChange(data:any){
    console.log(data);
    this.searchObj.endtime= data.value ?? '';
    this.filterVehicleLogs();
   }
   dateRangeChange(data:any){
    if(data){
      this.searchObj.startdate= data.start ?? '';
      this.searchObj.enddate= data.end ?? '';
    }
    this.filterVehicleLogs();
  } 
  vehicleChange(data:any){ 
    this.searchObj.vehicleid= data.value ?? '';
    this.filterVehicleLogs();
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
    this.searchObj.projectid= '';
    this.searchObj.companyid= '';
    this.searchObj.starttime= '';
    this.searchObj.endtime= '';
    this.searchObj.startdate= null;
    this.searchObj.enddate= null;
    this.searchObj.vehicleid= '';
    this.filterVehicleLogs();
  }
   filterVehicleLogs(){
    this.isSearchLoading=true;
    this.vehicleService.getVehicleLogDetailsByOrgId(this.searchObj, '')
      .pipe(finalize(() => {this.isLoading = false; this.isSearchLoading=false}))
      .subscribe((response: any) => {
      if (response && response.success) {
        this.vehicleLogs = response.data;
        this.updateTable(this.vehicleLogs);
      }
    });
   }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private updateTable(info: any) {
    this.vehicleLogs = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.resultsLength= this.vehicleLogs.length;   
  }
  updateRowData(data: any) {
    console.log(data);
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
      if(element) {
        element.id=data.id,
        element.projectid =data.projectid,
        element.vehicleid=data.vehicleid,
        element.employeeids=data.employeeids,
        element.useddate=data.useddate,
        element.fromtime=data.fromtime,
        element.totime=data.totime,
        element.initialreading=data.initialreading,
        element.initialimageaddress=data.initialimageaddress,
        element.endreading=data.endreading,
        element.vehiclename= data.vehiclename,
        element.vehiclenumber=data.vehiclenumber,
        element.endimageaddress=data.endimageaddress,
        element.purposeandplace=data.purposeandplace
        this.dataSource._updateChangeSubscription();
      }
  }
  addRowData(data: any) {    
    const data1:any = {
      id: data.id,
      projectid :data.projectid,
      vehicleid:data.vehicleid,
      employeeids:data.employeeids,
      useddate:data.useddate,
      fromtime:data.fromtime,
      totime:data.totime,
      initialreading:data.initialreading,
      initialimageaddress:data.initialimageaddress,
      endreading:data.endreading,
      endimageaddress:data.endimageaddress,
      purposeandplace:data.purposeandplace,
      vehiclename:data.vehiclename,
      vehiclenumber:data.vehiclenumber
    }  
    this.vehicleLogs.unshift(data1);
    this.updateTable(this.vehicleLogs); 
  }

  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  viewImages(data:any){
    this.defaultdialogoptions.data = {
         pageGuid: this.route.snapshot.data['pageGuid'],
         element:data
       };
       this.defaultdialogoptions.minWidth='55vw';
       this.dialog.open(ViewReadingImageComponent, this.defaultdialogoptions); 
  }
}

