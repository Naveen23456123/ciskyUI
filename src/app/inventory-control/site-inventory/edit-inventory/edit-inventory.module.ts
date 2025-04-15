import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditInventoryRoutingModule } from './edit-inventory-routing.module';
import { EditInventoryComponent } from './edit-inventory.component';


@NgModule({
  declarations: [
    EditInventoryComponent
  ],
  imports: [
    CommonModule,
    EditInventoryRoutingModule
  ]
})
export class EditInventoryModule { }
