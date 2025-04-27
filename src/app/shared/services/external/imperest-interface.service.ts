import { Injectable } from '@angular/core';
import { CoreAPIService } from './coreapi.service';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { Operation } from '@app/shared/models/http/ActionModel';

@Injectable({
  providedIn: 'root'
})
export class ImperestInterfaceService {
  constructor(private coreApi:CoreAPIService) { }

  getImperestListByOrgId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Imperest',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createImperest(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Imperest',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateImperest(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Imperest',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteImperest(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Imperest',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}
