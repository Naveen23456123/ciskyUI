import { Injectable } from '@angular/core';
import { CoreAPIService } from './coreapi.service';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { Operation } from '@app/shared/models/http/ActionModel';

@Injectable({
  providedIn: 'root'
})
export class AdminInterfaceService {

  constructor(private coreapi: CoreAPIService) { }

  getBillinModuleList(id:any) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Module/Billing/'+id,
      params: false,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreapi.standardService(standardAttribute);
  }
  assignModulesInRole(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'admin/AssignModuleInRole',
      params: false,
      headers: true,
      guid: guid,
      request: request,
      action: Operation.CREATE
    }
    return this.coreapi.standardService(standardAttribute);
  }
}
