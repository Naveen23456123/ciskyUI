import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisionUploadRoutingModule } from './supervision-upload-routing.module';
import { SupervisionUploadComponent } from './supervision-upload.component';


@NgModule({
  declarations: [
    SupervisionUploadComponent
  ],
  imports: [
    CommonModule,
    SupervisionUploadRoutingModule
  ]
})
export class SupervisionUploadModule { }
