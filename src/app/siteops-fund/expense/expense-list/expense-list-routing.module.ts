import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';
import { DeleteExpenseComponent } from '../delete-expense/delete-expense.component';
import { ClaimExpenseComponent } from '../claim-expense/claim-expense.component';
import { ViewExpenseComponent } from '../view-expense/view-expense.component';

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
        data:{pageGuid:'680dd2933682904bdd6e9afc',type:'add'}
      },
      {
        path: 'claim/:expId',
        component: ClaimExpenseComponent,
        loadChildren:()=>import('app/siteops-fund/expense/claim-expense/claim-expense.module').then(x=>x.ClaimExpenseModule),
        data:{pageGuid:'680dd2933682904bdd6e9afc',type:'claim'}
      },
      {
        path: 'view/:expId',
        component: ViewExpenseComponent,
        loadChildren:()=>import('app/siteops-fund/expense/view-expense/view-expense.module').then(x=>x.ViewExpenseModule),
        data:{pageGuid:'',type:'view'}
      },
      {
        path: 'edit/:expId',
        component: EditExpenseComponent,
        loadChildren:()=>import('app/siteops-fund/expense/edit-expense/edit-expense.module').then(x=>x.EditExpenseModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:expId',
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
