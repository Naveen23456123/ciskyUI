import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditImperestRoutingModule } from './edit-imperest-routing.module';
import { EditImperestComponent } from './edit-imperest.component';


@NgModule({
  declarations: [
    EditImperestComponent
  ],
  imports: [
    CommonModule,
    EditImperestRoutingModule
  ]
})
export class EditImperestModule { }
