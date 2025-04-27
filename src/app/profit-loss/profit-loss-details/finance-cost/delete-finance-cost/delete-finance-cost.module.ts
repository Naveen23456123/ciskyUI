import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteFinanceCostRoutingModule } from './delete-finance-cost-routing.module';
import { DeleteFinanceCostComponent } from './delete-finance-cost.component';


@NgModule({
  declarations: [
    DeleteFinanceCostComponent
  ],
  imports: [
    CommonModule,
    DeleteFinanceCostRoutingModule
  ]
})
export class DeleteFinanceCostModule { }
