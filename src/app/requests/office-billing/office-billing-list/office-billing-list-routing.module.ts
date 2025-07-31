import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeBillingListComponent } from './office-billing-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { EditOfficeReqBillingComponent } from '../edit-office-req-billing/edit-office-req-billing.component';
import { DeleteOfcReqBillingComponent } from '../delete-ofc-req-billing/delete-ofc-req-billing.component';

const routes: Routes = [
   {
      path:'',
      component:OfficeBillingListComponent,
      data:{title:extractTitle('Office Billing Request(s)')},
      children: [
        {
          path: 'edit/:lbillid',
          component: EditOfficeReqBillingComponent,
          loadChildren:()=>import('app/requests/office-billing/edit-office-req-billing/edit-office-req-billing.module').then(x=>x.EditOfficeReqBillingModule),
          data:{pageGuid:'',type:'edit'}
        },
        {
          path: 'delete/:lbillid',
          component: DeleteOfcReqBillingComponent,
          loadChildren:()=>import('app/requests/office-billing/delete-ofc-req-billing/delete-ofc-req-billing.module').then(x=>x.DeleteOfcReqBillingModule),
          data:{pageGuid:'',type:'delete'}
        }
      ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeBillingListRoutingModule { }
