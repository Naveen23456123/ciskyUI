import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadProjectRoutingModule } from './upload-project-routing.module';
import { UploadProjectComponent } from './upload-project.component';


@NgModule({
  declarations: [
    UploadProjectComponent
  ],
  imports: [
    CommonModule,
    UploadProjectRoutingModule
  ]
})
export class UploadProjectModule { }
