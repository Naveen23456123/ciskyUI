import { Injectable } from '@angular/core';
import { CoreAPIService } from './coreapi.service';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { Operation } from '@app/shared/models/http/ActionModel';

@Injectable({
  providedIn: 'root'
})
export class ReleaseExpenseInterfaceService {

  constructor(private coreApi:CoreAPIService) { }
  
  getExpenseTemplate(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ReleaseExpense/GetTemplateInfo',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  upsertReleaseExpenseScopes(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ReleaseExpense',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}
