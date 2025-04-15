import { Component,Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehicleInterfaceService } from '@app/shared/services/external/vehicle-interface.service';

@Component({
  selector: 'app-delete-vehicle-doc',
  standalone: false,
  templateUrl: './delete-vehicle-doc.component.html',
  styleUrl: './delete-vehicle-doc.component.scss'
})
export class DeleteVehicleDocComponent {
  public data:any;
  isLoading=true;
  isBtnClicked=false;
  
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private vehicleService:VehicleInterfaceService,
   @Optional() private dialogRef: MatDialogRef<DeleteVehicleDocComponent>){
    this.data= data || {};
  }
  ngOnInit(){
    this.isLoading=false;   
  }
  delete(){  
    this.vehicleService.deleteVehicleDocumentsById({id:this.data.element.vehid,documentid:this.data.element.documentid},'')
      .subscribe((response:any)=>{
        if(response && response.success){
          this.dialogRef.close({value:this.data.element, valid: true });
        }
    });
  }
}
