import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketListRoutingModule } from './ticket-list-routing.module';
import { TicketListComponent } from './ticket-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    TicketListComponent
  ],
  imports: [
    CommonModule,
    TicketListRoutingModule, SharedModule,MaterialModule
  ]
})
export class TicketListModule { }
