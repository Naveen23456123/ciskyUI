import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteVehReqBillingRoutingModule } from './delete-veh-req-billing-routing.module';
import { DeleteVehReqBillingComponent } from './delete-veh-req-billing.component';


@NgModule({
  declarations: [
    DeleteVehReqBillingComponent
  ],
  imports: [
    CommonModule,
    DeleteVehReqBillingRoutingModule
  ]
})
export class DeleteVehReqBillingModule { }
