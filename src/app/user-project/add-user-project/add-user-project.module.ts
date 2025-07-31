import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserProjectRoutingModule } from './add-user-project-routing.module';
import { AddUserProjectComponent } from './add-user-project.component';


@NgModule({
  declarations: [
    AddUserProjectComponent
  ],
  imports: [
    CommonModule,
    AddUserProjectRoutingModule
  ]
})
export class AddUserProjectModule { }
