import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';
import { DeleteExpenseComponent } from '../delete-expense/delete-expense.component';

const routes: Routes = [
  {
    path:'',
    component:ExpenseListComponent,
    data:{title:extractTitle('Expenses')},
    children: [
      {
        path: 'create',
        component: AddExpenseComponent,
        loadChildren:()=>import('app/siteops-fund/expense/add-expense/add-expense.module').then(x=>x.AddExpenseModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:ticId',
        component: EditExpenseComponent,
        loadChildren:()=>import('app/siteops-fund/expense/edit-expense/edit-expense.module').then(x=>x.EditExpenseModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:ticId',
        component: DeleteExpenseComponent,
        loadChildren:()=>import('app/siteops-fund/expense/delete-expense/delete-expense.module').then(x=>x.DeleteExpenseModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseListRoutingModule { }
