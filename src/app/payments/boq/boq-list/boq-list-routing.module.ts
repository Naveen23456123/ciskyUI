import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoqListComponent } from './boq-list.component';
import { extractTitle } from '@app/core/i18n.service';

const routes: Routes = [
  {
    path:'',
    component:BoqListComponent,
    data:{title:extractTitle('BOQ List')},
   
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoqListRoutingModule { }
