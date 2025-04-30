import { Injectable, InjectionToken, Injector, Optional, Inject } from '@angular/core';
import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPrefixInterceptor } from './api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { CacheInterceptor } from './cache.interceptor';
import { AuthInterceptor } from './auth.interceptor';

// HTTPClient is decalred in a re-exported module, so we have to extend the original module to make it work properly
// (see https://github.com/Microsoft/TypeScript/issues/13897)
declare module '@angular/common/http'
{
  // Augment HttpClient with the added configuration method from HttpService , to allow in-place replacement of
  // HttpClient with HttpService using dependency injection.
  export interface HttpClient {

    /**
     * Enables caching for this request.
     * @param forceupdate force request to be made and updates cache entry.
     * @return The new instance.
     */
    cache(forceupdate?: boolean): HttpClient;

    /**
     * Skip default error handling for this request.
     * @return The new instance.
     */
    skipErrorHandling(): HttpClient;

    /**
     * Do not use API prefix for this request.
     * @return The new instance.
     */
    disableApiPrefix(): HttpClient;
  }
}

// From @angular/common/http/src/interceptor: allows to chain interceptor
class HttpInterceptorHandler implements HttpHandler {
  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) { }

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(request, this.next);
  }

}

/**
 * Allows to override default dynamic interceptors that can be disabled with the HttpService extension.
 * Except for very specific needs, you should better configure these interceptors directly in the constructor below
 * for better readability.
 *
 * For static interceptor thst should always be enabled (like apiPrefixInterceptor ), use the standard HTTP-INTERCEPTORS token.
 */
export const HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>('HTTP_DYNAMIC_INTERCEPTORS');


/**
 * Extend HttpClient with per request configuration using dynamic interceptors.
 */
@Injectable()
export class HttpService extends HttpClient {

  constructor(
    private _httphandler: HttpHandler,
    private _injector: Injector,
    @Optional() @Inject(HTTP_DYNAMIC_INTERCEPTORS) private _interceptors: HttpInterceptor[] = []) {
    super(_httphandler);

    if (!this._interceptors) {
      // Configure default intereptors that can be disabled here.
      this._interceptors = [this._injector.get(ApiPrefixInterceptor),this._injector.get(AuthInterceptor), this._injector.get(ErrorHandlerInterceptor)];
    }
  }

  override cache(forceupdate?: any): HttpClient {
    const interceptor = this._injector.get(CacheInterceptor).configure({ update: forceupdate });
    return this.addInterceptor(interceptor);
  }

  override skipErrorHandling(): HttpClient {
    return this.removeInterceptor(ErrorHandlerInterceptor);
  }

  override disableApiPrefix(): HttpClient {
    return this.removeInterceptor(ApiPrefixInterceptor);
  }

  // Override the original method to wire interceptors when triggering the request.
  override request(method?: any, url?: any, options?: any): any {
    console.log(this.request);
    const handler = this._interceptors.reduceRight(
      (next, interceptor) => new HttpInterceptorHandler(next, interceptor)
      , this._httphandler
    );
    return new HttpClient(handler).request(method, url, options);
  }

  private removeInterceptor(interceptorType: Function): HttpService {
    return new HttpService(this._httphandler,
      this._injector,
      this._interceptors.filter(i => !(i instanceof interceptorType)));
  }

  private addInterceptor(interceptor: HttpInterceptor): HttpService {
    return new HttpService(this._httphandler, this._injector, this._interceptors.concat([interceptor]));
  }
}
