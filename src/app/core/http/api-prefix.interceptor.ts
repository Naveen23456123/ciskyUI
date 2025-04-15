import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelperService } from '../../../app/shared/services/helper.service';


/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) { }

  public get helperService() {
    return this.injector.get(HelperService);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request = req;
    if (!/^(http:https):/i.test(request.url)) {
      if (/\b(\w*config\.json\w*)\b/g.test(request.url)) {
        // request = request.clone({ url: request.url });
      }
      else {
        request = request.clone({ 
          url: (this.helperService.apiConfig().api.url) + request.url, 
          //headers: request.headers.set('Content-Type', 'application/json') 
        });
      }
    }

    return next.handle(request);
  }
}
