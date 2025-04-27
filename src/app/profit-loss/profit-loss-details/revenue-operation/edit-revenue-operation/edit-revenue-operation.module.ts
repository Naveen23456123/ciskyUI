import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRevenueOperationRoutingModule } from './edit-revenue-operation-routing.module';
import { EditRevenueOperationComponent } from './edit-revenue-operation.component';


@NgModule({
  declarations: [
    EditRevenueOperationComponent
  ],
  imports: [
    CommonModule,
    EditRevenueOperationRoutingModule
  ]
})
export class EditRevenueOperationModule { }
