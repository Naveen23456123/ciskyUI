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
  selector: 'app-sub-company-list',
  standalone: false,
  templateUrl: './sub-company-list.component.html',
  styleUrl: './sub-company-list.component.scss'
})
export class SubCompanyListComponent {
  subCompanies:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','name', 'employeecount', 'viewemp','action'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
 @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!:number;

  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '1200px',
    disableClose: false,
    data: {},
  };

 constructor(private siteControlService:SiteControlService,private helperService:HelperService,
  private notifyBarService :NotifyBarService, private stateDataService:StateDataService
 ){
  this.dataSource = new MatTableDataSource(this.subCompanies);
 }

 ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data) => {   
    if (data.event == 'subcomedit'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if (data.event == 'subcomadd' && data.valid && data.value) {
      this.addRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'subcomdelete' && data.valid && data.value){
      this.deleteRow(data.value.id);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
  });
    this.siteControlService.getSubCompanyListByOrgId({ organizationId: this.activeOrgId }, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
        if (response && response.success) {
          this.subCompanies = response.data;
          this.updateTable(this.subCompanies);
        }
    });
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
    this.subCompanies = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.resultsLength= this.subCompanies.length;   
  }

  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element){
    element.id = data.id;
    element.name = data.name;
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(newdata: any) {
    const data1:any = {
      id:newdata.id,
      name : newdata.name,
      employeecount:0
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
      type:'comp'
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
