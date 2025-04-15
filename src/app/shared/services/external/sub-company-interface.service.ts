import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class SubCompanyInterfaceService {

  constructor(private coreApi:CoreAPIService) { }
  getSubCompanyListByOrgId(param: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
          url: 'SubCompany',
          params: {},
          headers: true,
          guid: '',
          request: {},
          action: Operation.GET
        }
        return this.coreApi.standardService(standardAttribute);
  }
  createSubCompany(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SubCompany',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateSubCompany(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SubCompany',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteSubCompany(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SubCompany',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
 
}
