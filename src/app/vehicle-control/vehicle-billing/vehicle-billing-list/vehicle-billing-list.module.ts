import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleBillingListRoutingModule } from './vehicle-billing-list-routing.module';
import { VehicleBillingListComponent } from './vehicle-billing-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    VehicleBillingListComponent
  ],
  imports: [
    CommonModule,
    VehicleBillingListRoutingModule, SharedModule, MaterialModule
  ]
})
export class VehicleBillingListModule { }
