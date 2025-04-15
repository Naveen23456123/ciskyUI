import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewEmployeeListComponent } from '@app/shared/components/employee/view-employee-list/view-employee-list.component';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { SiteControlService } from '@app/site-control/site-control.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-designation-list',
  standalone: false,
  templateUrl: './designation-list.component.html',
  styleUrl: './designation-list.component.scss'
})
export class DesignationListComponent {
  designations:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','name', 'employeecount', 'companyname','employees','action'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;

  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '1200px', 
    minHeight:'80vh', 
    disableClose: false,
    data: {},
  };

 constructor(private siteControlService:SiteControlService,private helperService:HelperService,
  private stateDataService: StateDataService, private notifyBarService:NotifyBarService
 ){
  this.dataSource = new MatTableDataSource(this.designations);
 }

 ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data) => {   
    if (data.event == 'desgedit'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if (data.event == 'desgadd' && data.valid && data.value) {
      this.addRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'desgdelete' && data.valid && data.value){
      this.deleteRow(data.value.id);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
  });
  this.pageSize=this.helperService.getPageSize();
    this.siteControlService.getDesignationListByOrgId({ organizationId: this.activeOrgId }, '')
           .pipe(finalize(() => this.isLoading = false))
           .subscribe((response: any) => {
            if (response && response.success) {
              this.designations = response.data;
              this.dataSource = new MatTableDataSource(this.designations);
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

  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element){
    element.id = data.id;
    element.name = data.name;
    element.companyid = data.companyId;
    element.companyname=data.companyname;
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(newdata: any) {
    const data1:any = {
      id:newdata.id,
      name : newdata.name,
      companyid : newdata.companyId,
      companyname:newdata.companyname,
      empcount:0
    }      
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription();
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  viewEmp(data:any){
      const config = this.defaultdialogoptions;
  
      config.data = {
        element:data,
        type:'desg'
      };
      const dialogRef = this.dialog.open(ViewEmployeeListComponent, config);
      dialogRef.afterClosed().subscribe((data) => {
        if (data && data.valid) {
        }
        else {
        }
      });
    }
}

