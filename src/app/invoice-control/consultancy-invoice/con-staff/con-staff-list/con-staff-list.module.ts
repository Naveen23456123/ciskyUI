import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConStaffListRoutingModule } from './con-staff-list-routing.module';
import { ConStaffListComponent } from './con-staff-list.component';


@NgModule({
  declarations: [
    ConStaffListComponent
  ],
  imports: [
    CommonModule,
    ConStaffListRoutingModule
  ]
})
export class ConStaffListModule { }
