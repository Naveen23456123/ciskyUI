import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteInventoryRoutingModule } from './delete-inventory-routing.module';
import { DeleteInventoryComponent } from './delete-inventory.component';


@NgModule({
  declarations: [
    DeleteInventoryComponent
  ],
  imports: [
    CommonModule,
    DeleteInventoryRoutingModule
  ]
})
export class DeleteInventoryModule { }
