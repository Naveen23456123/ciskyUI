import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConDutyTravelListRoutingModule } from './con-duty-travel-list-routing.module';
import { ConDutyTravelListComponent } from './con-duty-travel-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ConDutyTravelListComponent
  ],
  imports: [
    CommonModule,
    ConDutyTravelListRoutingModule, SharedModule, MaterialModule
  ], 
  exports:[ConDutyTravelListComponent]
})
export class ConDutyTravelListModule { }
