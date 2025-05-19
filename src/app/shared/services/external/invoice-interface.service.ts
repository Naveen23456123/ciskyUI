import { Injectable } from '@angular/core';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from './coreapi.service';
import { Operation } from '@app/shared/models/http/ActionModel';

@Injectable({
  providedIn: 'root'
})
export class InvoiceInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getInvoiceListByOrgId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
}
  createInvoice(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateInvoice(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteInvoice(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}
