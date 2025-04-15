import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCircularRoutingModule } from './edit-circular-routing.module';
import { EditCircularComponent } from './edit-circular.component';


@NgModule({
  declarations: [
    EditCircularComponent
  ],
  imports: [
    CommonModule,
    EditCircularRoutingModule
  ]
})
export class EditCircularModule { }
