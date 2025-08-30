import { Component,Input,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HelperService } from '@app/shared/services/helper.service';
import { finalize, take } from 'rxjs';
import { ManageEmployeeComponent } from '../manage-employee/manage-employee.component';
import { ActivatedRoute } from '@angular/router';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { DialogOperation } from '@app/shared/models/constant.config';
import { ViewEmployeeDetailsComponent } from '../view-employee-details/view-employee-details.component';
import { ManageEmployeeDocComponent } from '../manage-employee-doc/manage-employee-doc.component';
import { SessionService } from '@app/shared/services/session.service';
import { untilDestroyed } from '@app/core/until-destroyed';
import { UploadDataComponent } from '../../upload-data/upload-data.component';
import { ManageUploadEmpComponent } from '../manage-upload-emp/manage-upload-emp.component';
import { GenerateCsvService } from '@app/shared/services/generate-csv.service';

@Component({
  selector: 'app-manage-employee-list',
  standalone: false,
  templateUrl: './manage-employee-list.component.html',
  styleUrl: './manage-employee-list.component.scss'
})
export class ManageEmployeeListComponent {
  @Input() showFilters=true;
 employees:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','name','code', 'designation', 'emailid','phonenumber','doc','action'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!:number;
  readonly dialog = inject(MatDialog);
  isSearching=false;
  private defaultdialogoptions:  MatDialogConfig = {    
    disableClose: false,
    data: {},
  };

 constructor(private employeeService:EmployeeInterfaceService,private helperService:HelperService,
  private sessionService:SessionService,
  private route: ActivatedRoute, private stateDataService:StateDataService, private notifyBarService:NotifyBarService,
  private csvService:GenerateCsvService
 ){
  this.dataSource = new MatTableDataSource(this.employees);
 }

 ngOnInit()  {
    this.sessionService.projectEntitySubject$.pipe(take(1),untilDestroyed(this))
      .subscribe((entityData)=>{  
        if(entityData){    
          this.employeeService.getAllEmployeesByOrdId({ projectid:entityData.projectId }, '')
          .pipe(finalize(() => this.isLoading = false))
          .subscribe({next : (response: any) => {
           if (response && response.success) {
              this.updateTable(response.data); 
            }
          }}); 
        }
        else {
          this.employeeService.getAllEmployeesByOrdId({ }, '')
          .pipe(finalize(() => this.isLoading = false))
          .subscribe({next : (response: any) => {
           if (response && response.success) {
              this.updateTable(response.data);           
            }
          }});
        }
    });  
  }
  private updateTable(info: any) {
    this.employees = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.resultsLength= this.employees.length;   
  }

  ngAfterViewInit() {
    this.pageSize= this.helperService.getPageSize();
  }

  ngOnDestroy(){}

  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element){
    element.id = data.id;
    element.code = data.Code;
    element.companyid = data.CompanyId;
    element.name= data.name;
    element.emailid = data.emailId;
    element.phonenumber = data.PhoneNumber;
    element.typeid = data.TypeId;
    element.designationid= data.designationId;
    element.roleid = data.RoleId;
    element.statusid = data.statusId;
    element.joiningdate = data.joiningDate;
    element.dateofbirth= data.dateOfBirth;
    element.genderid = data.genderId;
    element.qualification = data.qualification;
    element.maritalstatusid = data.maritalStatusId;
    element.emergencypersonname= data.emergencyPersonName;
    element.emergencycontactnumber = data.EmergencyContactNumber;
    element.relation = data.relation;
    element.accountnumber = data.AccountNumber;
    element.ifsccode= data.ifscCode;
    element.bankname = data.bankName;
    element.bankaddress = data.bankAddress;
    element.aadharnumber = data.AadharNumber;
    element.uannumber= data.UanNumber;
    element.pannumber = data.PanNumber;
    element.currentaddress = data.currentAddress;
    element.emergencyaddress= data.emergencyAddress;
    element.designation= data.designation;
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(newdata: any) {
    const data1:any = {
      id:newdata.id,
    code : newdata.Code,
    companyid : newdata.CompanyId,
    name: newdata.name,
    emailid : newdata.emailId,
    phonenumber : newdata.PhoneNumber,
    typeid : newdata.TypeId,
    designationid: newdata.designationId,
    roleid : newdata.RoleId,
    statusid : newdata.statusId,
    joiningdate : newdata.joiningDate,
    dateofbirth: newdata.dateOfBirth,
    genderid : newdata.genderId,
    qualification : newdata.qualification,
    maritalstatusid : newdata.maritalStatusId,
    emergencypersonname: newdata.emergencyPersonName,
    emergencycontactnumber : newdata.EmergencyContactNumber,
    relation : newdata.relation,
    accountnumber : newdata.AccountNumber,
    ifsccode: newdata.ifscCode,
    bankname : newdata.bankName,
    bankaddress : newdata.bankAddress,
    aadharnumber : newdata.AadharNumber,
    uannumber: newdata.UanNumber,
    pannumber : newdata.PanNumber,
    currentaddress : newdata.currentAddress,
    emergencyaddress: newdata.emergencyAddress,
    designation:newdata.designation
    }   
    this.employees.unshift(data1);
    this.updateTable(this.employees); 
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data.id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  add_emp(){
  const config = this.defaultdialogoptions;
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: DialogOperation.ADD
      };
      config.minWidth='75vw';
      const dialogRef = this.dialog.open(ManageEmployeeComponent, config);
      dialogRef.afterClosed().subscribe((data) => {
        if (data && data.valid) {       
          this.notifyBarService.showsnackbar('The Employee created successfully.');
          this.addRowData(data.value);
        }
        else {
        }
      });
  }

  edit_emp(row:any){
    this.defaultdialogoptions.data = {
         pageGuid: this.route.snapshot.data['pageGuid'],
         type: DialogOperation.EDIT,
         element: row
       };
       this.defaultdialogoptions.minWidth='75vw';
       const dialogRef = this.dialog.open(ManageEmployeeComponent, this.defaultdialogoptions);
       dialogRef.afterClosed().subscribe((data) => {       
         if (data && data.valid) {
          this.notifyBarService.showsnackbar('The Employee updated successfully.');
          this.updateRowData(data.value);
         }
         else {
         }
       });
  }
  delete_emp(row:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.DELETE,
      element: row
    };
    this.defaultdialogoptions.minWidth='45vw';
    const dialogRef = this.dialog.open(ManageEmployeeComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        this.notifyBarService.showsnackbar('The Employee removed successfully.');
        this.deleteRow(data.value);
      }
      else {
      }
    });
  }

  import(){
    const config = this.defaultdialogoptions;
    config.minWidth='80vw';
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: this.route.snapshot.data['type'], 
        template_type: TemplateType.EMPLOYEE   
    };
    const dialogRef = this.dialog.open(ManageUploadEmpComponent,config);
    dialogRef.afterClosed().subscribe((data) => { 
      if (data && data.valid) {
        this.addBulkEmployee(data.value);
        this.notifyBarService.showsnackbar('The Employee(s) created successfully.');
      }
    });
  }
  addBulkEmployee(data:any){
    data.forEach((element:any) => {
      this.addRowData(element);
    });
  }
  
  export(){
    if(this.employees && this.employees.length>0)
      this.csvService.downloadFile(this.employees,this.employeeService.getCSVTemplateColumnList(),'Employees');
  }
  view_emp(data:any){
    this.defaultdialogoptions.data = {
         pageGuid: this.route.snapshot.data['pageGuid'],
         element:{id:data}
       };
       this.defaultdialogoptions.minWidth='75vw';
       this.dialog.open(ViewEmployeeDetailsComponent, this.defaultdialogoptions);     
  }
  viewdoc(data:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],      
      element:{id:data}
    };
    this.defaultdialogoptions.minWidth='75vw';
    const dialogRef = this.dialog.open(ManageEmployeeDocComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
       
      }
      else {
      }
    });    
  }
  searchObj:any={
    projectid:'',
    desgid:'',
    compid:'',
    typeid:''
  };
  projectChange(data:any){ 
   this.searchObj.projectid= data.value ?? '';
   this.filterEmployee();
  }
  desgChange(data:any){
    this.searchObj.desgid= data.value ?? '';
    this.filterEmployee();
  }
  compChange(data:any){
    this.searchObj.compid= data.value ?? '';
    this.searchObj.projectid= data.projectid ?? '';
    this.searchObj.desgid= data.desgid ?? '';
    this.filterEmployee();
  }
  anyChange(data:any){
    if(data && data.value){ 
      this.dataSource.filter = data.value.trim().toLowerCase()
    }
    else{
      this.dataSource.filter = '';
    }
  }
  professionalChange(data:any){
    this.searchObj.typeid= data.value ?? '';
    this.filterEmployee();
  }
  clear(){
    this.searchObj.projectid='';
    this.searchObj.desgid='';
    this.searchObj.compid='';
    this.searchObj.typeid='';
    this.filterEmployee();
  }
  filterEmployee(){
  this.isSearching=true;
    this.employeeService.searchEmployee(this.searchObj, '')
      .pipe(finalize(() => {this.isLoading = false;this.isSearching=false}))
      .subscribe({next : (response: any) => {
        if (response && response.success) {
          this.employees = response.data;
          this.dataSource = new MatTableDataSource(this.employees);
          this.pageSize= this.helperService.getPageSize();
          this.updateTable(response.data);        
        }
    }});
  }
}


