import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { HelperService } from '../helper.service';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { Operation } from '@app/shared/models/http/ActionModel';

@Injectable({
  providedIn: 'root'
})
export class CoreAPIService {

  constructor(
    private _httpclient: HttpClient,
    private _helperservice: HelperService
  ) { }

  public standardService(_serviceAttrModel: ServiceAttributeModel) {
    switch (_serviceAttrModel.action) {
      case Operation.CREATE:
        return this.insert(_serviceAttrModel);
      case Operation.DELETE:
        return this.delete(_serviceAttrModel);
      case Operation.GET:
        return this.get(_serviceAttrModel);
      case Operation.UPDATE:
        return this.update(_serviceAttrModel);
        case Operation.PATCH:
        return this.patch(_serviceAttrModel);
        default:
          return this.get(_serviceAttrModel);
    }    
  }

  private getAPIHeaders(guid: string = ''): HttpHeaders {
    {
      return new HttpHeaders({
        VMS_PAGE_GUID: guid,
        VMS_USER_AGENT: window.navigator.userAgent,
        VMS_USER_HOST_ADDRESS: '',
        VMS_WEBSITE_DOMAIN_PREFIX: this._helperservice.apiConfig().api.prefix,
        VMS_USER_SESSION_TRACKING_ID: '',
        VMS_USER_INTERFACE_TYPE: '',
        VMS_USER_KEY: '123'       
      });
    }
  }

  private getAPIParams(parameters: any = {}): HttpParams {
    let params = new HttpParams();
    if (parameters) {
      for (const key in parameters) {
        params = params.set(key, parameters[key]);
      }
    }
    return params;
  }

  private get(attr: ServiceAttributeModel) {        
    return new Observable((sub) => {
      this._httpclient.get<any>(
        attr.url,
        {
          headers: attr.headers ? this.getAPIHeaders(attr.guid) : undefined,
          params: attr.params ? this.getAPIParams(attr.params) : undefined
        }).pipe(
          tap(),
        ).subscribe({
          next: (data) => {
            sub.next(data);
            sub.complete();
          },
          error: (err) => {
            sub.error({error:err})
            sub.complete();
          }
    });
    });
  }

  private insert(attr: ServiceAttributeModel) {
    const cheaders = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return new Observable((sub) => {
      this._httpclient.post<any>(
        attr.url,
        //JSON.stringify(attr.request.entries()),
        attr.request,
        {
          headers: attr.headers ? this.getAPIHeaders(attr.guid) : undefined,
          params: attr.params ? this.getAPIParams(attr.params) : undefined
        }).pipe(
          tap(),
        ).subscribe({
          next: 
          (data) => {
            sub.next(data);
            sub.complete();
          },
          error: (err) => {
            sub.error({error:err})
            sub.complete();

          }
    });
    });
  }

  private patch(attr: ServiceAttributeModel) {
    return new Observable((sub) => {
      this._httpclient.patch<any>(
        attr.url,
        JSON.stringify(attr.request),
        {
          headers: attr.headers ? this.getAPIHeaders(attr.guid) : undefined,
          params: attr.params ? this.getAPIParams(attr.params) : undefined
        }).pipe(
          tap(),
        ).subscribe({
          next: 
          (data) => {
            sub.next(data);
            sub.complete();
          },
          error: (err) => {
            sub.error({error:err})
            sub.complete();

          }
    });
    });
  }
  private update(attr: ServiceAttributeModel) {
    return new Observable((sub) => {
      this._httpclient.put<any>(
        attr.url,
        //JSON.stringify(attr.request),
        attr.request,
        {
          headers: attr.headers ? this.getAPIHeaders(attr.guid) : undefined,
          params: attr.params ? this.getAPIParams(attr.params) : undefined
        }).pipe(
          tap(),
        ).subscribe({
          next: 
          (data) => {
            sub.next(data);
            sub.complete();
          },
          error: (err) => {
            sub.error({error:err})
            sub.complete();
          }
    });
    });
  }
  private delete(attr: ServiceAttributeModel) {
    return new Observable((sub) => {
      this._httpclient.delete<any>(
        attr.url,
        {
          headers: attr.headers ? this.getAPIHeaders(attr.guid) : undefined,
          params: attr.params ? this.getAPIParams(attr.params) : undefined
        }).pipe(
          tap(),
        ).subscribe({
          next: 
          (data) => {
            sub.next(data);
            sub.complete();
          },
          error: (err) => {


          }
    });
    });
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      // return of(result as T);
      return EMPTY;
    };
  }
}
