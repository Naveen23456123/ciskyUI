import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalListRoutingModule } from './approval-list-routing.module';
import { ApprovalListComponent } from './approval-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ApprovalListComponent
  ],
  imports: [
    CommonModule,
    ApprovalListRoutingModule, SharedModule, MaterialModule
  ]
})
export class ApprovalListModule { }
