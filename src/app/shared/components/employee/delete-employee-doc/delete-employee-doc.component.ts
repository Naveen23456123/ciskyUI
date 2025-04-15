import { Component,Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';

@Component({
  selector: 'app-delete-employee-doc',
  standalone: false,
  templateUrl: './delete-employee-doc.component.html',
  styleUrl: './delete-employee-doc.component.scss'
})
export class DeleteEmployeeDocComponent {
public data:any;
  isLoading=true;
  isBtnClicked=false;
  
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private employeeService:EmployeeInterfaceService,
   @Optional() private dialogRef: MatDialogRef<DeleteEmployeeDocComponent>){
    this.data= data || {};
  }
  ngOnInit(){
    this.isLoading=false;   
  }
  delete(){  
    this.employeeService.deleteEmployeeDocumentsById({id:this.data.element.vehid,documentid:this.data.element.documentid},'')
      .subscribe((response:any)=>{
        if(response && response.success){
          this.dialogRef.close({value:this.data.element, valid: true });
        }
    });
  }
}
