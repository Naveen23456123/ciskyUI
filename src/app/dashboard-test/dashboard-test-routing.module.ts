import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardTestComponent } from './dashboard-test.component';
import { extractTitle } from '@app/core/i18n.service';

const routes: Routes = [
  {
    path:'',
    component:DashboardTestComponent,
    data:{title:extractTitle('Dashboard Test')}
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardTestRoutingModule { }
