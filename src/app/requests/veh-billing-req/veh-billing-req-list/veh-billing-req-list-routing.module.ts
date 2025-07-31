import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehBillingReqListComponent } from './veh-billing-req-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { EditVehReqBillingComponent } from '../edit-veh-req-billing/edit-veh-req-billing.component';
import { DeleteVehReqBillingComponent } from '../delete-veh-req-billing/delete-veh-req-billing.component';

const routes: Routes = [
   {
      path:'',
      component:VehBillingReqListComponent,
      data:{title:extractTitle('Vehicle Billing Request(s)')},
      children: [
        {
          path: 'edit/:billid',
          component: EditVehReqBillingComponent,
          loadChildren:()=>import('app/requests/veh-billing-req/edit-veh-req-billing/edit-veh-req-billing.module').then(x=>x.EditVehReqBillingModule),
          data:{pageGuid:'',type:'edit'}
        },
        {
          path: 'delete/:billid',
          component: DeleteVehReqBillingComponent,
          loadChildren:()=>import('app/requests/veh-billing-req/delete-veh-req-billing/delete-veh-req-billing.module').then(x=>x.DeleteVehReqBillingModule),
          data:{pageGuid:'',type:'delete'}
        }
      ]
   }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehBillingReqListRoutingModule { }
