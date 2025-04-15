import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteVehicleRoutingModule } from './delete-vehicle-routing.module';
import { DeleteVehicleComponent } from './delete-vehicle.component';


@NgModule({
  declarations: [
    DeleteVehicleComponent
  ],
  imports: [
    CommonModule,
    DeleteVehicleRoutingModule
  ]
})
export class DeleteVehicleModule { }
