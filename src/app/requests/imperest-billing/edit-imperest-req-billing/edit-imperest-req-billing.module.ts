import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditImperestReqBillingRoutingModule } from './edit-imperest-req-billing-routing.module';
import { EditImperestReqBillingComponent } from './edit-imperest-req-billing.component';


@NgModule({
  declarations: [
    EditImperestReqBillingComponent
  ],
  imports: [
    CommonModule,
    EditImperestReqBillingRoutingModule
  ]
})
export class EditImperestReqBillingModule { }
