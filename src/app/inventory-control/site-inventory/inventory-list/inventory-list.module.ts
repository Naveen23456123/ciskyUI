import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryListRoutingModule } from './inventory-list-routing.module';
import { InventoryListComponent } from './inventory-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    InventoryListComponent
  ],
  imports: [
    CommonModule,
    InventoryListRoutingModule, SharedModule, MaterialModule
  ]
})
export class InventoryListModule { }
