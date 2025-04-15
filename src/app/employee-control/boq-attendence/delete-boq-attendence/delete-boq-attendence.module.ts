import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteBoqAttendenceRoutingModule } from './delete-boq-attendence-routing.module';
import { DeleteBoqAttendenceComponent } from './delete-boq-attendence.component';


@NgModule({
  declarations: [
    DeleteBoqAttendenceComponent
  ],
  imports: [
    CommonModule,
    DeleteBoqAttendenceRoutingModule
  ]
})
export class DeleteBoqAttendenceModule { }
