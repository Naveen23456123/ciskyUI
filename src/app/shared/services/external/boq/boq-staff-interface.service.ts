import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from '../coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class BoqStaffInterfaceService {

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
}
