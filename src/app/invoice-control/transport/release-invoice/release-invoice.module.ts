import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReleaseInvoiceRoutingModule } from './release-invoice-routing.module';
import { ReleaseInvoiceComponent } from './release-invoice.component';
import { MaterialModule } from '@app/shared/material/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ManageReleaseInvoiceComponent } from './dialog/manage-release-invoice/manage-release-invoice.component';


@NgModule({
  declarations: [
    ReleaseInvoiceComponent,
    ManageReleaseInvoiceComponent
  ],
  imports: [
    CommonModule,
    ReleaseInvoiceRoutingModule, MaterialModule, SharedModule, FormsModule
  ]
})
export class ReleaseInvoiceModule { }
