import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfitLossListComponent } from './profit-loss-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { ProfitLossDetailsComponent } from '../profit-loss-details/profit-loss-details.component';
import { AddRevenueOperationComponent } from '../profit-loss-details/revenue-operation/add-revenue-operation/add-revenue-operation.component';
import { AddProfitLossComponent } from '../add-profit-loss/add-profit-loss.component';

const routes: Routes = [
  {
    path:'',
    component:ProfitLossListComponent,
    data:{title:extractTitle('Profit & Loss')},  
    children: [
        {
          path: 'create',
          component: AddProfitLossComponent,
          loadChildren:()=>import('app/profit-loss/add-profit-loss/add-profit-loss.module').then(x=>x.AddProfitLossModule),
          data:{pageGuid:'',type:'add'}
        }
      ]  
  }, 
  {
    path: 'pl-details',
    component: ProfitLossDetailsComponent,
    loadChildren:()=>import('app/profit-loss/profit-loss-details/profit-loss-details.module').then(x=>x.ProfitLossDetailsModule),
    data:{pageGuid:'',type:'add'}
  }, 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfitLossListRoutingModule { }
