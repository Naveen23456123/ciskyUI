import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
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
  displayedColumns: string[] = ['serial','vehiclename', 'vehiclenum', 'extraamtkmabovefix', 'fixeddetails', 'extraDetails','totaldetails', 'action'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;

  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private vehicleService:VehicleService,private helperService:HelperService,
  private stateDataService:StateDataService, private notifyBarService:NotifyBarService
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
      this.addRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'billingdelete' && data.valid && data.value){
      this.deleteRow(data.value.id);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
  });
    this.vehicleService.getVehicleBillingDetailsByOrgId({ organizationId: this.activeOrgId }, '')
           .pipe(finalize(() => this.isLoading = false))
           .subscribe((response: any) => {
             if (response && response.success) {
              this.vehicleBilings = response.data;
              this.dataSource = new MatTableDataSource(this.vehicleBilings);
             }
      });
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
      fixedkm:data.fixedkm,
      extraamountperkmafterfixedkm:data.extraamountperkmafterfixedkm,
      fixedamount:data.fixedamount,
      project:data.project,
      vehicleno:data.vehicleno,
      vehiclename:data.vehiclename,
    }      
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription(); 
  }

  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
}


