import { Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '@app/shared/services/common.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-upload-emp',
  standalone: false,
  templateUrl: './manage-upload-emp.component.html',
  styleUrl: './manage-upload-emp.component.scss'
})
export class ManageUploadEmpComponent {

  allColumnsData:any;
  maritalList:any[]=[];
  statusList:any[]=[];
  genderList:any[]=[];
  empTypeList:any[]=[];
  empRoleList:any[]=[];
  errors:any[]=[];
  isImporting:boolean=false;

  constructor(@Optional() private dialogRef: MatDialogRef<ManageUploadEmpComponent>,private employeeService:EmployeeInterfaceService, private sessionService:SessionService,
    private commonService:CommonService, private commonIntService:CommonInterfaceService
  ){

  }
  ngOnInit(){
   this.sessionService.maritalStatusSubject$.subscribe((response)=>{
      if(response)
        this.maritalList=response;
    });

    this.sessionService.statusSubject$.subscribe((response)=>{
      if(response)
        this.statusList=response;
    });
    this.sessionService.genderTypeSubject$.subscribe((response)=>{
      if(response)
        this.genderList=response;
    });
    this.sessionService.employeeTypeSubject$.subscribe((response)=>{
      if(response)
        this.empTypeList=response;
    });
    this.allColumnsData = this.employeeService.getTemplateColumnList();
    this.commonIntService.getEmployeeRoleList({},'').subscribe((response:any)=>{
       if(response && response.success)
        this.empRoleList= response.data;
    });
  }
  importing(data:any){
    this.isImporting=true;
    let empData=data.map((item:any) => ({ ...item }));
    let typeElement = empData.filter((ele:any) => {
      if(!this.empTypeList.find(x=>x.name==ele.TypeId)){          
        ele.error = true;           
        return ele;
      }
      else{
        ele.TypeId=this.empTypeList.find(x=>x.name==ele.TypeId).id;  
      }
    });
    if(typeElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Employee Type.');

    let maritalElement= empData.filter((ele:any) => {
      if(!this.maritalList.find(x=>x.name==ele.maritalStatusId)){          
        ele.error = true;           
        return ele;
      } else{
        ele.maritalStatusId=this.maritalList.find(x=>x.name==ele.maritalStatusId).id;  
      }
    });
    if(maritalElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Marital Status.');
    let genderElement= empData.filter((ele:any) => {
      if(!this.genderList.find(x=>x.name==ele.genderId)){          
        ele.error = true;           
        return ele;
      } else{
        ele.genderId=this.genderList.find(x=>x.name==ele.genderId).id;  
      }
    });
    if(genderElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Gender.');
    let statusElement= empData.filter((ele:any) => {
      if(!this.statusList.find(x=>x.name==ele.statusId)){          
        ele.error = true;           
        return ele;
      } else{
        ele.statusId=this.statusList.find(x=>x.name==ele.statusId).id;  
      }
    });
    if(statusElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Status.');
    let roleElement= empData.filter((ele:any) => {
      if(!this.empRoleList.find(x=>x.name==ele.roleid)){          
        ele.error = true;           
        return ele;
      } else{
        ele.roleid=this.empRoleList.find(x=>x.name==ele.roleid).id;  
      }
    });
    if(roleElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Role.');
    empData.filter((ele:any) => {
      ele.joiningDate=this.commonService.convertDateToISO(ele.joiningDate);  
      ele.dateOfBirth=this.commonService.convertDateToISO(ele.dateOfBirth);  
    });
    if(this.errors.length == 0){
      this.employeeService.createBulkSiteEmployees(empData, '')
        .pipe(finalize(() => { this.isImporting = false; })).subscribe({
          next:(response: any) => {             
            if (response && response.success)  {
              empData.forEach((element:any) => {
                element.id= response.data.find((x:any)=>x.code==element.Code).id;                 
              });
              this.dialogRef.close({ value: empData, valid: true });
          } else {              
            this.dialogRef.close({ value: null, valid: false });
          }
        },
        error: (err: any) => {
            this.errors = [...this.errors,err.error.error.message];
          }
      });
    }
    else
      this.isImporting=false;
}
  insertErrors(message:any){
    this.errors = [...this.errors, message];
  }
}
