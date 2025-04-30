import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditApprovalRoutingModule } from './edit-approval-routing.module';
import { EditApprovalComponent } from './edit-approval.component';


@NgModule({
  declarations: [
    EditApprovalComponent
  ],
  imports: [
    CommonModule,
    EditApprovalRoutingModule
  ]
})
export class EditApprovalModule { }
