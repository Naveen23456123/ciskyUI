import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { ProjectViewComponent } from '../project-view/project-view.component';
import { ContractorAddComponent } from '@app/contractor/contractor-add/contractor-add.component';
import { ContractorDetailsComponent } from '@app/contractor/contractor-details/contractor-details.component';
import { Title } from '@angular/platform-browser';
import { UploadProjectComponent } from '../upload-project/upload-project.component';


const routes: Routes = [
  {
    path:'',
    component:ProjectListComponent,
    data:{title:extractTitle('Projects'), breadcrumb: 'Projects',pageGuid:'680dd1bd3682904bdd6e9ad2'},
    children: [
      {
        path: 'create',
        component: CreateProjectComponent,
        loadChildren:()=>import('app/projects/create-project/create-project.module').then(x=>x. CreateProjectModule),
        data:{pageGuid:'',type:'add'}
      },      
      {
        path: 'upload',
        component: UploadProjectComponent,
        loadChildren:()=>import('app/projects/upload-project/upload-project.module').then(x=>x.UploadProjectModule),
        data:{pageGuid:'',type:'add'}
      },
    ]},
    {
      path: 'project-view',
      component: ProjectViewComponent,
      loadChildren:()=>import('app/projects/project-view/project-view.module').then(x=>x.ProjectViewModule),
      data:{pageGuid:'',type:'add', title:extractTitle('Project Details - ')}
    },
    {
      path: 'con-details',
      component: ContractorDetailsComponent,
      loadChildren:()=>import('app/contractor/contractor-details/contractor-details.module').then(x=>x.ContractorDetailsModule),
      data:{pageGuid:'',type:'add'}
    },
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
        }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectListRoutingModule { }
