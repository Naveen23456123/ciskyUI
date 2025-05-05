import { Component,Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OfficeInterfaceService } from '@app/shared/services/external/office-interface.service';

@Component({
  selector: 'app-delete-office-doc',
  standalone: false,
  templateUrl: './delete-office-doc.component.html',
  styleUrl: './delete-office-doc.component.scss'
})
export class DeleteOfficeDocComponent {
  public data:any;
  isLoading=true;
  isBtnClicked=false;
  
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private officeService:OfficeInterfaceService,
   @Optional() private dialogRef: MatDialogRef<DeleteOfficeDocComponent>){
    this.data= data || {};
  }
  ngOnInit(){
    this.isLoading=false;   
  }
  delete(){  
    this.officeService.deleteOfficeRentDocumentsById({id:this.data.element.vehid,documentid:this.data.element.documentid},'')
      .subscribe((response:any)=>{
        if(response && response.success){
          this.dialogRef.close({value:this.data.element, valid: true });
        }
    });
  }
}
