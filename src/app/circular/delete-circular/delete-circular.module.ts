import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteCircularRoutingModule } from './delete-circular-routing.module';
import { DeleteCircularComponent } from './delete-circular.component';


@NgModule({
  declarations: [
    DeleteCircularComponent
  ],
  imports: [
    CommonModule,
    DeleteCircularRoutingModule
  ]
})
export class DeleteCircularModule { }
