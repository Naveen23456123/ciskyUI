import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from '../coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class InvDutyTravelInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getBoqDutyTravelListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqDutyTravel/'+param.id,
       params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getBoqDutyTravelListForInsertByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqDutyTravel/Insert/'+param.id+'/'+param.invid,
       params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  UpdateBoqDutyTravelDescription(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqDutyTravel/Description/',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createBoqDutyTravel(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqDutyTravel',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateBoqDutyTravel(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqDutyTravel',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteBoqDutyTravel(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqDutyTravel',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getConsultantDutyTravelListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvDutyTravel/'+param.id,
       params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createConsultantDutyTravel(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvDutyTravel',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateConsultantDutyTravel(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvDutyTravel',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteConsultantDutyTravel(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvDutyTravel',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}

