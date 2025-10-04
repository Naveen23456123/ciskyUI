import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewOfficeBillingRoutingModule } from './view-office-billing-routing.module';
import { ViewOfficeBillingComponent } from './view-office-billing.component';


@NgModule({
  declarations: [
    ViewOfficeBillingComponent
  ],
  imports: [
    CommonModule,
    ViewOfficeBillingRoutingModule
  ]
})
export class ViewOfficeBillingModule { }
