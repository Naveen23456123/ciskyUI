import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignationListComponent } from './designation-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddDesignationComponent } from '../add-designation/add-designation.component';
import { EditDesignationComponent } from '../edit-designation/edit-designation.component';
import { DeleteDesignationComponent } from '../delete-designation/delete-designation.component';
import { UploadDesgComponent } from '../upload-desg/upload-desg.component';

const routes: Routes = [
  {
    path:'',
    component:DesignationListComponent,
    data:{title:extractTitle('Designations')},
    children: [
      {
        path: 'create',
        component: AddDesignationComponent,
        loadChildren:()=>import('app/site-control/designation/add-designation/add-designation.module').then(x=>x.AddDesignationModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:desgId',
        component: EditDesignationComponent,
        loadChildren:()=>import('app/site-control/designation/edit-designation/edit-designation.module').then(x=>x.EditDesignationModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:desgId',
        component: DeleteDesignationComponent,
        loadChildren:()=>import('app/site-control/designation/delete-designation/delete-designation.module').then(x=>x.DeleteDesignationModule),
        data:{pageGuid:'',type:'delete'}
      },
      {
        path: 'upload-desg',
        component: UploadDesgComponent,
        loadChildren:()=>import('app/site-control/designation/upload-desg/upload-desg.module').then(x=>x.UploadDesgModule),
        data:{pageGuid:'',type:'upload'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationListRoutingModule { }
