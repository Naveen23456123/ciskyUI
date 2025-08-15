import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '@app/shared/services/common.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { InsuranceInterfaceService } from '@app/shared/services/external/insurance-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-insurance-upload',
  standalone: false,
  templateUrl: './manage-insurance-upload.component.html',
  styleUrl: './manage-insurance-upload.component.scss'
})
export class ManageInsuranceUploadComponent {
 data: any;
  allColumnsData:any; 
  errors:any[]=[];
  isImporting:boolean=false;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,@Optional() private dialogRef: MatDialogRef<ManageInsuranceUploadComponent>,private insuranceService:InsuranceInterfaceService, private sessionService:SessionService,
    private commonService:CommonService, private subCompanyService:SubCompanyInterfaceService
  ){
    this.data = data || {};
  }
  ngOnInit(){    
    this.allColumnsData = this.insuranceService.getTemplateColumnList();   
  }
  importing(data:any){
    this.isImporting=true;
    let insData=data.map((item:any) => ({ ...item}));
   
    let projectElement= insData.filter((ele:any) => {          
      if(ele.project==''){          
        ele.error = true;           
        return ele;
      } 
    });
    if(projectElement.length > 0)
      this.insertErrors('Kindly provide the value for Project Code.');
    let startDateElement= insData.filter((ele:any) => {          
      if(ele.startdate==''){          
        ele.error = true;           
        return ele;
      } 
    });
    if(startDateElement.length > 0)
      this.insertErrors('Kindly provide the value for Start Date.');
    let endDateElement= insData.filter((ele:any) => {          
      if(ele.enddate==''){          
        ele.error = true;           
        return ele;
      } 
    });
    if(endDateElement.length > 0)
      this.insertErrors('Kindly provide the value for End Date.');

    insData.filter((ele:any) => {
     ele.startdate=this.commonService.convertDateToISO(ele.startdate);  
      ele.enddate=this.commonService.convertDateToISO(ele.enddate); 
    });
    if(this.errors.length == 0){
      this.insuranceService.createBulkInsurance(insData, '')
        .pipe(finalize(() => { this.isImporting = false; })).subscribe({
          next:(response: any) => {             
            if (response && response.success)  {
              insData.forEach((element:any) => {
                element.id= response.data.find((x:any)=>x.projectcode==element.projectCode)?.id;                 
              });
              this.dialogRef.close({ value: insData, valid: true });
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
