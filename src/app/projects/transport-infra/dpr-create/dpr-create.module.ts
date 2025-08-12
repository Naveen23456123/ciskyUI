import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DprCreateRoutingModule } from './dpr-create-routing.module';
import { DprCreateComponent } from './dpr-create.component';


@NgModule({
  declarations: [
    DprCreateComponent
  ],
  imports: [
    CommonModule,
    DprCreateRoutingModule
  ]
})
export class DprCreateModule { }
