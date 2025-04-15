import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddInventoryRoutingModule } from './add-inventory-routing.module';
import { AddInventoryComponent } from './add-inventory.component';


@NgModule({
  declarations: [
    AddInventoryComponent
  ],
  imports: [
    CommonModule,
    AddInventoryRoutingModule
  ]
})
export class AddInventoryModule { }
