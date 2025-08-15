import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '@app/employee-control/employee.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { SiteControlService } from '@app/site-control/site-control.service';
import moment from 'moment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-boq-attendence-list',
  standalone: false,
  templateUrl: './boq-attendence-list.component.html',
  styleUrl: './boq-attendence-list.component.scss'
})
export class BoqAttendenceListComponent {
  boqAttendences:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','employeename','projectshortname', 'month', 'year','totaldays','action'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  isSearching=false;
  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private employeeService:EmployeeService,private helperService:HelperService,
  private stateDataService:StateDataService, private notifyBarService:NotifyBarService
 ){
  this.dataSource = new MatTableDataSource(this.boqAttendences);
 }

 ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data:any) => {   
    if (data.event == 'atdedit'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if (data.event == 'atdadd' && data.valid && data.value) {
      this.addRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'atddelete' && data.valid && data.value){
      this.deleteRow(data.value.id);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
  });
  this.employeeService.searchBoqAttendence({}, '')
           .pipe(finalize(() => this.isLoading = false))
           .subscribe((response: any) => {
             if (response && response.success) {
              this.boqAttendences = response.data;
              this.dataSource = new MatTableDataSource(this.boqAttendences);
              this.pageSize= this.helperService.getPageSize();
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
      if(element){
        element.id=data.id,
        element.employeeid=data.employeeid,
        element.monthandyear=data.monthandyear,
        element.employee=data.employee,
        element.projectname=data.projectname,
        element.projectid=data.projectid,
        element.totaldays=data.totaldays,
        element.manmonths=data.manmonths,
        this.dataSource._updateChangeSubscription();
      }
  }
  addRowData(data: any) {    
    const data1:any = {
      id:data.id,
      employeeid:data.employeeid,
      projectid:data.projectid,
      monthandyear:data.monthandyear,
      company:data.company,
      employee:data.employee,
      projectname:data.projectname,
      totaldays:data.totaldays,
      manmonths:data.manmonths
    }      
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription(); 
  }

  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  getMonthandYear(data:any){
    if(data){
      return {month:moment(data).format('MMMM'),year :moment(data).format('YYYY')};
    }
    return {month:'-',year:'-'};
  } 
  searchObj:any={};
  projectChange(data:any){ 
    this.searchObj.projectid= data.value ?? '';
    this.filterAttendences();
   }
   monthYearChange(data:any){
    this.searchObj.monthandyear= data.value ?? '';
    this.filterAttendences();
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
    this.searchObj.projectid='';
    this.searchObj.monthandyear=null;
    this.filterAttendences();
  }
   filterAttendences(){
    this.isSearching=true;
    this.employeeService.searchBoqAttendence(this.searchObj, '')
    .pipe(finalize(() => this.isSearching = false))
    .subscribe((response: any) => {
      if (response && response.success) {
       this.boqAttendences = response.data;
       this.dataSource = new MatTableDataSource(this.boqAttendences);
       this.pageSize= this.helperService.getPageSize();
      }
});
   }
}

