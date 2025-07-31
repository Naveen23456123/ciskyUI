import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserProjectRoutingModule } from './edit-user-project-routing.module';
import { EditUserProjectComponent } from './edit-user-project.component';


@NgModule({
  declarations: [
    EditUserProjectComponent
  ],
  imports: [
    CommonModule,
    EditUserProjectRoutingModule
  ]
})
export class EditUserProjectModule { }
