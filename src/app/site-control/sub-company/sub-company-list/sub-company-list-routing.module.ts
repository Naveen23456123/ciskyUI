import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubCompanyListComponent } from './sub-company-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddSubCompanyComponent } from '../add-sub-company/add-sub-company.component';
import { EditSubCompanyComponent } from '../edit-sub-company/edit-sub-company.component';
import { DeleteSubCompanyComponent } from '../delete-sub-company/delete-sub-company.component';

const routes: Routes = [
  {
    path:'',
    component:SubCompanyListComponent,
    data:{title:extractTitle('Sub Companies')},
    children: [
      {
        path: 'create',
        component: AddSubCompanyComponent,
        loadChildren:()=>import('app/site-control/sub-company/add-sub-company/add-sub-company.module').then(x=>x.AddSubCompanyModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:comId',
        component: EditSubCompanyComponent,
        loadChildren:()=>import('app/site-control/sub-company/edit-sub-company/edit-sub-company.module').then(x=>x.EditSubCompanyModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:comId',
        component: DeleteSubCompanyComponent,
        loadChildren:()=>import('app/site-control/sub-company/delete-sub-company/delete-sub-company.module').then(x=>x.DeleteSubCompanyModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCompanyListRoutingModule { }
