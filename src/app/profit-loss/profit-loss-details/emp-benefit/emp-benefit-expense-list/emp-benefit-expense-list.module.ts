import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpBenefitExpenseListRoutingModule } from './emp-benefit-expense-list-routing.module';
import { EmpBenefitExpenseListComponent } from './emp-benefit-expense-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    EmpBenefitExpenseListComponent
  ],
  imports: [
    CommonModule,
    EmpBenefitExpenseListRoutingModule, SharedModule, MaterialModule
  ],
  exports:[EmpBenefitExpenseListComponent]
})
export class EmpBenefitExpenseListModule { }
