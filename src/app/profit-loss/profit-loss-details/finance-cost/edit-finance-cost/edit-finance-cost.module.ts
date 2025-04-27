import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditFinanceCostRoutingModule } from './edit-finance-cost-routing.module';
import { EditFinanceCostComponent } from './edit-finance-cost.component';


@NgModule({
  declarations: [
    EditFinanceCostComponent
  ],
  imports: [
    CommonModule,
    EditFinanceCostRoutingModule
  ]
})
export class EditFinanceCostModule { }
