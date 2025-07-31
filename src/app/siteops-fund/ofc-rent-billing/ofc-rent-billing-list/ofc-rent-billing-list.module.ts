import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfcRentBillingListRoutingModule } from './ofc-rent-billing-list-routing.module';
import { OfcRentBillingListComponent } from './ofc-rent-billing-list.component';
import { MaterialModule } from '@app/shared/material/material.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    OfcRentBillingListComponent
  ],
  imports: [
    CommonModule,
    OfcRentBillingListRoutingModule, MaterialModule, SharedModule
  ]
})
export class OfcRentBillingListModule { }
