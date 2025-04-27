import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEmpBenefitExpenseRoutingModule } from './add-emp-benefit-expense-routing.module';
import { AddEmpBenefitExpenseComponent } from './add-emp-benefit-expense.component';


@NgModule({
  declarations: [
    AddEmpBenefitExpenseComponent
  ],
  imports: [
    CommonModule,
    AddEmpBenefitExpenseRoutingModule
  ]
})
export class AddEmpBenefitExpenseModule { }
