import { Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '@app/shared/services/common.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { InventoryInterfaceService } from '@app/shared/services/external/inventory-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-upload-inventory',
  standalone: false,
  templateUrl: './manage-upload-inventory.component.html',
  styleUrl: './manage-upload-inventory.component.scss'
})
export class ManageUploadInventoryComponent {

  allColumnsData:any;
  maritalList:any[]=[];
  statusList:any[]=[];
  genderList:any[]=[];
  empTypeList:any[]=[];
  empRoleList:any[]=[];
  errors:any[]=[];
  isImporting:boolean=false;

  constructor(@Optional() private dialogRef: MatDialogRef<ManageUploadInventoryComponent>,private inventoryService:InventoryInterfaceService, private sessionService:SessionService,
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
    this.allColumnsData = this.inventoryService.getTemplateColumnList();
  }
  importing(data:any){
    this.isImporting=true;
    let inventoryData=data.map((item:any) => ({ ...item }));
    let costElement = inventoryData.filter((ele:any) => {
      if(!this.commonService.isValidNumber(ele.costperitem)){          
        ele.error = true;           
        return ele;
      }
    });
    if(costElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Item cost.');

    let quantityElement= inventoryData.filter((ele:any) => {
      if(!this.commonService.isValidNumber(ele.quantity)){        
        ele.error = true;           
        return ele;
      } 
    });
    if(quantityElement.length > 0)
      this.insertErrors('Kindly provide the correct value for quantity.');
   
    inventoryData.filter((ele:any) => {
      ele.purchasedate=this.commonService.convertDateToISO(ele.purchasedate);
    });
    if(this.errors.length == 0){
      this.inventoryService.createBulkInventory(inventoryData, '')
        .pipe(finalize(() => { this.isImporting = false; })).subscribe({
          next:(response: any) => {             
            if (response && response.success)  {             
              this.dialogRef.close({ value: response.data, valid: true });
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

