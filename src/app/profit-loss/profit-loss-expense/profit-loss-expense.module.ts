import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfitLossExpenseRoutingModule } from './profit-loss-expense-routing.module';
import { ProfitLossExpenseComponent } from './profit-loss-expense.component';
import { MaterialModule } from '@app/shared/material/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfitLossExpenseComponent
  ],
  imports: [
    CommonModule,
    ProfitLossExpenseRoutingModule, MaterialModule, SharedModule, FormsModule
  ]
})
export class ProfitLossExpenseModule { }
