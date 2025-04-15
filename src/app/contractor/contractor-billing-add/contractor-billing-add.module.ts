import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorBillingAddRoutingModule } from './contractor-billing-add-routing.module';
import { ContractorBillingAddComponent } from './contractor-billing-add.component';


@NgModule({
  declarations: [
    ContractorBillingAddComponent
  ],
  imports: [
    CommonModule,
    ContractorBillingAddRoutingModule
  ]
})
export class ContractorBillingAddModule { }
