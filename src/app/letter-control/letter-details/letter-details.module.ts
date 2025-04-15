import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LetterDetailsRoutingModule } from './letter-details-routing.module';
import { LetterDetailsComponent } from './letter-details.component';


@NgModule({
  declarations: [
    LetterDetailsComponent
  ],
  imports: [
    CommonModule,
    LetterDetailsRoutingModule
  ]
})
export class LetterDetailsModule { }
