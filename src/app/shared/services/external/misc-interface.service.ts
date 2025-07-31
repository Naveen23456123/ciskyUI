import { Injectable,Type } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class MiscInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getMiscellaneousListByOrgId(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'Miscellaneous/Search',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createMiscellaneous(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Miscellaneous',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateMiscellaneous(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Miscellaneous',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteMiscellaneous(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Miscellaneous',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}

