import { Injectable } from '@angular/core';
import { CoreAPIService } from './coreapi.service';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { Operation } from '@app/shared/models/http/ActionModel';

@Injectable({
  providedIn: 'root'
})
export class ExpenseInterfaceService {

constructor(private coreApi:CoreAPIService) { }

  searchExpenseListByOrgId(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ImpExpense/Search',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getExpenseDetailsListById(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ImpExpense/'+request.id,
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createExpense(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ImpExpense',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  searchExpenseBillingRequests(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ImpExpense/Requests',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateExpense(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ImpExpense',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updatePartialExpense(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ImpExpense/PartialUpdate',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  claimExpense(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ImpExpense/Claim',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  actImpExpenseBillingRequest(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ImpExpense/Action',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteExpense(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ImpExpense',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteExpenseById(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ImpExpense/DeleteExp',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}


