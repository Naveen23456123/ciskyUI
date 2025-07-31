import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehBillingReqListRoutingModule } from './veh-billing-req-list-routing.module';
import { VehBillingReqListComponent } from './veh-billing-req-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    VehBillingReqListComponent
  ],
  imports: [
    CommonModule,
    VehBillingReqListRoutingModule, SharedModule,MaterialModule
  ]
})
export class VehBillingReqListModule { }
