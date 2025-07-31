import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpReqBillingListComponent } from './exp-req-billing-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { EditExpReqBillingComponent } from '../edit-exp-req-billing/edit-exp-req-billing.component';
import { DeleteExpReqBillingComponent } from '../delete-exp-req-billing/delete-exp-req-billing.component';

const routes: Routes = [
   {
      path:'',
      component:ExpReqBillingListComponent,
      data:{title:extractTitle('Expense Billing Request(s)')},
      children: [
        {
          path: 'edit/:billid',
          component: EditExpReqBillingComponent,
          loadChildren:()=>import('app/requests/exp-billing-req/edit-exp-req-billing/edit-exp-req-billing.module').then(x=>x.EditExpReqBillingModule),
          data:{pageGuid:'',type:'edit'}
        },
        {
          path: 'delete/:billid',
          component: DeleteExpReqBillingComponent,
          loadChildren:()=>import('app/requests/exp-billing-req/delete-exp-req-billing/delete-exp-req-billing.module').then(x=>x.DeleteExpReqBillingModule),
          data:{pageGuid:'',type:'delete'}
        }
      ]
   }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpReqBillingListRoutingModule { }
