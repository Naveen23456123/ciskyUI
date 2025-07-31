import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteMiscRoutingModule } from './delete-misc-routing.module';
import { DeleteMiscComponent } from './delete-misc.component';


@NgModule({
  declarations: [
    DeleteMiscComponent
  ],
  imports: [
    CommonModule,
    DeleteMiscRoutingModule
  ]
})
export class DeleteMiscModule { }
