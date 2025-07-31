import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscListRoutingModule } from './misc-list-routing.module';
import { MiscListComponent } from './misc-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    MiscListComponent
  ],
  imports: [
    CommonModule,
    MiscListRoutingModule,SharedModule,MaterialModule
  ]
})
export class MiscListModule { }
