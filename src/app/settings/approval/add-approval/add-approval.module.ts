import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddApprovalRoutingModule } from './add-approval-routing.module';
import { AddApprovalComponent } from './add-approval.component';


@NgModule({
  declarations: [
    AddApprovalComponent
  ],
  imports: [
    CommonModule,
    AddApprovalRoutingModule
  ]
})
export class AddApprovalModule { }
