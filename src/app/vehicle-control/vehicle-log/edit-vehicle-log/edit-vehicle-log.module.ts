import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditVehicleLogRoutingModule } from './edit-vehicle-log-routing.module';
import { EditVehicleLogComponent } from './edit-vehicle-log.component';


@NgModule({
  declarations: [
    EditVehicleLogComponent
  ],
  imports: [
    CommonModule,
    EditVehicleLogRoutingModule
  ]
})
export class EditVehicleLogModule { }
