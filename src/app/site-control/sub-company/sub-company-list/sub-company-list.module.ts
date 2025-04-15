import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCompanyListRoutingModule } from './sub-company-list-routing.module';
import { SubCompanyListComponent } from './sub-company-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    SubCompanyListComponent
  ],
  imports: [
    CommonModule,
    SubCompanyListRoutingModule, SharedModule,MaterialModule
  ]
})
export class SubCompanyListModule { }
