import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '@app/shared/services/common.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-manage-upload-supervision',
  standalone: false,
  templateUrl: './manage-upload-supervision.component.html',
  styleUrl: './manage-upload-supervision.component.scss'
})
export class ManageUploadSupervisionComponent {
  data: any;
  allColumnsData:any;
  ourRoles:any[]=[];
  contractorModes:any[]=[];
  companies:any[]=[];
  errors:any[]=[];
  isImporting:boolean=false;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,@Optional() private dialogRef: MatDialogRef<ManageUploadSupervisionComponent>,private projectService:ProjectInterfaceService, private sessionService:SessionService,
    private commonService:CommonService, private subCompanyService:SubCompanyInterfaceService
  ){
    this.data = data || {};
  }
  ngOnInit(){
    this.sessionService.ourRoleSubject$.subscribe((response)=>{
      if(response)
        this.ourRoles=response;
    });
    this.sessionService.contractModeSubject$.subscribe((response)=>{
      if(response)
        this.contractorModes=response;
    });
    this.allColumnsData = this.projectService.getTemplateColumnList();
    this.allColumnsData.push({ label: 'O&M_Duration', value: 'oandmduration' });
    this.allColumnsData.push({ label: 'Construction_Duration', value: 'constructionduration' });
    this.subCompanyService.getSubCompanyListByOrgId({},'').subscribe((response:any)=>{
      if(response && response.success ){
        this.companies= response.data;
      }
    })
  }
  importing(data:any){
    this.isImporting=true;
    let consultantData=data.map((item:any) => ({ 
      ...item,
      sectorid:this.data.parentPageGuid,
      subsectorid:this.data.pageGuid
     }));
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
   
    let projectLengthElement= consultantData.filter((ele:any) => {
      const total = (Number(ele.oandmduration) || 0) + (Number(ele.constructionduration) || 0);         
      if(total<=0){          
        ele.error = true;           
        return ele;
      } 
    });
    if(projectLengthElement.length > 0)
      this.insertErrors('Kindly provide the value for O&M or Construction Duration');

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
      
      if(isNaN(Number(ele.consultancyFees))){          
        ele.error = true;           
        return ele;
      }
      ele.consultancyFees=Number(ele.consultancyFees);
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
