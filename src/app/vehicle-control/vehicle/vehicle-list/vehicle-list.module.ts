import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleListRoutingModule } from './vehicle-list-routing.module';
import { VehicleListComponent } from './vehicle-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    VehicleListComponent
  ],
  imports: [
    CommonModule,
    VehicleListRoutingModule, SharedModule, MaterialModule
  ]
})
export class VehicleListModule { }
