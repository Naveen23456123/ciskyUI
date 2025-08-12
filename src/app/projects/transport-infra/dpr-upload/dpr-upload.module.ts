import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DprUploadRoutingModule } from './dpr-upload-routing.module';
import { DprUploadComponent } from './dpr-upload.component';


@NgModule({
  declarations: [
    DprUploadComponent
  ],
  imports: [
    CommonModule,
    DprUploadRoutingModule
  ]
})
export class DprUploadModule { }
