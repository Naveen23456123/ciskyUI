import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '@app/shared/services/common.service';
import { BankGuaranteeInterfaceService } from '@app/shared/services/external/bank-guarantee-interface.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { InsuranceInterfaceService } from '@app/shared/services/external/insurance-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-bank-guarantee-upload',
  standalone: false,
  templateUrl: './manage-bank-guarantee-upload.component.html',
  styleUrl: './manage-bank-guarantee-upload.component.scss'
})
export class ManageBankGuaranteeUploadComponent {
data: any;
  allColumnsData:any; 
  errors:any[]=[];
  isImporting:boolean=false;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,@Optional() private dialogRef: MatDialogRef<ManageBankGuaranteeUploadComponent>,
  private bankGuaranteeService:BankGuaranteeInterfaceService, private sessionService:SessionService,
    private commonService:CommonService, private subCompanyService:SubCompanyInterfaceService
  ){
    this.data = data || {};
  }
  ngOnInit(){    
    this.allColumnsData = this.bankGuaranteeService.getTemplateColumnList();   
  }
  importing(data:any){
    this.isImporting=true;
    let bgData=data.map((item:any) => ({ ...item }));
   
    let projectElement= bgData.filter((ele:any) => {
     if(ele.project==''){          
        ele.error = true;           
        return ele;
      } 
    });
    if(projectElement.length > 0)
      this.insertErrors('Kindly provide the value for Project Code.');
    
    let bgDateElement= bgData.filter((ele:any) => {          
      if(ele.guaranteedate==''){          
        ele.error = true;           
        return ele;
      } 
    });
    if(bgDateElement.length > 0)
      this.insertErrors('Kindly provide the value for Guarantee Date.');
    let expDateElement= bgData.filter((ele:any) => {          
      if(ele.guaranteeexpirydate==''){          
        ele.error = true;           
        return ele;
      } 
    });
    if(expDateElement.length > 0)
      this.insertErrors('Kindly provide the value for Guarantee Expiry Date.');
    let releaseDateElement= bgData.filter((ele:any) => {          
      if(ele.releasedate==''){          
        ele.error = true;           
        return ele;
      } 
    });
    if(releaseDateElement.length > 0)
      this.insertErrors('Kindly provide the value for Release Date.');

    bgData.filter((ele:any) => {
      ele.guaranteedate=this.commonService.convertDateToISO(ele.guaranteedate);  
      ele.guaranteeexpirydate=this.commonService.convertDateToISO(ele.guaranteeexpirydate); 
      ele.releasedate=this.commonService.convertDateToISO(ele.releasedate);  
     
    });
    if(this.errors.length == 0){
      this.bankGuaranteeService.createBulkBankGuarantee(bgData, '')
        .pipe(finalize(() => { this.isImporting = false; })).subscribe({
          next:(response: any) => {             
            if (response && response.success)  {
              bgData.forEach((element:any) => {
                element.id= response.data.find((x:any)=>x.projectcode==element.projectCode)?.id;                 
              });
              this.dialogRef.close({ value: bgData, valid: true });
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
