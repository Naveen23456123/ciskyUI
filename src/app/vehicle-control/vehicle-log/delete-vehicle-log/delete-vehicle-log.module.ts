import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteVehicleLogRoutingModule } from './delete-vehicle-log-routing.module';
import { DeleteVehicleLogComponent } from './delete-vehicle-log.component';


@NgModule({
  declarations: [
    DeleteVehicleLogComponent
  ],
  imports: [
    CommonModule,
    DeleteVehicleLogRoutingModule
  ]
})
export class DeleteVehicleLogModule { }
