import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteVehicleBillingRoutingModule } from './delete-vehicle-billing-routing.module';
import { DeleteVehicleBillingComponent } from './delete-vehicle-billing.component';


@NgModule({
  declarations: [
    DeleteVehicleBillingComponent
  ],
  imports: [
    CommonModule,
    DeleteVehicleBillingRoutingModule
  ]
})
export class DeleteVehicleBillingModule { }
