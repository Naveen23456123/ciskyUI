import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignationListRoutingModule } from './designation-list-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { DesignationListComponent } from './designation-list.component';


@NgModule({
  declarations: [DesignationListComponent],
  imports: [
    CommonModule,
    DesignationListRoutingModule, SharedModule, MaterialModule
  ]
})
export class DesignationListModule { }
