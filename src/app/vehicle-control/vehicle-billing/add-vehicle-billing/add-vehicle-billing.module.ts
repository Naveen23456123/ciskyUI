import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddVehicleBillingRoutingModule } from './add-vehicle-billing-routing.module';
import { AddVehicleBillingComponent } from './add-vehicle-billing.component';


@NgModule({
  declarations: [
    AddVehicleBillingComponent
  ],
  imports: [
    CommonModule,
    AddVehicleBillingRoutingModule
  ]
})
export class AddVehicleBillingModule { }
