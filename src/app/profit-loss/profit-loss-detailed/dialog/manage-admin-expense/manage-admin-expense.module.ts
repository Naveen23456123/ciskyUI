import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAdminExpenseRoutingModule } from './manage-admin-expense-routing.module';
import { ManageAdminExpenseComponent } from './manage-admin-expense.component';
import { MaterialModule } from '@app/shared/material/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ManageAdminExpenseComponent
  ],
  imports: [
    CommonModule,
    ManageAdminExpenseRoutingModule, MaterialModule, SharedModule, FormsModule
  ]
})
export class ManageAdminExpenseModule { }
