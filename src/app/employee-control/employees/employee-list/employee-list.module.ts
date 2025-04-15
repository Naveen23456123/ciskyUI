import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { EmployeeListComponent } from './employee-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    EmployeeListRoutingModule, SharedModule, MaterialModule
  ]
})
export class EmployeeListModule { }
