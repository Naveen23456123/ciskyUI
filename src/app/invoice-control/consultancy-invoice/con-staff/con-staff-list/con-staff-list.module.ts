import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConStaffListRoutingModule } from './con-staff-list-routing.module';
import { ConStaffListComponent } from './con-staff-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ConStaffListComponent
  ],
  imports: [
    CommonModule,
    ConStaffListRoutingModule, SharedModule, MaterialModule
  ],
  exports:[ConStaffListComponent]
})
export class ConStaffListModule { }
