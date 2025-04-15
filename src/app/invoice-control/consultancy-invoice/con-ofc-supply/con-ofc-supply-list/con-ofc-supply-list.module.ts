import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConOfcSupplyListRoutingModule } from './con-ofc-supply-list-routing.module';
import { ConOfcSupplyListComponent } from './con-ofc-supply-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ConOfcSupplyListComponent
  ],
  imports: [
    CommonModule,
    ConOfcSupplyListRoutingModule, SharedModule, MaterialModule
  ],
  exports:[ConOfcSupplyListComponent]
})
export class ConOfcSupplyListModule { }
