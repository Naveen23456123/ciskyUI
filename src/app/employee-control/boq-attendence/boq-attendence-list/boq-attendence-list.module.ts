import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoqAttendenceListRoutingModule } from './boq-attendence-list-routing.module';
import { BoqAttendenceListComponent } from './boq-attendence-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    BoqAttendenceListComponent
  ],
  imports: [
    CommonModule,
    BoqAttendenceListRoutingModule,SharedModule, MaterialModule
  ]
})
export class BoqAttendenceListModule { }
