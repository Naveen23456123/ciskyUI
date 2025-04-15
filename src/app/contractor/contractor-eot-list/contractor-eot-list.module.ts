import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorEotListRoutingModule } from './contractor-eot-list-routing.module';
import { ContractorEotListComponent } from './contractor-eot-list.component';


@NgModule({
  declarations: [
    ContractorEotListComponent
  ],
  imports: [
    CommonModule,
    ContractorEotListRoutingModule
  ]
})
export class ContractorEotListModule { }
