import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { extractTitle } from '@app/core/i18n.service';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    data:{title:extractTitle('Dashboard')}
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
