import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimExpenseRoutingModule } from './claim-expense-routing.module';
import { ClaimExpenseComponent } from './claim-expense.component';


@NgModule({
  declarations: [
    ClaimExpenseComponent
  ],
  imports: [
    CommonModule,
    ClaimExpenseRoutingModule
  ]
})
export class ClaimExpenseModule { }
