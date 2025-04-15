import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultantAccountListComponent } from './consultant-account-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddConsultantAccountComponent } from '../add-consultant-account/add-consultant-account.component';
import { EditConsultantAccountComponent } from '../edit-consultant-account/edit-consultant-account.component';
import { DeleteConsultantAccountComponent } from '../delete-consultant-account/delete-consultant-account.component';

const routes: Routes = [
  {
    path:'',
    component:ConsultantAccountListComponent,
    data:{title:extractTitle('Accounts')},
    children: [
      {
        path: 'create',
        component: AddConsultantAccountComponent,
        loadChildren:()=>import('app/site-control/consultant-account/add-consultant-account/add-consultant-account.module').then(x=>x.AddConsultantAccountModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:accountId',
        component: EditConsultantAccountComponent,
        loadChildren:()=>import('app/site-control/consultant-account/edit-consultant-account/edit-consultant-account.module').then(x=>x.EditConsultantAccountModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:accountId',
        component: DeleteConsultantAccountComponent,
        loadChildren:()=>import('app/site-control/consultant-account/delete-consultant-account/delete-consultant-account.module').then(x=>x.DeleteConsultantAccountModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultantAccountListRoutingModule { }
