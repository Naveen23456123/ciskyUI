import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorCosAddRoutingModule } from './contractor-cos-add-routing.module';
import { ContractorCosAddComponent } from './contractor-cos-add.component';


@NgModule({
  declarations: [
    ContractorCosAddComponent
  ],
  imports: [
    CommonModule,
    ContractorCosAddRoutingModule
  ]
})
export class ContractorCosAddModule { }
