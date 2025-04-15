import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './invoice-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddInvoiceComponent } from '../add-invoice/add-invoice.component';
import { DeleteInvoiceComponent } from '../delete-invoice/delete-invoice.component';

const routes: Routes = [
  {
    path:'',
    component:InvoiceListComponent,
    data:{title:extractTitle('Invoice List')},
    children: [
      {
        path: 'create',
        component: AddInvoiceComponent,
        loadChildren:()=>import('app/payments/invoice/add-invoice/add-invoice.module').then(x=>x.AddInvoiceModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'delete/:invId',
        component: DeleteInvoiceComponent,
        loadChildren:()=>import('app/payments/invoice/delete-invoice/delete-invoice.module').then(x=>x.DeleteInvoiceModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceListRoutingModule { }
