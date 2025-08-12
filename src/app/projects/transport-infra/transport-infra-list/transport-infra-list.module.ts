import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportInfraListRoutingModule } from './transport-infra-list-routing.module';
import { TransportInfraListComponent } from './transport-infra-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    TransportInfraListComponent
  ],
  imports: [
    CommonModule,
    TransportInfraListRoutingModule, SharedModule, MaterialModule
  ]
})
export class TransportInfraListModule { }
