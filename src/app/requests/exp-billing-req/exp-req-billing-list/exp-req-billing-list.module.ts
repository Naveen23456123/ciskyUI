import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpReqBillingListRoutingModule } from './exp-req-billing-list-routing.module';
import { ExpReqBillingListComponent } from './exp-req-billing-list.component';
import { MaterialModule } from '@app/shared/material/material.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    ExpReqBillingListComponent
  ],
  imports: [
    CommonModule,
    ExpReqBillingListRoutingModule,MaterialModule,SharedModule
  ]
})
export class ExpReqBillingListModule { }
