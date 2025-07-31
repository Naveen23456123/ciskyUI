import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectInvoiceListRoutingModule } from './project-invoice-list-routing.module';
import { ProjectInvoiceListComponent } from './project-invoice-list.component';


@NgModule({
  declarations: [
    ProjectInvoiceListComponent
  ],
  imports: [
    CommonModule,
    ProjectInvoiceListRoutingModule
  ]
})
export class ProjectInvoiceListModule { }
