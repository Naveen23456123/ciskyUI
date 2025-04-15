import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditVehicleRoutingModule } from './edit-vehicle-routing.module';
import { EditVehicleComponent } from './edit-vehicle.component';


@NgModule({
  declarations: [
    EditVehicleComponent
  ],
  imports: [
    CommonModule,
    EditVehicleRoutingModule
  ]
})
export class EditVehicleModule { }
