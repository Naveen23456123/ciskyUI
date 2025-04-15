import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConOfcFurnitureListRoutingModule } from './con-ofc-furniture-list-routing.module';
import { ConOfcFurnitureListComponent } from './con-ofc-furniture-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ConOfcFurnitureListComponent
  ],
  imports: [
    CommonModule,
    ConOfcFurnitureListRoutingModule, SharedModule, MaterialModule
  ],
  exports:[ConOfcFurnitureListComponent]
})
export class ConOfcFurnitureListModule { }
