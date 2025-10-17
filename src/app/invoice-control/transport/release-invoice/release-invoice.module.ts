import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReleaseInvoiceRoutingModule } from './release-invoice-routing.module';
import { ReleaseInvoiceComponent } from './release-invoice.component';
import { MaterialModule } from '@app/shared/material/material.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    ReleaseInvoiceComponent
  ],
  imports: [
    CommonModule,
    ReleaseInvoiceRoutingModule, MaterialModule, SharedModule
  ]
})
export class ReleaseInvoiceModule { }
