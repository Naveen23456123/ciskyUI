import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddExpenseRoutingModule } from './add-expense-routing.module';
import { AddExpenseComponent } from './add-expense.component';


@NgModule({
  declarations: [
    AddExpenseComponent
  ],
  imports: [
    CommonModule,
    AddExpenseRoutingModule
  ]
})
export class AddExpenseModule { }
