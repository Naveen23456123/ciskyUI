import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOfficeRentRoutingModule } from './add-office-rent-routing.module';
import { AddOfficeRentComponent } from './add-office-rent.component';


@NgModule({
  declarations: [
    AddOfficeRentComponent
  ],
  imports: [
    CommonModule,
    AddOfficeRentRoutingModule
  ]
})
export class AddOfficeRentModule { }
