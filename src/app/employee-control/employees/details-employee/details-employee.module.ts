import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsEmployeeRoutingModule } from './details-employee-routing.module';
import { DetailsEmployeeComponent } from './details-employee.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    DetailsEmployeeComponent
  ],
  imports: [
    CommonModule,
    DetailsEmployeeRoutingModule,SharedModule,MaterialModule
  ]
})
export class DetailsEmployeeModule { }
