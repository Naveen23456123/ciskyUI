import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppPermissionListRoutingModule } from './app-permission-list-routing.module';
import { AppPermissionListComponent } from './app-permission-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppPermissionListComponent
  ],
  imports: [
    CommonModule,
    AppPermissionListRoutingModule, SharedModule, MaterialModule, FormsModule
  ]
})
export class AppPermissionListModule { }
