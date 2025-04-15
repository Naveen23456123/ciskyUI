import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddVehicleLogRoutingModule } from './add-vehicle-log-routing.module';
import { AddVehicleLogComponent } from './add-vehicle-log.component';


@NgModule({
  declarations: [
    AddVehicleLogComponent
  ],
  imports: [
    CommonModule,
    AddVehicleLogRoutingModule
  ]
})
export class AddVehicleLogModule { }
