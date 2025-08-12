import { Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '@app/shared/services/common.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-manage-upload-dpr',
  standalone: false,
  templateUrl: './manage-upload-dpr.component.html',
  styleUrl: './manage-upload-dpr.component.scss'
})
export class ManageUploadDprComponent {

  allColumnsData:any;
  workTypes:any[]=[];
  ourRoles:any[]=[];
  contractorModes:any[]=[];
  companies:any[]=[];
  errors:any[]=[];
  isImporting:boolean=false;

  constructor(@Optional() private dialogRef: MatDialogRef<ManageUploadDprComponent>,private projectService:ProjectInterfaceService, private sessionService:SessionService,
    private commonService:CommonService, private subCompanyService:SubCompanyInterfaceService
  ){

  }
  ngOnInit(){
   this.sessionService.projectWorkTypeSubject$.subscribe((response)=>{
      if(response)
        this.workTypes=response;
    });

    this.sessionService.ourRoleSubject$.subscribe((response)=>{
      if(response)
        this.ourRoles=response;
    });
    this.sessionService.contractModeSubject$.subscribe((response)=>{
      if(response)
        this.contractorModes=response;
    });
    this.allColumnsData = this.projectService.getTemplateColumnList();
    this.subCompanyService.getSubCompanyListByOrgId({},'').subscribe((response:any)=>{
      if(response && response.success ){
        this.companies= response.data;
      }
    })
  }
  importing(data:any){
    this.isImporting=true;
    let consultantData=data.map((item:any) => ({ ...item }));
    let companyElement= consultantData.filter((ele:any) => {
      if(!this.companies.find(x=>x.name==ele.companyId)){          
        ele.error = true;           
        return ele;
      } else{
        ele.companyId=this.companies.find(x=>x.name==ele.companyId).id;  
      }
    });
    if(companyElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Sub Company.');
    let workTypesElement= consultantData.filter((ele:any) => {
      if(!this.workTypes.find(x=>x.name==ele.workTypeId)){          
        ele.error = true;           
        return ele;
      } else{
        ele.workTypeId=this.workTypes.find(x=>x.name==ele.workTypeId).id;  
      }
    });
    if(workTypesElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Work Type.');
    let ourRolesElement= consultantData.filter((ele:any) => {
      if(!this.ourRoles.find(x=>x.name==ele.ourRoleId)){          
        ele.error = true;           
        return ele;
      } else{
        ele.ourRoleId=this.ourRoles.find(x=>x.name==ele.ourRoleId).id;  
      }
    });
    if(ourRolesElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Role.');
    let contractorModesElement= consultantData.filter((ele:any) => {
      if(!this.contractorModes.find(x=>x.name==ele.contractmodeid)){          
        ele.error = true;           
        return ele;
      } else{
        ele.contractmodeid=this.contractorModes.find(x=>x.name==ele.contractmodeid).id;  
      }
    });
    if(contractorModesElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Contract Mode.');
    let consultancyFeesElement= consultantData.filter((ele:any) => {
      console.log(isNaN(Number(ele.consultancyFees)));
      if(isNaN(Number(ele.consultancyFees))){          
        ele.error = true;           
        return ele;
      }
    });
    if(consultancyFeesElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Consultancy Fees.');
    consultantData.filter((ele:any) => {
      ele.bidduedate=this.commonService.convertDateToISO(ele.bidDueDate);  
      ele.loadate=this.commonService.convertDateToISO(ele.loaDate);  
      ele.agreementdate=this.commonService.convertDateToISO(ele.agreementDate);  
      ele.commencementdate=this.commonService.convertDateToISO(ele.commencementDate);  
      ele.scheduleconstructioncompletedate=this.commonService.convertDateToISO(ele.scheduleConstructionCompleteDate);
    });
    if(this.errors.length == 0){
      this.projectService.createBulkConsultants(consultantData, '')
        .pipe(finalize(() => { this.isImporting = false; })).subscribe({
          next:(response: any) => {             
            if (response && response.success)  {
              consultantData.forEach((element:any) => {
                element.id= response.data.find((x:any)=>x.projectcode==element.projectCode)?.id;                 
              });
              this.dialogRef.close({ value: consultantData, valid: true });
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
