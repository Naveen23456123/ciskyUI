import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportInfraUploadRoutingModule } from './transport-infra-upload-routing.module';
import { TransportInfraUploadComponent } from './transport-infra-upload.component';


@NgModule({
  declarations: [
    TransportInfraUploadComponent
  ],
  imports: [
    CommonModule,
    TransportInfraUploadRoutingModule
  ]
})
export class TransportInfraUploadModule { }
