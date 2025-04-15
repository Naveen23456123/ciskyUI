import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HelperService } from '@app/shared/services/helper.service';
import { VehicleService } from '@app/vehicle-control/vehicle.service';
import { finalize, Subscription } from 'rxjs';
import { ManageVehicleComponent } from '../manage-vehcile/manage-vehcile.component';
import { ActivatedRoute } from '@angular/router';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { DialogOperation } from '@app/shared/models/constant.config';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { untilDestroyed } from '@app/core/until-destroyed';
import { ManageVehicleDocComponent } from '../manage-vehicle-doc/manage-vehicle-doc.component';

@Component({
  selector: 'app-manage-vehicle-list',
  standalone: false,
  templateUrl: './manage-vehicle-list.component.html',
  styleUrl: './manage-vehicle-list.component.scss'
})
export class ManageVehicleListComponent {
vehicles:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','projectshortname','name', 'vehiclenum', 'fixedkm', 'fixedbillamt', 'extraamtabovefixkm','log','docs', 'action'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  private subscription: Subscription = new Subscription();
  isProject=false;
  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    disableClose: false,
    data: {},
  };

 constructor(private vehicleService:VehicleService,private helperService:HelperService,
  private route: ActivatedRoute,private notifyBarService:NotifyBarService,
  private sessionService:SessionService
 ){
  this.dataSource = new MatTableDataSource(this.vehicles);
 }

 ngOnInit()  {
    this.subscription = this.sessionService.projectEntitySubject$.pipe(untilDestroyed(this)).subscribe((response)=>{     
      if(response && response.projectId){
        this.vehicleService.getVehileDetailsByOrgId({ projectId: response.projectId }, '')
          .pipe(finalize(() => this.isLoading = false))
          .subscribe((response: any) => {
            if (response && response.success) {
              this.vehicles = response.data;
              this.dataSource = new MatTableDataSource(this.vehicles);
              this.pageSize= this.helperService.getPageSize();
            }
        });
        this.isProject=true;
      }
      else {
        this.vehicleService.getVehileDetailsByOrgId({  }, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((response: any) => {
          if (response && response.success) {
            this.vehicles = response.data;
            this.dataSource = new MatTableDataSource(this.vehicles);
            this.pageSize= this.helperService.getPageSize();
          }
        });
      }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  ngAfterViewInit() {
    if(this.isProject){
      this.displayedColumns=this.displayedColumns.filter(fruit => fruit !== "projectshortname")
    }
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

  add_vehicle(){
  const config = this.defaultdialogoptions;
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: DialogOperation.ADD
      };
      config.minWidth='65vw';
      const dialogRef = this.dialog.open(ManageVehicleComponent, config);
      dialogRef.afterClosed().subscribe((data) => {
        if (data && data.valid) {       
          this.notifyBarService.showsnackbar('The vehicle created successfully.');
          this.addRowData(data.value);
        }
        else {
        }
      });
  }

  edit_vehicle(row:any){
    this.defaultdialogoptions.data = {
         pageGuid: this.route.snapshot.data['pageGuid'],
         type: DialogOperation.EDIT,
         element: row
       };
       this.defaultdialogoptions.minWidth='65vw';
       const dialogRef = this.dialog.open(ManageVehicleComponent, this.defaultdialogoptions);
       dialogRef.afterClosed().subscribe((data) => {       
         if (data.valid) {
          this.notifyBarService.showsnackbar('The vehicle updated successfully.');
          this.updateRowData(data.value);
         }
         else {
         }
       });
  }
  delete_vehicle(row:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.DELETE,
      element: row
    };
    this.defaultdialogoptions.minWidth='45vw';
    const dialogRef = this.dialog.open(ManageVehicleComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        this.notifyBarService.showsnackbar('The vehicle removed successfully.');
        this.deleteRow(data.value);
      }
      else {
      }
    });
  }
  import(){
     const config = this.defaultdialogoptions;
        config.minWidth='1200px';
        config.data = {
          pageGuid: this.route.snapshot.data['pageGuid'],
          type: this.route.snapshot.data['type'], 
          template_type: TemplateType.VEHICLE   
        };
      this.dialog.open(UploadFileComponent,config);
  }
  export(){

  }
  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element){
    element.projectid = data.projectid;
    element.project = data.project;
    element.number = data.number;
    element.name= data.name;
    element.fixedkm = data.fixedkm;
    element.kmperliter = data.kmperliter;
    element.fuelprice = data.fuelprice;
    element.fixedbillamount= data.fixedbillamount;
    element.extraamountafterfixedkm = data.extraamountafterfixedkm;
    element.bankname = data.bankname;
    element.accountholdername = data.accountholdername;
    element.accountnumber= data.accountnumber;
    element.mobilenumber = data.mobilenumber;
    element.ifsccode = data.ifsccode;
    element.pancard = data.pancard;
    element.gstnumber= data.gstnumber;
    element.address = data.address;
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(data: any) {
    const data1:any = {
      id:data.id,
      projectid : data.projectid,
      project : data.project,
      number : data.number,
      name: data.name,
      fixedkm : data.fixedkm,
      kmperliter : data.kmperliter,
      fuelprice : data.fuelprice,
      fixedbillamount: data.fixedbillamount,
      extraamountafterfixedkm : data.extraamountafterfixedkm,
      bankname : data.bankname,
      accountholdername : data.accountholdername,
      accountnumber: data.accountnumber,
      mobilenumber : data.mobilenumber,
      ifsccode : data.ifsccode,
      pancard : data.pancard,
      gstnumber: data.gstnumber,
      address : data.address,
    }      
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription();
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data.id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  viewdocs(data:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],      
      element:{id:data}
    };
    this.defaultdialogoptions.minWidth='75vw';
    const dialogRef = this.dialog.open(ManageVehicleDocComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
       
      }
      else {
      }
    });
  }
}

