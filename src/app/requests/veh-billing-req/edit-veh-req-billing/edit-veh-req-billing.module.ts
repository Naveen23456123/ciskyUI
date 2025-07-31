import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditVehReqBillingRoutingModule } from './edit-veh-req-billing-routing.module';
import { EditVehReqBillingComponent } from './edit-veh-req-billing.component';


@NgModule({
  declarations: [
    EditVehReqBillingComponent
  ],
  imports: [
    CommonModule,
    EditVehReqBillingRoutingModule
  ]
})
export class EditVehReqBillingModule { }
