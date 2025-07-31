import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiscListComponent } from './misc-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddMiscComponent } from '../add-misc/add-misc.component';
import { EditMiscComponent } from '../edit-misc/edit-misc.component';
import { DeleteMiscComponent } from '../delete-misc/delete-misc.component';

const routes: Routes = [
  {
    path:'',
    component:MiscListComponent,
    data:{title:extractTitle('Miscellaneous')},
    children: [
      {
        path: 'create',
        component: AddMiscComponent,
        loadChildren:()=>import('app/misc/add-misc/add-misc.module').then(x=>x.AddMiscModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:miscId',
        component: EditMiscComponent,
        loadChildren:()=>import('app/misc/edit-misc/edit-misc.module').then(x=>x.EditMiscModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:miscId',
        component: DeleteMiscComponent,
        loadChildren:()=>import('app/misc/delete-misc/delete-misc.module').then(x=>x.DeleteMiscModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscListRoutingModule { }
