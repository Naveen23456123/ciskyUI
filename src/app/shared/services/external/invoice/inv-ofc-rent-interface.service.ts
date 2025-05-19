import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from '../coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class InvOfcRentInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getBoqOfficeRentListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeRent/'+param.id,
       params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getBoqOfficeRentListForInsertByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeRent/Insert/'+param.id,
       params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createBoqOfficeRent(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeRent',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateBoqOfficeRent(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeRent',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteBoqOfficeRent(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeRent',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }

  getConsultantOfficeRentListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvOfficeRent/'+param.id,
       params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createConsultantOfficeRent(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvOfficeRent',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateConsultantOfficeRent(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvOfficeRent',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteConsultantOfficeRent(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvOfficeRent',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}

