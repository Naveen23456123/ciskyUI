import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleListComponent } from './vehicle-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from '../edit-vehicle/edit-vehicle.component';
import { DeleteVehicleComponent } from '../delete-vehicle/delete-vehicle.component';

const routes: Routes = [
  {
    path:'',
    component:VehicleListComponent,
    data:{title:extractTitle('Vehicles')},
    children: [
      {
        path: 'create',
        component: AddVehicleComponent,
        loadChildren:()=>import('app/vehicle-control/vehicle/add-vehicle/add-vehicle.module').then(x=>x.AddVehicleModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:vehId',
        component: EditVehicleComponent,
        loadChildren:()=>import('app/vehicle-control/vehicle/edit-vehicle/edit-vehicle.module').then(x=>x.EditVehicleModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:vehId',
        component: DeleteVehicleComponent,
        loadChildren:()=>import('app/vehicle-control/vehicle/delete-vehicle/delete-vehicle.module').then(x=>x.DeleteVehicleModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleListRoutingModule { }
