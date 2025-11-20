import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { extractTitle } from '@app/core/i18n.service';
import { ProfitLossExpenseComponent } from './profit-loss-expense.component';

const routes: Routes = [
  {
    path:'',
    component:ProfitLossExpenseComponent,
    data:{title:extractTitle('Expense Details')},  
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfitLossExpenseRoutingModule { }
