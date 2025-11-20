import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageReleaseInvoiceRoutingModule } from './manage-release-invoice-routing.module';
import { ManageReleaseInvoiceComponent } from './manage-release-invoice.component';
import { MaterialModule } from '@app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    //ManageReleaseInvoiceComponent
  ],
  imports: [
    CommonModule,
    ManageReleaseInvoiceRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule
  ]
})
export class ManageReleaseInvoiceModule { }
