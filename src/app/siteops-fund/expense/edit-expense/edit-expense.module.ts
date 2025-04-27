import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditExpenseRoutingModule } from './edit-expense-routing.module';
import { EditExpenseComponent } from './edit-expense.component';


@NgModule({
  declarations: [
    EditExpenseComponent
  ],
  imports: [
    CommonModule,
    EditExpenseRoutingModule
  ]
})
export class EditExpenseModule { }
