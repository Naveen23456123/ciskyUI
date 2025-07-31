import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from '../coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class InvTransportInterfaceService {

  constructor(private coreApi:CoreAPIService) { }
 
  getBoqTransportationListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqTransportation/'+param.id,
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getBoqTransportationListForInsertByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqTransportation/Insert/'+param.id+'/'+param.invid,
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createBoqTransportation(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqTransportation',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  } 
  UpdateBoqTransportationDescription(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqTransportation/Description',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateBoqTransportation(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqTransportation',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteBoqTransportation(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqTransportation',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }

   
  getConsultantTransportationListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvTransport/'+param.id,
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createConsultantTransportation(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvTransport',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateConsultantTransportation(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvTransport',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteConsultantTransportation(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvTransport',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}


