import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfitLossDetailedRoutingModule } from './profit-loss-detailed-routing.module';
import { ProfitLossDetailedComponent } from './profit-loss-detailed.component';
import { MaterialModule } from '@app/shared/material/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfitLossDetailedComponent
  ],
  imports: [
    CommonModule,
    ProfitLossDetailedRoutingModule, MaterialModule, SharedModule, FormsModule
  ]
})
export class ProfitLossDetailedModule { }
