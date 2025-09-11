import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';
import { extractTitle } from '@app/core/i18n.service';

const routes: Routes = [{
  path: 'reset-password/:token',
  component: ResetPasswordComponent,
  data: { title: extractTitle('Reset Passowrd') }
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
