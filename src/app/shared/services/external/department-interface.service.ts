import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentInterfaceService {

  constructor(private coreApi:CoreAPIService) { }
  getTemplateColumnList() {
    let columns = [
      { label: 'name', value: 'name' },
      { label: 'company', value: 'companyname' },
      
    ];
  return columns;
  }
   getDepartmentListByOrgId(param: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
          url: 'department',
          params: {},
          headers: true,
          guid: '',
          request: {},
          action: Operation.GET
        }
        return this.coreApi.standardService(standardAttribute);
  };
  createDepartment(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Department',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createBulkDepartments(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Department/Bulk',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateDepartment(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Department',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteDepartment(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Department',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}
