import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteInvoiceRoutingModule } from './delete-invoice-routing.module';
import { DeleteInvoiceComponent } from './delete-invoice.component';


@NgModule({
  declarations: [
    DeleteInvoiceComponent
  ],
  imports: [
    CommonModule,
    DeleteInvoiceRoutingModule
  ]
})
export class DeleteInvoiceModule { }
