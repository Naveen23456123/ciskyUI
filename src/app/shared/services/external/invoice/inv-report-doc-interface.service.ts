import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from '../coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class InvReportDocInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getBoqReportDocListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqReportDoc/'+param.id,
       params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createBoqReportDoc(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqReportDoc',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateBoqReportDoc(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqReportDoc',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteBoqReportDoc(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqReportDoc',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getConsultantReportDocListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvReportDoc/'+param.id,
       params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createConsultantReportDoc(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvReportDoc',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateConsultantReportDoc(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvReportDoc',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteConsultantReportDoc(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvReportDoc',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}

