import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotpasswordRoutingModule } from './forgotpassword-routing.module';
import { ForgotpasswordComponent } from './forgotpassword.component';
import { MaterialModule } from '@app/shared/material/material.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    ForgotpasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotpasswordRoutingModule, MaterialModule,SharedModule
  ]
})
export class ForgotpasswordModule { }
