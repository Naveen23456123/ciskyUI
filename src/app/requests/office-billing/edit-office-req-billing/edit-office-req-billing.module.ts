import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditOfficeReqBillingRoutingModule } from './edit-office-req-billing-routing.module';
import { EditOfficeReqBillingComponent } from './edit-office-req-billing.component';


@NgModule({
  declarations: [
    EditOfficeReqBillingComponent
  ],
  imports: [
    CommonModule,
    EditOfficeReqBillingRoutingModule
  ]
})
export class EditOfficeReqBillingModule { }
