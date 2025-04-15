import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoqAttendenceListComponent } from './boq-attendence-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddBoqAttendenceComponent } from '../add-boq-attendence/add-boq-attendence.component';
import { EditBoqAttendenceComponent } from '../edit-boq-attendence/edit-boq-attendence.component';
import { DeleteBoqAttendenceComponent } from '../delete-boq-attendence/delete-boq-attendence.component';

const routes: Routes = [
  {
    path:'',
    component:BoqAttendenceListComponent,
    data:{title:extractTitle('BOQ Attendences')},
    children: [
      {
        path: 'create',
        component: AddBoqAttendenceComponent,
        loadChildren:()=>import('app/employee-control/boq-attendence/add-boq-attendence/add-boq-attendence.module').then(x=>x.AddBoqAttendenceModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:boqId',
        component: EditBoqAttendenceComponent,
        loadChildren:()=>import('app/employee-control/boq-attendence/edit-boq-attendence/edit-boq-attendence.module').then(x=>x.EditBoqAttendenceModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:boqId',
        component: DeleteBoqAttendenceComponent,
        loadChildren:()=>import('app/employee-control/boq-attendence/delete-boq-attendence/delete-boq-attendence.module').then(x=>x.DeleteBoqAttendenceModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoqAttendenceListRoutingModule { }
