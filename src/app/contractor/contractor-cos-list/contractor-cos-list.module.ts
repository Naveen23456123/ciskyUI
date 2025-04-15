import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorCosListRoutingModule } from './contractor-cos-list-routing.module';
import { ContractorCosListComponent } from './contractor-cos-list.component';


@NgModule({
  declarations: [
    ContractorCosListComponent
  ],
  imports: [
    CommonModule,
    ContractorCosListRoutingModule
  ]
})
export class ContractorCosListModule { }
