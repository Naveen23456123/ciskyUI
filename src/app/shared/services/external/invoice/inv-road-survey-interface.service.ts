import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from '../coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class InvRoadSurveyInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getBoqRoadSurveyListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqRoadSurvey/'+param.id,
       params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createBoqRoadSurvey(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqRoadSurvey',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateBoqRoadSurvey(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqRoadSurvey',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteBoqRoadSurvey(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqRoadSurvey',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getConsultantRoadSurveyListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvRoadSurvey/'+param.id,
       params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createConsultantRoadSurvey(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvRoadSurvey',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateConsultantRoadSurvey(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvRoadSurvey',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteConsultantRoadSurvey(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvRoadSurvey',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}

