import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteOfficeRentRoutingModule } from './delete-office-rent-routing.module';
import { DeleteOfficeRentComponent } from './delete-office-rent.component';


@NgModule({
  declarations: [
    DeleteOfficeRentComponent
  ],
  imports: [
    CommonModule,
    DeleteOfficeRentRoutingModule
  ]
})
export class DeleteOfficeRentModule { }
