import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBoqAttendenceRoutingModule } from './edit-boq-attendence-routing.module';
import { EditBoqAttendenceComponent } from './edit-boq-attendence.component';


@NgModule({
  declarations: [
    EditBoqAttendenceComponent
  ],
  imports: [
    CommonModule,
    EditBoqAttendenceRoutingModule
  ]
})
export class EditBoqAttendenceModule { }
