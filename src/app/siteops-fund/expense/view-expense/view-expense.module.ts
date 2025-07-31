import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewExpenseRoutingModule } from './view-expense-routing.module';
import { ViewExpenseComponent } from './view-expense.component';


@NgModule({
  declarations: [
    ViewExpenseComponent
  ],
  imports: [
    CommonModule,
    ViewExpenseRoutingModule
  ]
})
export class ViewExpenseModule { }
