import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteUserProjectRoutingModule } from './delete-user-project-routing.module';
import { DeleteUserProjectComponent } from './delete-user-project.component';


@NgModule({
  declarations: [
    DeleteUserProjectComponent
  ],
  imports: [
    CommonModule,
    DeleteUserProjectRoutingModule
  ]
})
export class DeleteUserProjectModule { }
