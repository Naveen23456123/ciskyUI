import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteImperestRoutingModule } from './delete-imperest-routing.module';
import { DeleteImperestComponent } from './delete-imperest.component';


@NgModule({
  declarations: [
    DeleteImperestComponent
  ],
  imports: [
    CommonModule,
    DeleteImperestRoutingModule
  ]
})
export class DeleteImperestModule { }
