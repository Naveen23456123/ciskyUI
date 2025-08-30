import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoqListComponent } from './boq-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { BoqInvoiceComponent } from '@app/invoice-control/boq-invoice/boq-invoice.component';

const routes: Routes = [
  {
    path:'',
    component:BoqListComponent,
    data:{title:extractTitle('BOQ(s)')},
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoqListRoutingModule { }
