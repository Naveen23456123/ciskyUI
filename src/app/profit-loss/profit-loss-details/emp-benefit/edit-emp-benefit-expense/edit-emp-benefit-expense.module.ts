import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditEmpBenefitExpenseRoutingModule } from './edit-emp-benefit-expense-routing.module';
import { EditEmpBenefitExpenseComponent } from './edit-emp-benefit-expense.component';


@NgModule({
  declarations: [
    EditEmpBenefitExpenseComponent
  ],
  imports: [
    CommonModule,
    EditEmpBenefitExpenseRoutingModule
  ]
})
export class EditEmpBenefitExpenseModule { }
