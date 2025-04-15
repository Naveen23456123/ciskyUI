import { NgModule,LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellModule } from './shell/shell.module';
import { MaterialModule } from './shared/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ProjectViewComponent } from './projects/project-view/project-view.component';
import { CoreModule } from './core/core.module';
import { registerLocaleData } from '@angular/common';
import { ApiPrefixInterceptor } from './core/http/api-prefix.interceptor';
import localeIn from '@angular/common/locales/en-IN';
import { LoginModule } from './login/login.module';

registerLocaleData(localeIn, 'en-IN');

@NgModule({
  declarations: [
    AppComponent,
    ProjectViewComponent
  ],
  imports: [
    LoginModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShellModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    NgIdleKeepaliveModule.forRoot(),
    TranslateModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync(), provideHttpClient( withInterceptorsFromDi()),
    { provide: LOCALE_ID, useValue: 'en-IN' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
