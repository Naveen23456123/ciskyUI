import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorListRoutingModule } from './contractor-list-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { ContractorListComponent } from './contractor-list.component';
import { ContractorDetailsComponent } from './contractor-details/contractor-details.component';


@NgModule({
  declarations: [
    ContractorListComponent,ContractorDetailsComponent
  ],
  imports: [
    CommonModule,
    ContractorListRoutingModule, SharedModule,MaterialModule
  ],
  exports:[ContractorDetailsComponent]
})
export class ContractorListModule { }
