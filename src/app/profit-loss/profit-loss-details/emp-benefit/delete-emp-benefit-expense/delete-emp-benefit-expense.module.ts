import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteEmpBenefitExpenseRoutingModule } from './delete-emp-benefit-expense-routing.module';
import { DeleteEmpBenefitExpenseComponent } from './delete-emp-benefit-expense.component';


@NgModule({
  declarations: [
    DeleteEmpBenefitExpenseComponent
  ],
  imports: [
    CommonModule,
    DeleteEmpBenefitExpenseRoutingModule
  ]
})
export class DeleteEmpBenefitExpenseModule { }
