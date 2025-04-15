import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteConsultantAccountRoutingModule } from './delete-consultant-account-routing.module';
import { DeleteConsultantAccountComponent } from './delete-consultant-account.component';


@NgModule({
  declarations: [
    DeleteConsultantAccountComponent
  ],
  imports: [
    CommonModule,
    DeleteConsultantAccountRoutingModule
  ]
})
export class DeleteConsultantAccountModule { }
