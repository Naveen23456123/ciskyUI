import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeRentListComponent } from './office-rent-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddOfficeRentComponent } from '../add-office-rent/add-office-rent.component';
import { EditOfficeRentComponent } from '../edit-office-rent/edit-office-rent.component';
import { DeleteOfficeRentComponent } from '../delete-office-rent/delete-office-rent.component';

const routes: Routes = [
  {
    path:'',
    component:OfficeRentListComponent,
    data:{title:extractTitle('Office Rent')},
    children: [
      {
        path: 'create',
        component: AddOfficeRentComponent,
        loadChildren:()=>import('app/office-rent/add-office-rent/add-office-rent.module').then(x=>x.AddOfficeRentModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:ofcId',
        component: EditOfficeRentComponent,
        loadChildren:()=>import('app/office-rent/edit-office-rent/edit-office-rent.module').then(x=>x.EditOfficeRentModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:ofcId',
        component: DeleteOfficeRentComponent,
        loadChildren:()=>import('app/office-rent/delete-office-rent/delete-office-rent.module').then(x=>x.DeleteOfficeRentModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRentListRoutingModule { }
