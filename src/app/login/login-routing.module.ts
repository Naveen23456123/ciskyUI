import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { extractTitle } from '@app/core/i18n.service';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  data: { title: extractTitle('Login') }
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
