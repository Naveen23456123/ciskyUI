import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleLogListComponent } from './vehicle-log-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddVehicleLogComponent } from '../add-vehicle-log/add-vehicle-log.component';
import { EditVehicleLogComponent } from '../edit-vehicle-log/edit-vehicle-log.component';
import { DeleteVehicleLogComponent } from '../delete-vehicle-log/delete-vehicle-log.component';
import { ViewVehicleLogComponent } from '../view-vehicle-log/view-vehicle-log.component';

const routes: Routes = [
  {
    path:'',
    component:VehicleLogListComponent,
    data:{title:extractTitle('Vehicle Logs')},
    children: [
      {
        path: 'create',
        component: AddVehicleLogComponent,
        loadChildren:()=>import('app/vehicle-control/vehicle-log/add-vehicle-log/add-vehicle-log.module').then(x=>x.AddVehicleLogModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:vehlogId',
        component: EditVehicleLogComponent,
        loadChildren:()=>import('app/vehicle-control/vehicle-log/edit-vehicle-log/edit-vehicle-log.module').then(x=>x.EditVehicleLogModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:vehlogId',
        component: DeleteVehicleLogComponent,
        loadChildren:()=>import('app/vehicle-control/vehicle-log/delete-vehicle-log/delete-vehicle-log.module').then(x=>x.DeleteVehicleLogModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  },
  {
    path: 'view/:vehlogId',
    component: ViewVehicleLogComponent,
    loadChildren:()=>import('app/vehicle-control/vehicle-log/view-vehicle-log/view-vehicle-log.module').then(x=>x.ViewVehicleLogModule),
    data:{title:extractTitle('Vehicle Logs'),pageGuid:'',type:'view'}
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleLogListRoutingModule { }
