import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteEmployeeRoutingModule } from './delete-employee-routing.module';
import { DeleteEmployeeComponent } from './delete-employee.component';


@NgModule({
  declarations: [
    DeleteEmployeeComponent
  ],
  imports: [
    CommonModule,
    DeleteEmployeeRoutingModule
  ]
})
export class DeleteEmployeeModule { }
