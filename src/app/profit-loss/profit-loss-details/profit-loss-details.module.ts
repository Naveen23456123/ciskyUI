import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfitLossDetailsRoutingModule } from './profit-loss-details-routing.module';
import { ProfitLossDetailsComponent } from './profit-loss-details.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { RevenueOperationListModule } from './revenue-operation/revenue-operation-list/revenue-operation-list.module';
import { EmpBenefitExpenseListModule } from './emp-benefit/emp-benefit-expense-list/emp-benefit-expense-list.module';
import { OtherIncomeListModule } from './other-income/other-income-list/other-income-list.module';
import { FinanceCostListModule } from './finance-cost/finance-cost-list/finance-cost-list.module';


@NgModule({
  declarations: [
    ProfitLossDetailsComponent
  ],
  imports: [
    CommonModule,
    ProfitLossDetailsRoutingModule, SharedModule, MaterialModule, RevenueOperationListModule, EmpBenefitExpenseListModule,
    OtherIncomeListModule, FinanceCostListModule
  ]
})
export class ProfitLossDetailsModule { }
