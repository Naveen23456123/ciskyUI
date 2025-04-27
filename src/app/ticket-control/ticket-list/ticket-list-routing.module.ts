import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';
import { DeleteTicketComponent } from '../delete-ticket/delete-ticket.component';

const routes: Routes = [
  {
    path:'',
    component:TicketListComponent,
    data:{title:extractTitle('Tickets')},
    children: [
      {
        path: 'create',
        component: AddTicketComponent,
        loadChildren:()=>import('app/ticket-control/add-ticket/add-ticket.module').then(x=>x.AddTicketModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:ticId',
        component: EditTicketComponent,
        loadChildren:()=>import('app/ticket-control/edit-ticket/edit-ticket.module').then(x=>x.EditTicketModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:ticId',
        component: DeleteTicketComponent,
        loadChildren:()=>import('app/ticket-control/delete-ticket/delete-ticket.module').then(x=>x.DeleteTicketModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketListRoutingModule { }
