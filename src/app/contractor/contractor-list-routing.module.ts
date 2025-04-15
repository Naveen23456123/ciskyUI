import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractorDetailsComponent } from './contractor-details/contractor-details.component';
import { extractTitle } from '@app/core/i18n.service';
import { ContractorAddComponent } from './contractor-add/contractor-add.component';
import { ContractorListComponent } from './contractor-list.component';

const routes: Routes = [
  {
    path:'',
    component:ContractorListComponent,
    data:{title:extractTitle('Contracts')},
    children: [
      {
        path: 'create',
        component: ContractorAddComponent,
        loadChildren:()=>import('app/contractor/contractor-add/contractor-add.module').then(x=>x. ContractorAddModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit',
        component: ContractorAddComponent,
        loadChildren:()=>import('app/contractor/contractor-edit/contractor-edit.module').then(x=>x. ContractorEditModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'billing-add',
        component: ContractorAddComponent,
        loadChildren:()=>import('app/contractor/contractor-billing-add/contractor-billing-add.module').then(x=>x. ContractorBillingAddModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'billing-edit',
        component: ContractorAddComponent,
        loadChildren:()=>import('app/contractor/contractor-billing-edit/contractor-billing-edit.module').then(x=>x. ContractorBillingEditModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'milestone-create',
        component: ContractorAddComponent,
        loadChildren:()=>import('app/contractor/contractor-milestone-add/contractor-milestone-add.module').then(x=>x. ContractorMilestoneAddModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'milestone-edit',
        component: ContractorAddComponent,
        loadChildren:()=>import('app/contractor/contractor-milestone-edit/contractor-milestone-edit.module').then(x=>x.ContractorMilestoneEditModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'eot-add',
        component: ContractorAddComponent,
        loadChildren:()=>import('app/contractor/contractor-eot-add/contractor-eot-add.module').then(x=>x.ContractorEotAddModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'eot-edit',
        component: ContractorAddComponent,
        loadChildren:()=>import('app/contractor/contractor-eot-edit/contractor-eot-edit.module').then(x=>x.ContractorEotEditModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'site-prgs-add',
        component: ContractorAddComponent,
        loadChildren:()=>import('app/contractor/contractor-siteprogress-add/contractor-siteprogress-add.module').then(x=>x.ContractorSiteprogressAddModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'site-prgs-add',
        component: ContractorAddComponent,
        loadChildren:()=>import('app/contractor/contractor-siteprogress-edit/contractor-siteprogress-edit.module').then(x=>x.ContractorSiteprogressEditModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'cos-add',
        component: ContractorAddComponent,
        loadChildren:()=>import('app/contractor/contractor-cos-add/contractor-cos-add.module').then(x=>x.ContractorCosAddModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'cos-edit',
        component: ContractorAddComponent,
        loadChildren:()=>import('app/contractor/contractor-cos-edit/contractor-cos-edit.module').then(x=>x.ContractorCosEditModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'letter-add',
        component: ContractorAddComponent,
        loadChildren:()=>import('app/contractor/contractor-letter-add/contractor-letter-add.module').then(x=>x.ContractorLetterAddModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'letter-edit',
        component: ContractorAddComponent,
        loadChildren:()=>import('app/contractor/contractor-letter-edit/contractor-letter-edit.module').then(x=>x.ContractorLetterEditModule),
        data:{pageGuid:'',type:'add'}
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractorListRoutingModule { }
