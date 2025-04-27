import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditOtherIncomeRoutingModule } from './edit-other-income-routing.module';
import { EditOtherIncomeComponent } from './edit-other-income.component';


@NgModule({
  declarations: [
    EditOtherIncomeComponent
  ],
  imports: [
    CommonModule,
    EditOtherIncomeRoutingModule
  ]
})
export class EditOtherIncomeModule { }
