import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfitLossDetailedComponent } from './profit-loss-detailed.component';
import { extractTitle } from '@app/core/i18n.service';
import { ManageAdminExpenseComponent } from './dialog/manage-admin-expense/manage-admin-expense.component';

const routes: Routes = [
  {
    path:'',
    component:ProfitLossDetailedComponent,
    data:{title:extractTitle('Profit & Loss')},  
    children: [
        {
          path: 'admin-exp',
          component: ManageAdminExpenseComponent,
          loadChildren:()=>import('app/profit-loss/profit-loss-detailed/dialog/manage-admin-expense/manage-admin-expense.module').then(x=>x.ManageAdminExpenseModule),
          data:{pageGuid:'',type:'add'}
        }
      ]  
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfitLossDetailedRoutingModule { }
