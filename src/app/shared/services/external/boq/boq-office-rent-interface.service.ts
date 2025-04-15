import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from '../coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class BoqOfficeRentInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getBoqOfficeRentListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeRent/'+param.id,
       params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createBoqOfficeRent(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeRent',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateBoqOfficeRent(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeRent',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteBoqOfficeRent(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqOfficeRent',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}
