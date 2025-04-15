import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteSubCompanyRoutingModule } from './delete-sub-company-routing.module';
import { DeleteSubCompanyComponent } from './delete-sub-company.component';


@NgModule({
  declarations: [
    DeleteSubCompanyComponent
  ],
  imports: [
    CommonModule,
    DeleteSubCompanyRoutingModule
  ]
})
export class DeleteSubCompanyModule { }
