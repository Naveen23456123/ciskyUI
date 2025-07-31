import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteImperestReqBillingRoutingModule } from './delete-imperest-req-billing-routing.module';
import { DeleteImperestReqBillingComponent } from './delete-imperest-req-billing.component';


@NgModule({
  declarations: [
    DeleteImperestReqBillingComponent
  ],
  imports: [
    CommonModule,
    DeleteImperestReqBillingRoutingModule
  ]
})
export class DeleteImperestReqBillingModule { }
