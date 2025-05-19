import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadLetterRoutingModule } from './upload-letter-routing.module';
import { UploadLetterComponent } from './upload-letter.component';


@NgModule({
  declarations: [
    UploadLetterComponent
  ],
  imports: [
    CommonModule,
    UploadLetterRoutingModule
  ]
})
export class UploadLetterModule { }
