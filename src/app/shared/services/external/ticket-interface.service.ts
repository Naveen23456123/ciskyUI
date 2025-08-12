import { Injectable } from '@angular/core';
import { CoreAPIService } from './coreapi.service';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';

@Injectable({
  providedIn: 'root'
})
export class TicketInterfaceService {

  constructor(private coreApi:CoreAPIService) { }
  getTicketListByOrgId(request: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
          url: 'Ticket/Search',
          params: {},
          headers: true,
          guid: '',
          request: request,
          action: Operation.CREATE
        }
        return this.coreApi.standardService(standardAttribute);
  }
  createTicket(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Ticket',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateTicket(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Ticket',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteTicket(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Ticket',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
 
}
