import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalListComponent } from './approval-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddApprovalComponent } from '../add-approval/add-approval.component';
import { EditApprovalComponent } from '../edit-approval/edit-approval.component';
import { DeleteApprovalComponent } from '../delete-approval/delete-approval.component';

const routes: Routes = [
  {
    path:'',
    component:ApprovalListComponent,
    data:{title:extractTitle('Approval(s)')},
    children: [
      {
        path: 'create',
        component: AddApprovalComponent,
        loadChildren:()=>import('app/settings/approval/add-approval/add-approval.module').then(x=>x.AddApprovalModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:aprId',
        component: EditApprovalComponent,
        loadChildren:()=>import('app/settings/approval/edit-approval/edit-approval.module').then(x=>x.EditApprovalModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:aprId',
        component: DeleteApprovalComponent,
        loadChildren:()=>import('app/settings/approval/delete-approval/delete-approval.module').then(x=>x.DeleteApprovalModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalListRoutingModule { }
