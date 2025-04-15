import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleLogListRoutingModule } from './vehicle-log-list-routing.module';
import { VehicleLogListComponent } from './vehicle-log-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    VehicleLogListComponent
  ],
  imports: [
    CommonModule,
    VehicleLogListRoutingModule, SharedModule,MaterialModule
  ]
})
export class VehicleLogListModule { }
