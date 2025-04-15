import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditEmployeeRoutingModule } from './edit-employee-routing.module';
import { EditEmployeeComponent } from './edit-employee.component';


@NgModule({
  declarations: [
    EditEmployeeComponent
  ],
  imports: [
    CommonModule,
    EditEmployeeRoutingModule
  ]
})
export class EditEmployeeModule { }
