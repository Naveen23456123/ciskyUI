import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from '../coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class InvStaffInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getBoqStaffListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqStaff/'+param.id,
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getBoqStaffListForInsertByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqStaff/Insert/'+param.id+'/'+param.invid,
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createBoqStaff(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqStaff',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  UpdateBoqStaffDescription(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqStaff/Description/'+request.id,
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateBoqStaff(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqStaff',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteBoqStaff(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqStaff',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getConsultantStaffListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvStaff/'+param.id,
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createConsultantStaff(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvStaff',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateConsultantStaff(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvStaff',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteConsultantStaff(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'InvStaff',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}

