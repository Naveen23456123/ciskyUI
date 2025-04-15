import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from '../coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class BoqOfficeFurnitureInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getBoqOfficeFurnitureListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeFurniture/'+param.id,
       params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createBoqOfficeFurniture(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeFurniture',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateBoqOfficeFurniture(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeFurniture',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteBoqOfficeFurniture(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeFurniture',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}
