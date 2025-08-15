import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Shell } from './shell/shell.service';
import { authGuard } from './shared/guards/auth.guard';

function protectRoutes(routes: Routes): Routes {
  return routes.map(route => ({
    ...route,
    canActivate: [authGuard],
    children: route.children ? protectRoutes(route.children) : undefined
  }));
}

const baseroutes: Routes = [
  Shell.childRoutes([
    {
      path: 'dashboard',
      loadChildren: () => import('app/dashboard/dashboard.module').then(x => x.DashboardModule),
      data: { pageGuid: '', roles: [] }
    },
    {
      path: 'dashboard-test',
      loadChildren: () => import('app/dashboard-test/dashboard-test.module').then(x => x.DashboardTestModule),
      data: { pageGuid: '', roles: [] }
    },
    {
      path: 'projects',
      loadChildren: () => import('app/projects/project-list/project-list.module').then(x => x.ProjectListModule),
      data: { pageGuid: '680dd1bd3682904bdd6e9ad2', roles: [] }
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
    {
      path: 'ofc-billing',
      loadChildren:()=>import('app/siteops-fund/ofc-rent-billing/ofc-rent-billing-list/ofc-rent-billing-list.module').then(x=>x.OfcRentBillingListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'ofc-billing-request',
      loadChildren:()=>import('app/requests/office-billing/office-billing-list/office-billing-list.module').then(x=>x.OfficeBillingListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'imperest-billing-request',
      loadChildren:()=>import('app/requests/imperest-billing/imperest-billing-list/imperest-billing-list.module').then(x=>x.ImperestBillingListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'veh-billing-request',
      loadChildren:()=>import('app/requests/veh-billing-req/veh-billing-req-list/veh-billing-req-list.module').then(x=>x.VehBillingReqListModule),
      data:{pageGuid:'',type:'view'}
    },
     {
      path: 'exp-billing-request',
      loadChildren:()=>import('app/requests/exp-billing-req/exp-req-billing-list/exp-req-billing-list.module').then(x=>x.ExpReqBillingListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'user-project',
      loadChildren:()=>import('app/user-project/user-project-list/user-project-list.module').then(x=>x.UserProjectListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'misc',
      loadChildren:()=>import('app/misc/misc-list/misc-list.module').then(x=>x.MiscListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'transport-list',
      loadChildren:()=>import('app/projects/transport-infra/transport-infra-list/transport-infra-list.module').then(x=>x.TransportInfraListModule),
      data:{pageGuid:'',type:'view'}
    },
    //{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
  ]),
  // { path: 'login', loadChildren: () => import('app/login/login.module').then(x => x.LoginModule) },
  
];
const routes: Routes = protectRoutes(baseroutes);
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
