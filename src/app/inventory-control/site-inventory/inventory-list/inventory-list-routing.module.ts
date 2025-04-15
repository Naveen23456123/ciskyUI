import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryListComponent } from './inventory-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddInventoryComponent } from '../add-inventory/add-inventory.component';
import { EditInventoryComponent } from '../edit-inventory/edit-inventory.component';
import { DeleteInventoryComponent } from '../delete-inventory/delete-inventory.component';

const routes: Routes = [
  {
    path:'',
    component:InventoryListComponent,
    data:{title:extractTitle('Inventories')},
    children: [
      {
        path: 'create',
        component: AddInventoryComponent,
        loadChildren:()=>import('app/inventory-control/site-inventory/add-inventory/add-inventory.module').then(x=>x.AddInventoryModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:invId',
        component: EditInventoryComponent,
        loadChildren:()=>import('app/inventory-control/site-inventory/edit-inventory/edit-inventory.module').then(x=>x.EditInventoryModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:invId',
        component: DeleteInventoryComponent,
        loadChildren:()=>import('app/inventory-control/site-inventory/delete-inventory/delete-inventory.module').then(x=>x.DeleteInventoryModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryListRoutingModule { }
