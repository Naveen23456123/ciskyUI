import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleaseInvoiceComponent } from './release-invoice.component';
import { extractTitle } from '@app/core/i18n.service';

const routes: Routes = [
  {
    path:'',
    component:ReleaseInvoiceComponent,
    data:{title:extractTitle('Release Detail(s)')},
  }]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleaseInvoiceRoutingModule { }
