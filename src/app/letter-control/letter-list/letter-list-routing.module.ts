import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LetterListComponent } from './letter-list.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddLetterComponent } from '../add-letter/add-letter.component';
import { EditLetterComponent } from '../edit-letter/edit-letter.component';
import { DeleteLetterComponent } from '../delete-letter/delete-letter.component';
import { LetterDetailsComponent } from '../letter-details/letter-details.component';

const routes: Routes = [
  {
    path:'',
    component:LetterListComponent,
    data:{title:extractTitle('Letters')},
    children: [
      {
        path: 'create',
        component: AddLetterComponent,
        loadChildren:()=>import('app/letter-control/add-letter/add-letter.module').then(x=>x.AddLetterModule),
        data:{pageGuid:'',type:'add'}
      },
      {
        path: 'edit/:letId',
        component: EditLetterComponent,
        loadChildren:()=>import('app/letter-control/edit-letter/edit-letter.module').then(x=>x.EditLetterModule),
        data:{pageGuid:'',type:'edit'}
      },
      {
        path: 'delete/:letId',
        component: DeleteLetterComponent,
        loadChildren:()=>import('app/letter-control/delete-letter/delete-letter.module').then(x=>x.DeleteLetterModule),
        data:{pageGuid:'',type:'delete'}
      },
      {
        path: 'details/:letId',
        component: LetterDetailsComponent,
        loadChildren:()=>import('app/letter-control/letter-details/letter-details.module').then(x=>x.LetterDetailsModule),
        data:{pageGuid:'',type:'Details'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LetterListRoutingModule { }
