import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword.component';
import { extractTitle } from '@app/core/i18n.service';

const routes: Routes = [{
  path: 'forgot-password',
  component: ForgotpasswordComponent,
  data: { title: extractTitle('Forgot Passowrd') }
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotpasswordRoutingModule { }
