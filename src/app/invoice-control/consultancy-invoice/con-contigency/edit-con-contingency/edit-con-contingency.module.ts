import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditConContingencyRoutingModule } from './edit-con-contingency-routing.module';
import { EditConContingencyComponent } from './edit-con-contingency.component';


@NgModule({
  declarations: [
    EditConContingencyComponent
  ],
  imports: [
    CommonModule,
    EditConContingencyRoutingModule
  ]
})
export class EditConContingencyModule { }
