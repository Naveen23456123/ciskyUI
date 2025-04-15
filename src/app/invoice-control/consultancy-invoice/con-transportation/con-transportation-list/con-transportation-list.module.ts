import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConTransportationListRoutingModule } from './con-transportation-list-routing.module';
import { ConTransportationListComponent } from './con-transportation-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ConTransportationListComponent
  ],
  imports: [
    CommonModule,
    ConTransportationListRoutingModule,SharedModule, MaterialModule
  ],
  exports:[ConTransportationListComponent]
})
export class ConTransportationListModule { }
