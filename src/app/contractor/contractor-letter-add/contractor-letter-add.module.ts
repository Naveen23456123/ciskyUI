import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorLetterAddRoutingModule } from './contractor-letter-add-routing.module';
import { ContractorLetterAddComponent } from './contractor-letter-add.component';


@NgModule({
  declarations: [
    ContractorLetterAddComponent
  ],
  imports: [
    CommonModule,
    ContractorLetterAddRoutingModule
  ]
})
export class ContractorLetterAddModule { }
