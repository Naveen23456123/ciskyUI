import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteExpenseRoutingModule } from './delete-expense-routing.module';
import { DeleteExpenseComponent } from './delete-expense.component';


@NgModule({
  declarations: [
    DeleteExpenseComponent
  ],
  imports: [
    CommonModule,
    DeleteExpenseRoutingModule
  ]
})
export class DeleteExpenseModule { }
