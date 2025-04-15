import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActualAttendenceListRoutingModule } from './actual-attendence-list-routing.module';
import { ActualAttendenceListComponent } from './actual-attendence-list.component';


@NgModule({
  declarations: [
    ActualAttendenceListComponent
  ],
  imports: [
    CommonModule,
    ActualAttendenceListRoutingModule
  ]
})
export class ActualAttendenceListModule { }
