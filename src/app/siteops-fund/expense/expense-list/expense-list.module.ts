import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseListRoutingModule } from './expense-list-routing.module';
import { ExpenseListComponent } from './expense-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ExpenseListComponent
  ],
  imports: [
    CommonModule,
    ExpenseListRoutingModule, SharedModule, MaterialModule
  ]
})
export class ExpenseListModule { }
