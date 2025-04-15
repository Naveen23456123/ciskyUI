import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditItemRoutingModule } from './edit-item-routing.module';
import { EditItemComponent } from './edit-item.component';


@NgModule({
  declarations: [EditItemComponent],
  imports: [
    CommonModule,
    EditItemRoutingModule
  ]
})
export class EditItemModule { }
