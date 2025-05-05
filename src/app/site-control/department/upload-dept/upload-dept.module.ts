import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadDeptRoutingModule } from './upload-dept-routing.module';
import { UploadDeptComponent } from './upload-dept.component';


@NgModule({
  declarations: [
    UploadDeptComponent
  ],
  imports: [
    CommonModule,
    UploadDeptRoutingModule
  ]
})
export class UploadDeptModule { }
