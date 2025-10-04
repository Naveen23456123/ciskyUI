import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewImperestRoutingModule } from './view-imperest-routing.module';
import { ViewImperestComponent } from './view-imperest.component';


@NgModule({
  declarations: [
    ViewImperestComponent
  ],
  imports: [
    CommonModule,
    ViewImperestRoutingModule
  ]
})
export class ViewImperestModule { }
