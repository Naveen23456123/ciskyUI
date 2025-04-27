import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteTicketRoutingModule } from './delete-ticket-routing.module';
import { DeleteTicketComponent } from './delete-ticket.component';


@NgModule({
  declarations: [
    DeleteTicketComponent
  ],
  imports: [
    CommonModule,
    DeleteTicketRoutingModule
  ]
})
export class DeleteTicketModule { }
