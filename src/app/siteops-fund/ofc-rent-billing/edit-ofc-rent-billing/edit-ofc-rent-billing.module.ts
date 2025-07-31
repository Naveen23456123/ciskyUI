import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditOfcRentBillingRoutingModule } from './edit-ofc-rent-billing-routing.module';
import { EditOfcRentBillingComponent } from './edit-ofc-rent-billing.component';


@NgModule({
  declarations: [
    EditOfcRentBillingComponent
  ],
  imports: [
    CommonModule,
    EditOfcRentBillingRoutingModule
  ]
})
export class EditOfcRentBillingModule { }
