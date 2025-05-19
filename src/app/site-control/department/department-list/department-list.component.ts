import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UploadFileComponent } from '@app/shared/components/upload-file/upload-file.component';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { SiteControlService } from '@app/site-control/site-control.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-department-list',
  standalone: false,
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss'
})
export class DepartmentListComponent {
  departments:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','name', 'subcompanyname', 'action'];
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
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private siteControlService:SiteControlService,private helperService:HelperService,
  private stateDataService:StateDataService, private notifyBarService:NotifyBarService
 ){
  this.dataSource = new MatTableDataSource(this.departments);
 }

 ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data:any) => {   
    if (data.event == 'deptedit'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if (data.event == 'deptadd' && data.valid && data.value) {
      this.addRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'deptdelete' && data.valid && data.value){
      this.deleteRow(data.value.id);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'updeptadd' && data.valid && data.value){
      this.addBulk(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
  });
  this.siteControlService.getDepartmentListByOrgId({}, '')
    .pipe(finalize(() => this.isLoading = false))
    .subscribe((response: any) => {
      if (response && response.success) {
        this.updateTable(response.data);
        this.dataSource = new MatTableDataSource(this.departments);
      }
    });
  }

  private updateTable(info: any) {
    this.departments = info;
    this.dataSource = new MatTableDataSource(this.departments);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.resultsLength= this.departments.length;   
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.pageSize= this.helperService.getPageSize();
  }

  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element){
    element.id = data.id;
    element.name = data.name;
    element.companyid = data.companyid;
    element.companyname = data.companyname;
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(newdata: any) {
    const data1:any = {
      id:newdata.id,
      name : newdata.name,
      companyid : newdata.companyid,
      companyname:newdata.companyname
    }      
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription();
  }
  addBulk(data:any){
    data.forEach((dept:any) => {
      this.addRowData(dept);
    });
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  filterChange(data:any){
    if(data && data.value){ 
      this.dataSource.filter = data.value.trim().toLowerCase()
    }
    else{
      this.dataSource.filter = '';
    }
  }
}
