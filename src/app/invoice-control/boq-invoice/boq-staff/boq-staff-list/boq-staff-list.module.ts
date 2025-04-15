import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoqStaffListRoutingModule } from './boq-staff-list-routing.module';
import { BoqStaffListComponent } from './boq-staff-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [BoqStaffListComponent],
  imports: [
    CommonModule,
    BoqStaffListRoutingModule, SharedModule, MaterialModule
  ],
  exports:[BoqStaffListComponent]
})
export class BoqStaffListModule { }
