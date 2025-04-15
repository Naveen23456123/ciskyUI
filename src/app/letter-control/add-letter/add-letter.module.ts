import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddLetterRoutingModule } from './add-letter-routing.module';
import { AddLetterComponent } from './add-letter.component';


@NgModule({
  declarations: [
    AddLetterComponent
  ],
  imports: [
    CommonModule,
    AddLetterRoutingModule
  ]
})
export class AddLetterModule { }
