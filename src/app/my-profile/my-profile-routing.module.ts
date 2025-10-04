import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile.component';
import { extractTitle } from '@app/core/i18n.service';

const routes: Routes = [
  {
    path:'',
    component:MyProfileComponent,
    data:{title:extractTitle('Profile')}
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfileRoutingModule { }
