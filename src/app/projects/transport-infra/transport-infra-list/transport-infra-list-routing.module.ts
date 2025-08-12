import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { extractTitle } from '@app/core/i18n.service';
import { TransportInfraListComponent } from './transport-infra-list.component';
import { TransportInfraUploadComponent } from '../transport-infra-upload/transport-infra-upload.component';
import { SupervisionCreateComponent } from '../supervision-create/supervision-create.component';
import { DprCreateComponent } from '../dpr-create/dpr-create.component';
import { SupervisionViewComponent } from '../supervision-view/supervision-view.component';
import { DprViewComponent } from '../dpr-view/dpr-view.component';
import { DprUploadComponent } from '../dpr-upload/dpr-upload.component';
import { SupervisionUploadComponent } from '../supervision-upload/supervision-upload.component';

const routes: Routes = [
  {
  path:'',
  component:TransportInfraListComponent,
  data:{title:extractTitle('Projects'), breadcrumb: 'Projects',pageGuid:'68957163733dee05073d71f2'},
  children: [
    {
      path: 'sup-create',
      component: SupervisionCreateComponent,
      loadChildren:()=>import('app/projects/transport-infra/supervision-create/supervision-create.module').then(x=>x.SupervisionCreateModule),
      data:{pageGuid:'689571dd733dee05073d71f3',type:'add'}
    },
    {
      path: 'dpr-create',
      component: DprCreateComponent,
      loadChildren:()=>import('app/projects/transport-infra/dpr-create/dpr-create.module').then(x=>x.DprCreateModule),
      data:{pageGuid:'6895723d733dee05073d71f5',type:'add'}
    },
    {
      path: 'dpr-upload',
      component: DprUploadComponent,
      loadChildren:()=>import('app/projects/transport-infra/dpr-upload/dpr-upload.module').then(x=>x.DprUploadModule),
      data:{pageGuid:'6895723d733dee05073d71f5',type:'add'}
    },
    {
      path: 'sup-upload',
      component: SupervisionUploadComponent,
      loadChildren:()=>import('app/projects/transport-infra/supervision-upload/supervision-upload.module').then(x=>x.SupervisionUploadModule),
      data:{pageGuid:'689571dd733dee05073d71f3',type:'add'}
    },
    // {
    //   path: 'sup-view',
    //   component: SupervisionViewComponent,
    //   loadChildren:()=>import('app/projects/transport-infra/supervision-view/supervision-view.module').then(x=>x.SupervisionViewModule),
    //   data:{pageGuid:'',type:'add', title:extractTitle('Project Details - ')}
    // },
    // {
    //   path: 'dpr-view',
    //   component: DprViewComponent,
    //   loadChildren:()=>import('app/projects/transport-infra/dpr-view/dpr-view.module').then(x=>x.DprViewModule),
    //   data:{pageGuid:'',type:'add', title:extractTitle('Project Details - ')}
    // },      
    {
      path: 'upload',
      component: TransportInfraUploadComponent,
      loadChildren:()=>import('app/projects/transport-infra/transport-infra-upload/transport-infra-upload.module').then(x=>x.TransportInfraUploadModule),
      data:{pageGuid:'',type:'add'}
    },
  ]},
  {
      path: 'sup-view',
      component: SupervisionViewComponent,
      loadChildren:()=>import('app/projects/transport-infra/supervision-view/supervision-view.module').then(x=>x.SupervisionViewModule),
      data:{pageGuid:'',type:'add', title:extractTitle('Project Details - ')}
    },
    {
      path: 'dpr-view',
      component: DprViewComponent,
      loadChildren:()=>import('app/projects/transport-infra/dpr-view/dpr-view.module').then(x=>x.DprViewModule),
      data:{pageGuid:'',type:'add', title:extractTitle('Project Details - ')}
    }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportInfraListRoutingModule { }
