import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceCostListRoutingModule } from './finance-cost-list-routing.module';
import { FinanceCostListComponent } from './finance-cost-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    FinanceCostListComponent
  ],
  imports: [
    CommonModule,
    FinanceCostListRoutingModule, SharedModule, MaterialModule
  ],
  exports:[FinanceCostListComponent]
})
export class FinanceCostListModule { }
