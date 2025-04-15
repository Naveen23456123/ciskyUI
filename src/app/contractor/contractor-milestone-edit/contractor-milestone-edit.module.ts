import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorMilestoneEditRoutingModule } from './contractor-milestone-edit-routing.module';
import { ContractorMilestoneEditComponent } from './contractor-milestone-edit.component';


@NgModule({
  declarations: [
    ContractorMilestoneEditComponent
  ],
  imports: [
    CommonModule,
    ContractorMilestoneEditRoutingModule
  ]
})
export class ContractorMilestoneEditModule { }
