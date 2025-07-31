import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteOfcRentBillingRoutingModule } from './delete-ofc-rent-billing-routing.module';
import { DeleteOfcRentBillingComponent } from './delete-ofc-rent-billing.component';


@NgModule({
  declarations: [
    DeleteOfcRentBillingComponent
  ],
  imports: [
    CommonModule,
    DeleteOfcRentBillingRoutingModule
  ]
})
export class DeleteOfcRentBillingModule { }
