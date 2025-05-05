import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class DesignationInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getTemplateColumnList() {
    let columns = [
      { label: 'name', value: 'name' },
      { label: 'company', value: 'companyname' },
      
    ];
  return columns;
  }

  getDesignationList(param: any, guid: string) {
   const standardAttribute: ServiceAttributeModel = {
    url: 'Designation',
    params: param,
    headers: true,
    guid: '',
    request: {},
    action: Operation.GET
   }
   return this.coreApi.standardService(standardAttribute);
 }
  createDesignation(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Designation',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createBulkDesignations(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Designation/Bulk',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateDesignation(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Designation',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteDesignation(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Designation',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}
