import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConOfcRentListRoutingModule } from './con-ofc-rent-list-routing.module';
import { ConOfcRentListComponent } from './con-ofc-rent-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ConOfcRentListComponent
  ],
  imports: [
    CommonModule,
    ConOfcRentListRoutingModule, SharedModule, MaterialModule
  ],
  exports:[ConOfcRentListComponent]
})
export class ConOfcRentListModule { }
