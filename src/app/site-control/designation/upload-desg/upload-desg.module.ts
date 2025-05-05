import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadDesgRoutingModule } from './upload-desg-routing.module';
import { UploadDesgComponent } from './upload-desg.component';


@NgModule({
  declarations: [UploadDesgComponent],
  imports: [
    CommonModule,
    UploadDesgRoutingModule
  ]
})
export class UploadDesgModule { }
