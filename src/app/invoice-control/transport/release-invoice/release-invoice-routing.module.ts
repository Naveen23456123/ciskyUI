import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleaseInvoiceComponent } from './release-invoice.component';
import { extractTitle } from '@app/core/i18n.service';
import { ManageReleaseInvoiceComponent } from './dialog/manage-release-invoice/manage-release-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: ReleaseInvoiceComponent,
    data: { title: extractTitle('Release Detail(s)') },
    children: [
      {
        path: 'manage-release',
        component: ManageReleaseInvoiceComponent,
        loadChildren: () => import('app/invoice-control/transport/release-invoice/release-invoice.module').then(x => x.ReleaseInvoiceModule),
        data: { pageGuid: '', type: 'add' }
      },
    ]
  }]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleaseInvoiceRoutingModule { }
