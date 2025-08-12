import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DprViewRoutingModule } from './dpr-view-routing.module';
import { DprViewComponent } from './dpr-view.component';
import { MaterialModule } from '@app/shared/material/material.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    DprViewComponent
  ],
  imports: [
    CommonModule,
    DprViewRoutingModule, MaterialModule, SharedModule
  ]
})
export class DprViewModule { }
