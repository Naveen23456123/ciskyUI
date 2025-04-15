import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoqListRoutingModule } from './boq-list-routing.module';
import { BoqListComponent } from './boq-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    BoqListComponent
  ],
  imports: [
    CommonModule,
    BoqListRoutingModule,SharedModule, MaterialModule
  ]
})
export class BoqListModule { }
