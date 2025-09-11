import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule, SharedModule,MaterialModule
  ]
})
export class ResetPasswordModule { }
