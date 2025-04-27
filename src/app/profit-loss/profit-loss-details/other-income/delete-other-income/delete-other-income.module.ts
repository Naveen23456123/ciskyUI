import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteOtherIncomeRoutingModule } from './delete-other-income-routing.module';
import { DeleteOtherIncomeComponent } from './delete-other-income.component';


@NgModule({
  declarations: [
    DeleteOtherIncomeComponent
  ],
  imports: [
    CommonModule,
    DeleteOtherIncomeRoutingModule
  ]
})
export class DeleteOtherIncomeModule { }
