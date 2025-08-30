import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPermissionListComponent } from './app-permission-list.component';
import { extractTitle } from '@app/core/i18n.service';

const routes: Routes = [
   {
      path:'',
      component:AppPermissionListComponent,
      data:{title:extractTitle('Permission(s)')},
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPermissionListRoutingModule { }
