import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditOfficeRentRoutingModule } from './edit-office-rent-routing.module';
import { EditOfficeRentComponent } from './edit-office-rent.component';


@NgModule({
  declarations: [
    EditOfficeRentComponent
  ],
  imports: [
    CommonModule,
    EditOfficeRentRoutingModule
  ]
})
export class EditOfficeRentModule { }
