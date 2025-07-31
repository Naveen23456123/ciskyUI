import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteConContingencyRoutingModule } from './delete-con-contingency-routing.module';
import { DeleteConContingencyComponent } from './delete-con-contingency.component';


@NgModule({
  declarations: [
    DeleteConContingencyComponent
  ],
  imports: [
    CommonModule,
    DeleteConContingencyRoutingModule
  ]
})
export class DeleteConContingencyModule { }
