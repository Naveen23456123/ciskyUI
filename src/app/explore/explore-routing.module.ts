import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore.component';
import { extractTitle } from '@app/core/i18n.service';

const routes: Routes = [
  {
      path:'',
      component:ExploreComponent,
      data:{title:extractTitle('Explore')},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreRoutingModule { }
