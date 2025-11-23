import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewVehicleBillingRoutingModule } from './view-vehicle-billing-routing.module';
import { ViewVehicleBillingComponent } from './view-vehicle-billing.component';


@NgModule({
  declarations: [
    ViewVehicleBillingComponent
  ],
  imports: [
    CommonModule,
    ViewVehicleBillingRoutingModule
  ]
})
export class ViewVehicleBillingModule { }
