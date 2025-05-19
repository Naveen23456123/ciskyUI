import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from '../coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class InvOfcSupplyInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getBoqOfficeSupplyListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeSupply/'+param.id,
       params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getBoqOfficeSupplyListForInsertByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeSupply/Insert/'+param.id,
       params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createBoqOfficeSupply(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeSupply',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateBoqOfficeSupply(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeSupply',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteBoqOfficeSupply(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeSupply',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getConsultantOfficeSupplyListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvOfficeSupply/'+param.id,
       params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createConsultantOfficeSupply(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvOfficeSupply',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateConsultantOfficeSupply(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvOfficeSupply',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteConsultantOfficeSupply(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvOfficeSupply',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}

