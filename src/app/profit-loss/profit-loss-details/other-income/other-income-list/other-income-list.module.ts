import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherIncomeListRoutingModule } from './other-income-list-routing.module';
import { OtherIncomeListComponent } from './other-income-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    OtherIncomeListComponent
  ],
  imports: [
    CommonModule,
    OtherIncomeListRoutingModule, SharedModule, MaterialModule
  ],
  exports:[OtherIncomeListComponent]
})
export class OtherIncomeListModule { }
