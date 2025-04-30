import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteApprovalRoutingModule } from './delete-approval-routing.module';
import { DeleteApprovalComponent } from './delete-approval.component';


@NgModule({
  declarations: [
    DeleteApprovalComponent
  ],
  imports: [
    CommonModule,
    DeleteApprovalRoutingModule
  ]
})
export class DeleteApprovalModule { }
