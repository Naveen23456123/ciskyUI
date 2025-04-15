import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorBillingListRoutingModule } from './contractor-billing-list-routing.module';
import { ContractorBillingListComponent } from './contractor-billing-list.component';


@NgModule({
  declarations: [
    ContractorBillingListComponent
  ],
  imports: [
    CommonModule,
    ContractorBillingListRoutingModule
  ]
})
export class ContractorBillingListModule { }
