import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMiscRoutingModule } from './add-misc-routing.module';
import { AddMiscComponent } from './add-misc.component';


@NgModule({
  declarations: [
    AddMiscComponent
  ],
  imports: [
    CommonModule,
    AddMiscRoutingModule
  ]
})
export class AddMiscModule { }
