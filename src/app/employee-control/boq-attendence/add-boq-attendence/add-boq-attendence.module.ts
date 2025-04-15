import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBoqAttendenceRoutingModule } from './add-boq-attendence-routing.module';
import { AddBoqAttendenceComponent } from './add-boq-attendence.component';


@NgModule({
  declarations: [
    AddBoqAttendenceComponent
  ],
  imports: [
    CommonModule,
    AddBoqAttendenceRoutingModule
  ]
})
export class AddBoqAttendenceModule { }
