import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultantAccountInterfaceService {

  constructor(private coreApi: CoreAPIService) { }
  getConsultantAccountListByOrgId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ConsultantAccount',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createConsultantAccount(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ConsultantAccount',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateConsultantAccount(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ConsultantAccount',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteConsultantAccount(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ConsultantAccount',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}
