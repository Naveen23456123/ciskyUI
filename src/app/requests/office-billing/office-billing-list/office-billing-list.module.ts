import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeBillingListRoutingModule } from './office-billing-list-routing.module';
import { OfficeBillingListComponent } from './office-billing-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    OfficeBillingListComponent
  ],
  imports: [
    CommonModule,
    OfficeBillingListRoutingModule, SharedModule, MaterialModule
  ]
})
export class OfficeBillingListModule { }
