import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteDesignationRoutingModule } from './delete-designation-routing.module';
import { DeleteDesignationComponent } from './delete-designation.component';


@NgModule({
  declarations: [
    DeleteDesignationComponent
  ],
  imports: [
    CommonModule,
    DeleteDesignationRoutingModule
  ]
})
export class DeleteDesignationModule { }
