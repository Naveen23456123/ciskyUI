import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Shell } from './shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'dashboard',
      loadChildren: () => import('app/dashboard/dashboard.module').then(x => x.DashboardModule),
      data: { pageGuid: '', roles: [] }
    },
    {
      path: 'projects',
      loadChildren: () => import('app/projects/project-list/project-list.module').then(x => x.ProjectListModule),
      data: { pageGuid: '', roles: [] }
    },
    {
      path: 'explore',
      loadChildren:()=>import('app/explore/explore.module').then(x=>x.ExploreModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'sub-company',
      loadChildren:()=>import('app/site-control/sub-company/sub-company-list/sub-company-list.module').then(x=>x.SubCompanyListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'department',
      loadChildren:()=>import('app/site-control/department/department-list/department-list.module').then(x=>x.DepartmentListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'designation',
      loadChildren:()=>import('app/site-control/designation/designation-list/designation-list.module').then(x=>x.DesignationListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'con-account',
      loadChildren:()=>import('app/site-control/consultant-account/consultant-account-list/consultant-account-list.module').then(x=>x.ConsultantAccountListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'items',
      loadChildren:()=>import('app/inventory-control/items/item-list/item-list.module').then(x=>x.ItemListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'inventory',
      loadChildren:()=>import('app/inventory-control/site-inventory/inventory-list/inventory-list.module').then(x=>x.InventoryListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'employees',
      loadChildren:()=>import('app/employee-control/employees/employee-list/employee-list.module').then(x=>x.EmployeeListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'vehicles',
      loadChildren:()=>import('app/vehicle-control/vehicle/vehicle-list/vehicle-list.module').then(x=>x.VehicleListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'vehicle-log',
      loadChildren:()=>import('app/vehicle-control/vehicle-log/vehicle-log-list/vehicle-log-list.module').then(x=>x.VehicleLogListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'vehicle-billing',
      loadChildren:()=>import('app/vehicle-control/vehicle-billing/vehicle-billing-list/vehicle-billing-list.module').then(x=>x.VehicleBillingListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'boq-attendence',
      loadChildren:()=>import('app/employee-control/boq-attendence/boq-attendence-list/boq-attendence-list.module').then(x=>x.BoqAttendenceListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'letters',
      loadChildren:()=>import('app/letter-control/letter-list/letter-list.module').then(x=>x.LetterListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'circular',
      loadChildren:()=>import('app/circular/circular-list/circular-list.module').then(x=>x.CircularListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'invoice',
      loadChildren:()=>import('app/payments/invoice/invoice-list/invoice-list.module').then(x=>x.InvoiceListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'boq-list',
      loadChildren:()=>import('app/payments/boq/boq-list/boq-list.module').then(x=>x.BoqListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'boq-invoice',
      loadChildren:()=>import('app/invoice-control/boq-invoice/boq-invoice.module').then(x=>x.BoqInvoiceModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'consultancy-invoice',
      loadChildren:()=>import('app/invoice-control/consultancy-invoice/consultancy-invoice.module').then(x=>x.ConsultancyInvoiceModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'profit-loss-details',
      loadChildren:()=>import('app/profit-loss/profit-loss-details/profit-loss-details.module').then(x=>x.ProfitLossDetailsModule),
      data:{pageGuid:'',type:'view'}
    }, 
    {
      path: 'ofc-rent',
      loadChildren:()=>import('app/office-rent/office-rent-list/office-rent-list.module').then(x=>x.OfficeRentListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'profit-loss',
      loadChildren:()=>import('app/profit-loss/profit-loss-list/profit-loss-list.module').then(x=>x.ProfitLossListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'ticket',
      loadChildren:()=>import('app/ticket-control/ticket-list/ticket-list.module').then(x=>x.TicketListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'imperest',
      loadChildren:()=>import('app/siteops-fund/imperest/imperest-list/imperest-list.module').then(x=>x.ImperestListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'expense',
      loadChildren:()=>import('app/siteops-fund/expense/expense-list/expense-list.module').then(x=>x.ExpenseListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'approval',
      loadChildren:()=>import('app/settings/approval/approval-list/approval-list.module').then(x=>x.ApprovalListModule),
      data:{pageGuid:'',type:'view'}
    },
  ]),
  // { path: 'login', loadChildren: () => import('app/login/login.module').then(x => x.LoginModule) },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
