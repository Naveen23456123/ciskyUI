import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeRentListRoutingModule } from './office-rent-list-routing.module';
import { OfficeRentListComponent } from './office-rent-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    OfficeRentListComponent
  ],
  imports: [
    CommonModule,
    OfficeRentListRoutingModule, SharedModule,MaterialModule
  ]
})

export class OfficeRentListModule { }
