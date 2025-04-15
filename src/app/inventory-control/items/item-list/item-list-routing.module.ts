import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './item-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddItemComponent } from '../add-item/add-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { DeleteItemComponent } from '../delete-item/delete-item.component';

const routes: Routes = [
  {
    path:'',
    component:ItemListComponent,
    data:{title:extractTitle('Items')},
    children: [
      {
        path: 'create',
        component: AddItemComponent,
        loadChildren:()=>import('app/inventory-control/items/add-item/add-item.module').then(x=>x.AddItemModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:invId',
        component: EditItemComponent,
        loadChildren:()=>import('app/inventory-control/items/edit-item/edit-item.module').then(x=>x.EditItemModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:invId',
        component: DeleteItemComponent,
        loadChildren:()=>import('app/inventory-control/items/delete-item/delete-item.module').then(x=>x.DeleteItemModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemListRoutingModule { }
