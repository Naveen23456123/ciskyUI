import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from '../coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class InvContingencyInterfaceService {

constructor(private coreApi:CoreAPIService) { }

  getBoqContingencyListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqContingency/'+param.id,
       params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getBoqContingencyListForInsertByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqContingency/Insert/'+param.id+'/'+param.invid,
       params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createBoqContingency(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqContingency',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateBoqContingency(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqContingency',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  UpdateContingencyDescription(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqContingency/Description/',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteBoqContingency(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqContingency',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getConsultantContingencyListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvContingency/'+param.id,
       params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createConsultantContingency(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvContingency',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateConsultantContingency(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvContingency',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteConsultantContingency(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvContingency',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}


