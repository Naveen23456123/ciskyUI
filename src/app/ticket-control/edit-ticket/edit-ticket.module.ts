import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditTicketRoutingModule } from './edit-ticket-routing.module';
import { EditTicketComponent } from './edit-ticket.component';


@NgModule({
  declarations: [
    EditTicketComponent
  ],
  imports: [
    CommonModule,
    EditTicketRoutingModule
  ]
})
export class EditTicketModule { }
