import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImperestBillingListRoutingModule } from './imperest-billing-list-routing.module';
import { ImperestBillingListComponent } from './imperest-billing-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [ImperestBillingListComponent],
  imports: [
    CommonModule,
    ImperestBillingListRoutingModule, SharedModule,MaterialModule
  ]
})
export class ImperestBillingListModule { }
