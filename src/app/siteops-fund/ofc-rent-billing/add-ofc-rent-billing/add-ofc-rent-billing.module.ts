import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOfcRentBillingRoutingModule } from './add-ofc-rent-billing-routing.module';
import { AddOfcRentBillingComponent } from './add-ofc-rent-billing.component';


@NgModule({
  declarations: [
    AddOfcRentBillingComponent
  ],
  imports: [
    CommonModule,
    AddOfcRentBillingRoutingModule
  ]
})
export class AddOfcRentBillingModule { }
