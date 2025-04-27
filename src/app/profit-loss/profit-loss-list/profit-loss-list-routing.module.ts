import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfitLossListComponent } from './profit-loss-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { ProfitLossDetailsComponent } from '../profit-loss-details/profit-loss-details.component';
import { AddRevenueOperationComponent } from '../profit-loss-details/revenue-operation/add-revenue-operation/add-revenue-operation.component';

const routes: Routes = [
  {
    path:'',
    component:ProfitLossListComponent,
    data:{title:extractTitle('Profit & Loss')},    
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfitLossListRoutingModule { }
