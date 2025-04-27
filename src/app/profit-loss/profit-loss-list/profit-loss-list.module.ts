import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfitLossListRoutingModule } from './profit-loss-list-routing.module';
import { ProfitLossListComponent } from './profit-loss-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ProfitLossListComponent
  ],
  imports: [
    CommonModule,
    ProfitLossListRoutingModule, SharedModule, MaterialModule
  ]
})
export class ProfitLossListModule { }
