import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { Operation } from '@app/shared/models/http/ActionModel';

@Injectable({
  providedIn: 'root'
})
export class CircularInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getCircularListByOrgId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'Circular',
        params: {},
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createCircular(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Circular',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateCircular(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Circular',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteCircular(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Circular',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}

