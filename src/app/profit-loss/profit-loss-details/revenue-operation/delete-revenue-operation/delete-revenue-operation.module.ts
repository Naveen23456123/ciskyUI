import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteRevenueOperationRoutingModule } from './delete-revenue-operation-routing.module';
import { DeleteRevenueOperationComponent } from './delete-revenue-operation.component';


@NgModule({
  declarations: [
    DeleteRevenueOperationComponent
  ],
  imports: [
    CommonModule,
    DeleteRevenueOperationRoutingModule
  ]
})
export class DeleteRevenueOperationModule { }
