import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditActualAttendenceRoutingModule } from './edit-actual-attendence-routing.module';
import { EditActualAttendenceComponent } from './edit-actual-attendence.component';


@NgModule({
  declarations: [
    EditActualAttendenceComponent
  ],
  imports: [
    CommonModule,
    EditActualAttendenceRoutingModule
  ]
})
export class EditActualAttendenceModule { }
