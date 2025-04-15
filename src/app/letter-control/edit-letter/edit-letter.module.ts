import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditLetterRoutingModule } from './edit-letter-routing.module';
import { EditLetterComponent } from './edit-letter.component';


@NgModule({
  declarations: [
    EditLetterComponent
  ],
  imports: [
    CommonModule,
    EditLetterRoutingModule
  ]
})
export class EditLetterModule { }
