import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from './i18n.service';
import { TranslateModule } from '@ngx-translate/core';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { CacheInterceptor } from './http/cache.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { HttpCacheService } from './http/http-cache.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpService } from './http/http.service';
import { RouteReuseStrategy } from '@angular/router';
import { RouteReusableStrategy } from './route-reusable-strategy';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, TranslateModule
  ],
  providers: [
    I18nService,
    ApiPrefixInterceptor,
    CacheInterceptor,
    ErrorHandlerInterceptor,
    HttpCacheService,
    {
      provide: HttpClient,
      useClass: HttpService
    },
  {
    provide: RouteReuseStrategy,
    useClass: RouteReusableStrategy
  },
  {provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true},]
})
export class CoreModule {
  // constructor(@Optional() @SkipSelf() parentModule:CoreModule)
  // {

  // }
 }
