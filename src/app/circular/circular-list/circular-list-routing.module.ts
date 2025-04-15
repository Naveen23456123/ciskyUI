import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircularListComponent } from './circular-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddCircularComponent } from '../add-circular/add-circular.component';
import { EditCircularComponent } from '../edit-circular/edit-circular.component';
import { DeleteCircularComponent } from '../delete-circular/delete-circular.component';

const routes: Routes = [
  {
    path:'',
    component:CircularListComponent,
    data:{title:extractTitle('Circulars')},
    children: [
      {
        path: 'create',
        component: AddCircularComponent,
        loadChildren:()=>import('app/circular/add-circular/add-circular.module').then(x=>x.AddCircularModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:cirId',
        component: EditCircularComponent,
        loadChildren:()=>import('app/circular/edit-circular/edit-circular.module').then(x=>x.EditCircularModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:cirId',
        component: DeleteCircularComponent,
        loadChildren:()=>import('app/circular/delete-circular/delete-circular.module').then(x=>x.DeleteCircularModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CircularListRoutingModule { }
