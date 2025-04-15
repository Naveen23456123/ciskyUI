import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddInvoiceRoutingModule } from './add-invoice-routing.module';
import { AddInvoiceComponent } from './add-invoice.component';


@NgModule({
  declarations: [
    AddInvoiceComponent
  ],
  imports: [
    CommonModule,
    AddInvoiceRoutingModule
  ]
})
export class AddInvoiceModule { }
