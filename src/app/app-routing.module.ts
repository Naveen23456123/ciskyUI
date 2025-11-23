import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Shell } from './shell/shell.service';
import { authGuard } from './shared/guards/auth.guard';
import { extractTitle } from './core/i18n.service';

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
      data:{pageGuid:'680dd2733682904bdd6e9aa4',type:'view'}
    },
    {
      path: 'department',
      loadChildren:()=>import('app/site-control/department/department-list/department-list.module').then(x=>x.DepartmentListModule),
      data:{pageGuid:'680dd2933682904bdd6e9aa6',type:'view'}
    },
    {
      path: 'designation',
      loadChildren:()=>import('app/site-control/designation/designation-list/designation-list.module').then(x=>x.DesignationListModule),
      data:{pageGuid:'680dd2933682904bdd6e9aa5',type:'view'}
    },
    {
      path: 'con-account',
      loadChildren:()=>import('app/site-control/consultant-account/consultant-account-list/consultant-account-list.module').then(x=>x.ConsultantAccountListModule),
      data:{pageGuid:'680dd2933682904bdd6e9aa7',type:'view'}
    },
    {
      path: 'items',
      loadChildren:()=>import('app/inventory-control/items/item-list/item-list.module').then(x=>x.ItemListModule),
      data:{pageGuid:'680dd2733682904bdd6e9ab4',type:'view'}
    },
    {
      path: 'inventory',
      loadChildren:()=>import('app/inventory-control/site-inventory/inventory-list/inventory-list.module').then(x=>x.InventoryListModule),
      data:{pageGuid:'680dd2933682904bdd6e9ab5',type:'view'}
    },
    {
      path: 'employees',
      loadChildren:()=>import('app/employee-control/employees/employee-list/employee-list.module').then(x=>x.EmployeeListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'vehicles',
      loadChildren:()=>import('app/vehicle-control/vehicle/vehicle-list/vehicle-list.module').then(x=>x.VehicleListModule),
      data:{pageGuid:'680dd2733682904bdd6e9ab7',type:'view'}
    },
    {
      path: 'vehicle-log',
      loadChildren:()=>import('app/vehicle-control/vehicle-log/vehicle-log-list/vehicle-log-list.module').then(x=>x.VehicleLogListModule),
      data:{pageGuid:'680dd2933682904bdd6e9ab8',type:'view'}
    },
    {
      path: 'boq-attendence',
      loadChildren:()=>import('app/employee-control/boq-attendence/boq-attendence-list/boq-attendence-list.module').then(x=>x.BoqAttendenceListModule),
      data:{pageGuid:'680dd2933682904bdd6e9ab1',type:'view'}
    },
    {
      path: 'letters',
      loadChildren:()=>import('app/letter-control/letter-list/letter-list.module').then(x=>x.LetterListModule),
      data:{pageGuid:'680dd1bd3682904bdd6e9ac1',type:'view'}
    },
    {
      path: 'circular',
      loadChildren:()=>import('app/circular/circular-list/circular-list.module').then(x=>x.CircularListModule),
      data:{pageGuid:'680dd1bd3682904bdd6e9ac7',type:'view'}
    },
    {
      path: 'invoice',
      loadChildren:()=>import('app/payments/invoice/invoice-list/invoice-list.module').then(x=>x.InvoiceListModule),
      data:{pageGuid:'680dd2933682904bdd6e9ac4',type:'view'}
    },
    {
      path: 'boq-list',
      loadChildren:()=>import('app/payments/boq/boq-list/boq-list.module').then(x=>x.BoqListModule),
      data:{pageGuid:'680dd2733682904bdd6e9ac3',type:'view'}
    },
    {
      path: 'boq-invoice',
      loadChildren:()=>import('app/invoice-control/boq-invoice/boq-invoice.module').then(x=>x.BoqInvoiceModule),
      data:{pageGuid:'680dd2733682904bdd6e9ac3',type:'view'}
    },
    {
      path: 'consultancy-invoice',
      loadChildren:()=>import('app/invoice-control/consultancy-invoice/consultancy-invoice.module').then(x=>x.ConsultancyInvoiceModule),
      data:{pageGuid:'680dd2933682904bdd6e9ac4',type:'view'}
    },
    {
      path: 'consultancy-release-invoice',
      loadChildren:()=>import('app/invoice-control/transport/release-invoice/release-invoice.module').then(x=>x.ReleaseInvoiceModule),
      data:{pageGuid:'680dd2933682904bdd6e9ac4',type:'view', title:extractTitle('Release Detail(s)')}
    }, 
    {
      path: 'ofc-rent',
      loadChildren:()=>import('app/office-rent/office-rent-list/office-rent-list.module').then(x=>x.OfficeRentListModule),
      data:{pageGuid:'680dd1bd3682904bdd6e9ac5',type:'view'}
    },
    {
      path: 'profit-loss',
      loadChildren:()=>import('app/profit-loss/profit-loss-list/profit-loss-list.module').then(x=>x.ProfitLossListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'profit-loss-details',
      loadChildren:()=>import('app/profit-loss/profit-loss-detailed/profit-loss-detailed.module').then(x=>x.ProfitLossDetailedModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'profit-loss-expense',
      loadChildren:()=>import('app/profit-loss/profit-loss-expense/profit-loss-expense.module').then(x=>x.ProfitLossExpenseModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'ticket',
      loadChildren:()=>import('app/ticket-control/ticket-list/ticket-list.module').then(x=>x.TicketListModule),
      data:{pageGuid:'680dd1bd3682904bdd6e9ad9',type:'view'}
    },
    {
      path: 'imperest',
      loadChildren:()=>import('app/siteops-fund/imperest/imperest-list/imperest-list.module').then(x=>x.ImperestListModule),
      data:{pageGuid:'680dd2733682904bdd6e9afb',type:'view'}
    },
    {
      path: 'expense',
      loadChildren:()=>import('app/siteops-fund/expense/expense-list/expense-list.module').then(x=>x.ExpenseListModule),
      data:{pageGuid:'680dd2933682904bdd6e9afc',type:'view'}
    },
    {
      path: 'ofc-billing',
      loadChildren:()=>import('app/siteops-fund/ofc-rent-billing/ofc-rent-billing-list/ofc-rent-billing-list.module').then(x=>x.OfcRentBillingListModule),
      data:{pageGuid:'680dd2933682904bdd6e9afd',type:'view'}
    },
    {
      path: 'vehicle-billing',
      loadChildren:()=>import('app/siteops-fund/vehicle-billing/vehicle-billing-list/vehicle-billing-list.module').then(x=>x.VehicleBillingListModule),
      data:{pageGuid:'680dd2933682904bdd6e9afe',type:'view'}
    },
    {
      path: 'approval',
      loadChildren:()=>import('app/settings/approval/approval-list/approval-list.module').then(x=>x.ApprovalListModule),
      data:{pageGuid:'680dd2733682904bdd6e9abb',type:'view'}
    },
    {
      path: 'ofc-billing-request',
      loadChildren:()=>import('app/requests/office-billing/office-billing-list/office-billing-list.module').then(x=>x.OfficeBillingListModule),
      data:{pageGuid:'680dd2733682904bdd6e9aac',type:'view'}
    },
    {
      path: 'imperest-billing-request',
      loadChildren:()=>import('app/requests/imperest-billing/imperest-billing-list/imperest-billing-list.module').then(x=>x.ImperestBillingListModule),
      data:{pageGuid:'680dd2733682904bdd6e9aaa',type:'view'}
    },
    {
      path: 'veh-billing-request',
      loadChildren:()=>import('app/requests/veh-billing-req/veh-billing-req-list/veh-billing-req-list.module').then(x=>x.VehBillingReqListModule),
      data:{pageGuid:'680dd2733682904bdd6e9aad',type:'view'}
    },
     {
      path: 'exp-billing-request',
      loadChildren:()=>import('app/requests/exp-billing-req/exp-req-billing-list/exp-req-billing-list.module').then(x=>x.ExpReqBillingListModule),
      data:{pageGuid:'680dd2733682904bdd6e9aab',type:'view'}
    },
    {
      path: 'user-project',
      loadChildren:()=>import('app/user-project/user-project-list/user-project-list.module').then(x=>x.UserProjectListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'misc',
      loadChildren:()=>import('app/misc/misc-list/misc-list.module').then(x=>x.MiscListModule),
      data:{pageGuid:'680dd1bd3682904bdd6e9ac9',type:'view'}
    },
    {
      path: 'transport-list',
      loadChildren:()=>import('app/projects/transport-infra/transport-infra-list/transport-infra-list.module').then(x=>x.TransportInfraListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'permission',
      loadChildren:()=>import('app/app-permission/app-permission-list/app-permission-list.module').then(x=>x.AppPermissionListModule),
      data:{pageGuid:'',type:'view'}
    },
    {
      path: 'my-profile',
      loadChildren:()=>import('app/my-profile/my-profile.module').then(x=>x.MyProfileModule),
      data:{pageGuid:'',type:'view'}
    }
    //{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
  ]),
  // { path: 'login', loadChildren: () => import('app/login/login.module').then(x => x.LoginModule) },
  {
    path: 'forgot-password',
    loadChildren:()=>import('@app/password/forgotpassword/forgotpassword.module').then(x=>x.ForgotpasswordModule),
    data:{pageGuid:'',type:'view'}
  },
  
];
const routes: Routes = protectRoutes(baseroutes);
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
