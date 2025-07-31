import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditMiscRoutingModule } from './edit-misc-routing.module';
import { EditMiscComponent } from './edit-misc.component';


@NgModule({
  declarations: [
    EditMiscComponent
  ],
  imports: [
    CommonModule,
    EditMiscRoutingModule
  ]
})
export class EditMiscModule { }
