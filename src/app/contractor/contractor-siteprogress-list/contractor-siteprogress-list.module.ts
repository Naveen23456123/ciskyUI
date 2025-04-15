import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorSiteprogressListRoutingModule } from './contractor-siteprogress-list-routing.module';
import { ContractorSiteprogressListComponent } from './contractor-siteprogress-list.component';


@NgModule({
  declarations: [
    ContractorSiteprogressListComponent
  ],
  imports: [
    CommonModule,
    ContractorSiteprogressListRoutingModule
  ]
})
export class ContractorSiteprogressListModule { }
