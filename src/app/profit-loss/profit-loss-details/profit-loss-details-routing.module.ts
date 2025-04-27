import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfitLossDetailsComponent } from './profit-loss-details.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddRevenueOperationComponent } from './revenue-operation/add-revenue-operation/add-revenue-operation.component';
import { AddEmpBenefitExpenseComponent } from './emp-benefit/add-emp-benefit-expense/add-emp-benefit-expense.component';
import { EditRevenueOperationComponent } from './revenue-operation/edit-revenue-operation/edit-revenue-operation.component';
import { DeleteRevenueOperationComponent } from './revenue-operation/delete-revenue-operation/delete-revenue-operation.component';
import { EditEmpBenefitExpenseComponent } from './emp-benefit/edit-emp-benefit-expense/edit-emp-benefit-expense.component';
import { DeleteEmpBenefitExpenseComponent } from './emp-benefit/delete-emp-benefit-expense/delete-emp-benefit-expense.component';
import { AddOtherIncomeComponent } from './other-income/add-other-income/add-other-income.component';
import { EditOfficeRentComponent } from '@app/office-rent/edit-office-rent/edit-office-rent.component';
import { DeleteOtherIncomeComponent } from './other-income/delete-other-income/delete-other-income.component';
import { EditOtherIncomeComponent } from './other-income/edit-other-income/edit-other-income.component';
import { AddFinanceCostComponent } from './finance-cost/add-finance-cost/add-finance-cost.component';
import { EditFinanceCostComponent } from './finance-cost/edit-finance-cost/edit-finance-cost.component';
import { DeleteFinanceCostComponent } from './finance-cost/delete-finance-cost/delete-finance-cost.component';

const routes: Routes = [
  {
      path: '',
      component: ProfitLossDetailsComponent,     
      data:{pageGuid:'',type:'add',title:extractTitle('Profit & Loss Sheet')},
      children: [
        {
          path: 'rv-create',
          component: AddRevenueOperationComponent,
          loadChildren:()=>import('app/profit-loss/profit-loss-details/revenue-operation/add-revenue-operation/add-revenue-operation.module').then(x=>x.AddRevenueOperationModule),
          data:{pageGuid:'',type:'add'}
        },
        {
          path: 'rv-edit',
          component: EditRevenueOperationComponent,
          loadChildren:()=>import('app/profit-loss/profit-loss-details/revenue-operation/edit-revenue-operation/edit-revenue-operation.module').then(x=>x.EditRevenueOperationModule),
          data:{pageGuid:'',type:'edit'}
        },
        {
          path: 'rv-delete',
          component: DeleteRevenueOperationComponent,
          loadChildren:()=>import('app/profit-loss/profit-loss-details/revenue-operation/delete-revenue-operation/delete-revenue-operation.module').then(x=>x.DeleteRevenueOperationModule),
          data:{pageGuid:'',type:'delete'}
        },
        {
          path: 'emp-ben-create',
          component: AddEmpBenefitExpenseComponent,
          loadChildren:()=>import('app/profit-loss/profit-loss-details/emp-benefit/add-emp-benefit-expense/add-emp-benefit-expense.module').then(x=>x.AddEmpBenefitExpenseModule),
          data:{pageGuid:'',type:'add'}
        },
        {
          path: 'emp-ben-edit',
          component: EditEmpBenefitExpenseComponent,
          loadChildren:()=>import('app/profit-loss/profit-loss-details/emp-benefit/edit-emp-benefit-expense/edit-emp-benefit-expense.module').then(x=>x.EditEmpBenefitExpenseModule),
          data:{pageGuid:'',type:'edit'}
        },
        {
          path: 'emp-ben-delete',
          component: DeleteEmpBenefitExpenseComponent,
          loadChildren:()=>import('app/profit-loss/profit-loss-details/emp-benefit/delete-emp-benefit-expense/delete-emp-benefit-expense.module').then(x=>x.DeleteEmpBenefitExpenseModule),
          data:{pageGuid:'',type:'delete'}
        },
        {
          path: 'oi-create',
          component: AddOtherIncomeComponent,
          loadChildren:()=>import('app/profit-loss/profit-loss-details/other-income/add-other-income/add-other-income.module').then(x=>x.AddOtherIncomeModule),
          data:{pageGuid:'',type:'add'}
        },
        {
          path: 'oi-edit',
          component: EditOtherIncomeComponent,
          loadChildren:()=>import('app/profit-loss/profit-loss-details/other-income/edit-other-income/edit-other-income.module').then(x=>x.EditOtherIncomeModule),
          data:{pageGuid:'',type:'edit'}
        },
        {
          path: 'oi-delete',
          component: DeleteOtherIncomeComponent,
          loadChildren:()=>import('app/profit-loss/profit-loss-details/other-income/delete-other-income/delete-other-income.module').then(x=>x.DeleteOtherIncomeModule),
          data:{pageGuid:'',type:'delete'}
        },
        {
          path: 'fc-create',
          component: AddFinanceCostComponent,
          loadChildren:()=>import('app/profit-loss/profit-loss-details/finance-cost/add-finance-cost/add-finance-cost.module').then(x=>x.AddFinanceCostModule),
          data:{pageGuid:'',type:'add'}
        },
        {
          path: 'fc-edit',
          component: EditFinanceCostComponent,
          loadChildren:()=>import('app/profit-loss/profit-loss-details/finance-cost/edit-finance-cost/edit-finance-cost.module').then(x=>x.EditFinanceCostModule),
          data:{pageGuid:'',type:'edit'}
        },
        {
          path: 'fc-delete',
          component: DeleteFinanceCostComponent,
          loadChildren:()=>import('app/profit-loss/profit-loss-details/finance-cost/delete-finance-cost/delete-finance-cost.module').then(x=>x.DeleteFinanceCostModule),
          data:{pageGuid:'',type:'delete'}
        },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfitLossDetailsRoutingModule { }
