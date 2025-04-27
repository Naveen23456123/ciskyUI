import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddFinanceCostRoutingModule } from './add-finance-cost-routing.module';
import { AddFinanceCostComponent } from './add-finance-cost.component';


@NgModule({
  declarations: [
    AddFinanceCostComponent
  ],
  imports: [
    CommonModule,
    AddFinanceCostRoutingModule
  ]
})
export class AddFinanceCostModule { }
