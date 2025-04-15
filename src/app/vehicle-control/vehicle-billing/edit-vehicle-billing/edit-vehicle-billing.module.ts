import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditVehicleBillingRoutingModule } from './edit-vehicle-billing-routing.module';
import { EditVehicleBillingComponent } from './edit-vehicle-billing.component';


@NgModule({
  declarations: [
    EditVehicleBillingComponent
  ],
  imports: [
    CommonModule,
    EditVehicleBillingRoutingModule
  ]
})
export class EditVehicleBillingModule { }
