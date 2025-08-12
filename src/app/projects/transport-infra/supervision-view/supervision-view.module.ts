import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisionViewRoutingModule } from './supervision-view-routing.module';
import { SupervisionViewComponent } from './supervision-view.component';
import { MaterialModule } from '@app/shared/material/material.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    SupervisionViewComponent
  ],
  imports: [
    CommonModule,
    SupervisionViewRoutingModule, MaterialModule, SharedModule
  ]
})
export class SupervisionViewModule { }
