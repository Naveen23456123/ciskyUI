import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddActualAttendenceRoutingModule } from './add-actual-attendence-routing.module';
import { AddActualAttendenceComponent } from './add-actual-attendence.component';


@NgModule({
  declarations: [
    AddActualAttendenceComponent
  ],
  imports: [
    CommonModule,
    AddActualAttendenceRoutingModule
  ]
})
export class AddActualAttendenceModule { }
