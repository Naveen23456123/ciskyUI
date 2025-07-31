import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProfitLossRoutingModule } from './add-profit-loss-routing.module';
import { AddProfitLossComponent } from './add-profit-loss.component';


@NgModule({
  declarations: [
    AddProfitLossComponent
  ],
  imports: [
    CommonModule,
    AddProfitLossRoutingModule
  ]
})
export class AddProfitLossModule { }
