import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditConsultantAccountRoutingModule } from './edit-consultant-account-routing.module';
import { EditConsultantAccountComponent } from './edit-consultant-account.component';


@NgModule({
  declarations: [
    EditConsultantAccountComponent
  ],
  imports: [
    CommonModule,
    EditConsultantAccountRoutingModule
  ]
})
export class EditConsultantAccountModule { }
