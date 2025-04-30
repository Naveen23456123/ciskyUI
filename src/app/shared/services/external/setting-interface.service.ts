import { Injectable } from '@angular/core';
import { CoreAPIService } from './coreapi.service';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';

@Injectable({
  providedIn: 'root'
})
export class SettingInterfaceService {

  constructor(private coreApi:CoreAPIService) { }
  
  getApprovalDetails(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Approval',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createApproval(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Approval',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateApproval(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Approval',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteApproval(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Approval',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}
