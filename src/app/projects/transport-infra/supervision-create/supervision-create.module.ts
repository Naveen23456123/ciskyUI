import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisionCreateRoutingModule } from './supervision-create-routing.module';
import { SupervisionCreateComponent } from './supervision-create.component';


@NgModule({
  declarations: [
    SupervisionCreateComponent
  ],
  imports: [
    CommonModule,
    SupervisionCreateRoutingModule
  ]
})
export class SupervisionCreateModule { }
