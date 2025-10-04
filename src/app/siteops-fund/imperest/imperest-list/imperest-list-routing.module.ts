import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImperestListComponent } from './imperest-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddImperestComponent } from '../add-imperest/add-imperest.component';
import { EditImperestComponent } from '../edit-imperest/edit-imperest.component';
import { DeleteImperestComponent } from '../delete-imperest/delete-imperest.component';
import { ViewImperestComponent } from '../view-imperest/view-imperest.component';

const routes: Routes = [
  {
    path:'',
    component:ImperestListComponent,
    data:{title:extractTitle('Imperests')},
    children: [
      {
        path: 'create',
        component: AddImperestComponent,
        loadChildren:()=>import('app/siteops-fund/imperest/add-imperest/add-imperest.module').then(x=>x.AddImperestModule),
        data:{pageGuid:'680dd2733682904bdd6e9afb',type:'add'}
      },
      {
        path: 'edit/:impId',
        component: EditImperestComponent,
        loadChildren:()=>import('app/siteops-fund/imperest/edit-imperest/edit-imperest.module').then(x=>x.EditImperestModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:impId',
        component: DeleteImperestComponent,
        loadChildren:()=>import('app/siteops-fund/imperest/delete-imperest/delete-imperest.module').then(x=>x.DeleteImperestModule),
        data:{pageGuid:'',type:'delete'}
      },
      {
        path: 'view/:impId',
        component: ViewImperestComponent,
        loadChildren:()=>import('app/siteops-fund/imperest/view-imperest/view-imperest.module').then(x=>x.ViewImperestModule),
        data:{pageGuid:'',type:'view'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImperestListRoutingModule { }
