import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteOfcReqBillingRoutingModule } from './delete-ofc-req-billing-routing.module';
import { DeleteOfcReqBillingComponent } from './delete-ofc-req-billing.component';


@NgModule({
  declarations: [
    DeleteOfcReqBillingComponent
  ],
  imports: [
    CommonModule,
    DeleteOfcReqBillingRoutingModule
  ]
})
export class DeleteOfcReqBillingModule { }
