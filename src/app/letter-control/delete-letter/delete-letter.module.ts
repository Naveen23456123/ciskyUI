import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteLetterRoutingModule } from './delete-letter-routing.module';
import { DeleteLetterComponent } from './delete-letter.component';


@NgModule({
  declarations: [
    DeleteLetterComponent
  ],
  imports: [
    CommonModule,
    DeleteLetterRoutingModule
  ]
})
export class DeleteLetterModule { }
