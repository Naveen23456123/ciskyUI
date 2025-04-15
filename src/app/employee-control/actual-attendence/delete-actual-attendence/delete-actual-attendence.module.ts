import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteActualAttendenceRoutingModule } from './delete-actual-attendence-routing.module';
import { DeleteActualAttendenceComponent } from './delete-actual-attendence.component';


@NgModule({
  declarations: [
    DeleteActualAttendenceComponent
  ],
  imports: [
    CommonModule,
    DeleteActualAttendenceRoutingModule
  ]
})
export class DeleteActualAttendenceModule { }
