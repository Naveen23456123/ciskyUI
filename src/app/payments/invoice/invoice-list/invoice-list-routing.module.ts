import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './invoice-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddInvoiceComponent } from '../add-invoice/add-invoice.component';
import { DeleteInvoiceComponent } from '../delete-invoice/delete-invoice.component';
import { ProjectInvoiceListComponent } from '../project-invoice-list/project-invoice-list.component';

const routes: Routes = [
  {
    path:'',
    component:InvoiceListComponent,
    data:{title:extractTitle('Invoice(s)')},
    children: [
      {
        path: 'create',
        component: AddInvoiceComponent,
        loadChildren:()=>import('app/payments/invoice/add-invoice/add-invoice.module').then(x=>x.AddInvoiceModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'inv-list',
        component: ProjectInvoiceListComponent,
        loadChildren:()=>import('app/payments/invoice/project-invoice-list/project-invoice-list.module').then(x=>x.ProjectInvoiceListModule),
        data:{pageGuid:'',type:'list'}
      },
      {
        path: 'delete/:invId',
        component: DeleteInvoiceComponent,
        loadChildren:()=>import('app/payments/invoice/delete-invoice/delete-invoice.module').then(x=>x.DeleteInvoiceModule),
        data:{pageGuid:'',type:'delete'}
      },
       {
        path: 'trans-sv-create',
        component: AddInvoiceComponent,
        loadChildren:()=>import('app/payments/invoice/add-invoice/add-invoice.module').then(x=>x.AddInvoiceModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'trans-sv-list',
        component: ProjectInvoiceListComponent,
        loadChildren:()=>import('app/payments/invoice/project-invoice-list/project-invoice-list.module').then(x=>x.ProjectInvoiceListModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'trans-dpr-create',
        component: AddInvoiceComponent,
        loadChildren:()=>import('app/payments/invoice/add-invoice/add-invoice.module').then(x=>x.AddInvoiceModule),
        data:{pageGuid:'',type:'add'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceListRoutingModule { }
