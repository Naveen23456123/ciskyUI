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
  searchImperestListByOrgId(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Imperest/Search',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
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
  deleteImperest(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Imperest/Delete/'+request.id,
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  searchImperestBillingRequests(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Imperest/Requests',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  actImperestBillingRequest(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Imperest/Action',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getImperestDetails(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Imperest/Details',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getImperestPartialDetails(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Imperest/Partial',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  getImperestDetailById(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Imperest/DetailsWithLevel/'+request.id,
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
}
