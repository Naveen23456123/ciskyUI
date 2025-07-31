import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditExpReqBillingRoutingModule } from './edit-exp-req-billing-routing.module';
import { EditExpReqBillingComponent } from './edit-exp-req-billing.component';


@NgModule({
  declarations: [
    EditExpReqBillingComponent
  ],
  imports: [
    CommonModule,
    EditExpReqBillingRoutingModule
  ]
})
export class EditExpReqBillingModule { }
