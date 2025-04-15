import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCircularRoutingModule } from './add-circular-routing.module';
import { AddCircularComponent } from './add-circular.component';


@NgModule({
  declarations: [
    AddCircularComponent
  ],
  imports: [
    CommonModule,
    AddCircularRoutingModule
  ]
})
export class AddCircularModule { }
