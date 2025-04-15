import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewVehicleLogRoutingModule } from './view-vehicle-log-routing.module';
import { ViewVehicleLogComponent } from './view-vehicle-log.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ViewVehicleLogComponent
  ],
  imports: [
    CommonModule,
    ViewVehicleLogRoutingModule, SharedModule, MaterialModule
  ]
})
export class ViewVehicleLogModule { }
