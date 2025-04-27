import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImperestListRoutingModule } from './imperest-list-routing.module';
import { ImperestListComponent } from './imperest-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ImperestListComponent
  ],
  imports: [
    CommonModule,
    ImperestListRoutingModule, SharedModule,MaterialModule
  ]
})
export class ImperestListModule { }
