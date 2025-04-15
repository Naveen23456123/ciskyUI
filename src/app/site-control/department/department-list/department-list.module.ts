import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentListRoutingModule } from './department-list-routing.module';
import { DepartmentListComponent } from './department-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [DepartmentListComponent],
  imports: [
    CommonModule,
    DepartmentListRoutingModule, SharedModule, MaterialModule
  ]
})
export class DepartmentListModule { }
