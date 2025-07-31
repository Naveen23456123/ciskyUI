import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteExpReqBillingRoutingModule } from './delete-exp-req-billing-routing.module';
import { DeleteExpReqBillingComponent } from './delete-exp-req-billing.component';


@NgModule({
  declarations: [
    DeleteExpReqBillingComponent
  ],
  imports: [
    CommonModule,
    DeleteExpReqBillingRoutingModule
  ]
})
export class DeleteExpReqBillingModule { }
