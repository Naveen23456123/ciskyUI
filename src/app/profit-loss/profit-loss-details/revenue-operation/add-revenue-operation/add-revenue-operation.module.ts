import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRevenueOperationRoutingModule } from './add-revenue-operation-routing.module';
import { AddRevenueOperationComponent } from './add-revenue-operation.component';


@NgModule({
  declarations: [
    AddRevenueOperationComponent
  ],
  imports: [
    CommonModule,
    AddRevenueOperationRoutingModule
  ]
})
export class AddRevenueOperationModule { }
