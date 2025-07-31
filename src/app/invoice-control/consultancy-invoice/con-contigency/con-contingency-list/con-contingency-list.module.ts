import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConContingencyListRoutingModule } from './con-contingency-list-routing.module';
import { ConContingencyListComponent } from './con-contingency-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ConContingencyListComponent
  ],
  imports: [
    CommonModule,
    ConContingencyListRoutingModule, SharedModule, MaterialModule
  ],
  exports:[ConContingencyListComponent]
})
export class ConContingencyListModule { }
