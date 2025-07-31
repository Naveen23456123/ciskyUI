import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddConContingencyRoutingModule } from './add-con-contingency-routing.module';
import { AddConContingencyComponent } from './add-con-contingency.component';


@NgModule({
  declarations: [
    AddConContingencyComponent
  ],
  imports: [
    CommonModule,
    AddConContingencyRoutingModule
  ]
})
export class AddConContingencyModule { }
