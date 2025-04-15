import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddVehicleRoutingModule } from './add-vehicle-routing.module';
import { AddVehicleComponent } from './add-vehicle.component';


@NgModule({
  declarations: [
    AddVehicleComponent
  ],
  imports: [
    CommonModule,
    AddVehicleRoutingModule
  ]
})
export class AddVehicleModule { }
