import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CircularListRoutingModule } from './circular-list-routing.module';
import { CircularListComponent } from './circular-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    CircularListComponent
  ],
  imports: [
    CommonModule,
    CircularListRoutingModule, SharedModule, MaterialModule
  ]
})
export class CircularListModule { }
