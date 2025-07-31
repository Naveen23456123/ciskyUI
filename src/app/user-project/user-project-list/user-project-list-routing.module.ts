import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProjectListComponent } from './user-project-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddUserProjectComponent } from '../add-user-project/add-user-project.component';
import { EditUserProjectComponent } from '../edit-user-project/edit-user-project.component';
import { DeleteUserProjectComponent } from '../delete-user-project/delete-user-project.component';

const routes: Routes = [
  {
    path:'',
    component:UserProjectListComponent,
    data:{title:extractTitle('User(s)')},
    children: [
      {
        path: 'create',
        component: AddUserProjectComponent,
        loadChildren:()=>import('app/user-project/add-user-project/add-user-project.module').then(x=>x.AddUserProjectModule),
        data:{pageGuid:'680dd2933682904bdd6e9ab9',type:'add'}
      },
      {
        path: 'edit/:userId',
        component: EditUserProjectComponent,
        loadChildren:()=>import('app/user-project/edit-user-project/edit-user-project.module').then(x=>x.EditUserProjectModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:userId',
        component: DeleteUserProjectComponent,
        loadChildren:()=>import('app/user-project/delete-user-project/delete-user-project.module').then(x=>x.DeleteUserProjectModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProjectListRoutingModule { }
