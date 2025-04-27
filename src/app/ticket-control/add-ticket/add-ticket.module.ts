import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTicketRoutingModule } from './add-ticket-routing.module';
import { AddTicketComponent } from './add-ticket.component';


@NgModule({
  declarations: [
    AddTicketComponent
  ],
  imports: [
    CommonModule,
    AddTicketRoutingModule
  ]
})
export class AddTicketModule { }
