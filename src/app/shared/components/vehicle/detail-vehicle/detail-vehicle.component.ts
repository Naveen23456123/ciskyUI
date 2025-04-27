import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleInterfaceService } from '@app/shared/services/external/vehicle-interface.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-detail-vehicle',
  standalone: false,
  templateUrl: './detail-vehicle.component.html',
  styleUrl: './detail-vehicle.component.scss'
})
export class DetailVehicleComponent {
  vehicleDetails:any;
  private dialogData:any;
  isLoading=true;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,private vehicleService:VehicleInterfaceService){
    this.dialogData= data || {};
  }
  ngOnInit(){
    if(this.dialogData){
      this.vehicleService.getVehicleDetailsById({id:this.dialogData.element.id},'').pipe(finalize(() => this.isLoading = false))
      .subscribe((response:any)=>{
        if(response && response.success){
          this.vehicleDetails= response.data;
        }
      })
    }
  }
}
