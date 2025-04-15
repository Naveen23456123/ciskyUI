import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddConsultantAccountRoutingModule } from './add-consultant-account-routing.module';
import { AddConsultantAccountComponent } from './add-consultant-account.component';


@NgModule({
  declarations: [
    AddConsultantAccountComponent
  ],
  imports: [
    CommonModule,
    AddConsultantAccountRoutingModule
  ]
})
export class AddConsultantAccountModule { }
