import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './department-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';
import { DeleteDepartmentComponent } from '../delete-department/delete-department.component';
import { UploadDeptComponent } from '../upload-dept/upload-dept.component';

const routes: Routes = [
  {
    path:'',
    component:DepartmentListComponent,
    data:{title:extractTitle('Departments')},
    children: [
      {
        path: 'create',
        component: AddDepartmentComponent,
        loadChildren:()=>import('app/site-control/department/add-department/add-department.module').then(x=>x.AddDepartmentModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:deptId',
        component: EditDepartmentComponent,
        loadChildren:()=>import('app/site-control/department/edit-department/edit-department.module').then(x=>x.EditDepartmentModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:deptId',
        component: DeleteDepartmentComponent,
        loadChildren:()=>import('app/site-control/department/delete-department/delete-department.module').then(x=>x.DeleteDepartmentModule),
        data:{pageGuid:'',type:'delete'}
      },
      {
        path: 'upload-dept',
        component: UploadDeptComponent,
        loadChildren:()=>import('app/site-control/department/upload-dept/upload-dept.module').then(x=>x.UploadDeptModule),
        data:{pageGuid:'',type:'upload'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentListRoutingModule { }
