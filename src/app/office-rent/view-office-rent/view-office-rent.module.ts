import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewOfficeRentRoutingModule } from './view-office-rent-routing.module';
import { ViewOfficeRentComponent } from './view-office-rent.component';


@NgModule({
  declarations: [
    ViewOfficeRentComponent
  ],
  imports: [
    CommonModule,
    ViewOfficeRentRoutingModule
  ]
})
export class ViewOfficeRentModule { }
