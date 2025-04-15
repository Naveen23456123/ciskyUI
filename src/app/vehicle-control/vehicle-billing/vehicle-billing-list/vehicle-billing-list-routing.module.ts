import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleBillingListComponent } from './vehicle-billing-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddVehicleBillingComponent } from '../add-vehicle-billing/add-vehicle-billing.component';
import { EditVehicleBillingComponent } from '../edit-vehicle-billing/edit-vehicle-billing.component';
import { DeleteVehicleBillingComponent } from '../delete-vehicle-billing/delete-vehicle-billing.component';

const routes: Routes = [
  {
    path:'',
    component:VehicleBillingListComponent,
    data:{title:extractTitle('Vehicle Billings')},
    children: [
      {
        path: 'create',
        component: AddVehicleBillingComponent,
        loadChildren:()=>import('app/vehicle-control/vehicle-billing/add-vehicle-billing/add-vehicle-billing.module').then(x=>x.AddVehicleBillingModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:vehbilId',
        component: EditVehicleBillingComponent,
        loadChildren:()=>import('app/vehicle-control/vehicle-billing/edit-vehicle-billing/edit-vehicle-billing.module').then(x=>x.EditVehicleBillingModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:vehbilId',
        component: DeleteVehicleBillingComponent,
        loadChildren:()=>import('app/vehicle-control/vehicle-billing/delete-vehicle-billing/delete-vehicle-billing.module').then(x=>x.DeleteVehicleBillingModule),
        data:{pageGuid:'',type:'delete'}
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleBillingListRoutingModule { }
