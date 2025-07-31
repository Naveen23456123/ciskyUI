import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProjectListRoutingModule } from './user-project-list-routing.module';
import { UserProjectListComponent } from './user-project-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    UserProjectListComponent
  ],
  imports: [
    CommonModule,
    UserProjectListRoutingModule, SharedModule,MaterialModule
  ]
})
export class UserProjectListModule { }
