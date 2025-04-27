import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddImperestRoutingModule } from './add-imperest-routing.module';
import { AddImperestComponent } from './add-imperest.component';


@NgModule({
  declarations: [
    AddImperestComponent
  ],
  imports: [
    CommonModule,
    AddImperestRoutingModule
  ]
})
export class AddImperestModule { }
