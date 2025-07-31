import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfcRentBillingListComponent } from './ofc-rent-billing-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddOfcRentBillingComponent } from '../add-ofc-rent-billing/add-ofc-rent-billing.component';
import { EditOfcRentBillingComponent } from '../edit-ofc-rent-billing/edit-ofc-rent-billing.component';
import { DeleteOfcRentBillingComponent } from '../delete-ofc-rent-billing/delete-ofc-rent-billing.component';

const routes: Routes = [
  {
    path:'',
    component:OfcRentBillingListComponent,
    data:{title:extractTitle('Office Billing')},
    children: [
      {
        path: 'create',
        component: AddOfcRentBillingComponent,
        loadChildren:()=>import('app/siteops-fund/ofc-rent-billing/add-ofc-rent-billing/add-ofc-rent-billing.module').then(x=>x.AddOfcRentBillingModule),
        data:{pageGuid:'680dd1bd3682904bdd6e9ac5',type:'add'}
      },
      {
        path: 'edit/:ofcBillingId',
        component: EditOfcRentBillingComponent,
        loadChildren:()=>import('app/siteops-fund/ofc-rent-billing/edit-ofc-rent-billing/edit-ofc-rent-billing.module').then(x=>x.EditOfcRentBillingModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:ofcBillingId',
        component: DeleteOfcRentBillingComponent,
        loadChildren:()=>import('app/siteops-fund/ofc-rent-billing/delete-ofc-rent-billing/delete-ofc-rent-billing.module').then(x=>x.DeleteOfcRentBillingModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfcRentBillingListRoutingModule { }
