import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImperestBillingListComponent } from './imperest-billing-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { EditImperestReqBillingComponent } from '../edit-imperest-req-billing/edit-imperest-req-billing.component';
import { DeleteImperestReqBillingComponent } from '../delete-imperest-req-billing/delete-imperest-req-billing.component';

const routes: Routes = [
   {
      path:'',
      component:ImperestBillingListComponent,
      data:{title:extractTitle('Imperest Request(s)')},
      children: [
        {
          path: 'edit/:billid',
          component: EditImperestReqBillingComponent,
          loadChildren:()=>import('app/requests/imperest-billing/edit-imperest-req-billing/edit-imperest-req-billing.module').then(x=>x.EditImperestReqBillingModule),
          data:{pageGuid:'',type:'edit'}
        },
        {
          path: 'delete/:billid',
          component: DeleteImperestReqBillingComponent,
          loadChildren:()=>import('app/requests/imperest-billing/delete-imperest-req-billing/delete-imperest-req-billing.module').then(x=>x.DeleteImperestReqBillingModule),
          data:{pageGuid:'',type:'delete'}
        }
      ]
   }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImperestBillingListRoutingModule { }
