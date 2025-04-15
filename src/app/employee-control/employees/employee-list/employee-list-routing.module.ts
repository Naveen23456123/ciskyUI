import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { DetailsEmployeeComponent } from '../details-employee/details-employee.component';

const routes: Routes = [
  {
    path:'',
    component:EmployeeListComponent,
    data:{title:extractTitle('Employees')},
    children: [
      {
        path: 'create',
        component: AddEmployeeComponent,
        loadChildren:()=>import('app/employee-control/employees/add-employee/add-employee.module').then(x=>x.AddEmployeeModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:empId',
        component: EditEmployeeComponent,
        loadChildren:()=>import('app/employee-control/employees/edit-employee/edit-employee.module').then(x=>x.EditEmployeeModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:empId',
        component: DeleteEmployeeComponent,
        loadChildren:()=>import('app/employee-control/employees/delete-employee/delete-employee.module').then(x=>x.DeleteEmployeeModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  },
  {
    path: 'view/:empId',
    component: DetailsEmployeeComponent,
    loadChildren:()=>import('app/employee-control/employees/details-employee/details-employee.module').then(x=>x.DetailsEmployeeModule),
    data:{pageGuid:'',type:'view',title:extractTitle('Employee Details')}
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeListRoutingModule { }
