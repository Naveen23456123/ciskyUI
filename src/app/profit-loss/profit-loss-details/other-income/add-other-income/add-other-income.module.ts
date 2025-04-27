import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOtherIncomeRoutingModule } from './add-other-income-routing.module';
import { AddOtherIncomeComponent } from './add-other-income.component';


@NgModule({
  declarations: [
    AddOtherIncomeComponent
  ],
  imports: [
    CommonModule,
    AddOtherIncomeRoutingModule
  ]
})
export class AddOtherIncomeModule { }
