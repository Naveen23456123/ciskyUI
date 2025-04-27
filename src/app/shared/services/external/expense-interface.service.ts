import { Injectable } from '@angular/core';
import { CoreAPIService } from './coreapi.service';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { Operation } from '@app/shared/models/http/ActionModel';

@Injectable({
  providedIn: 'root'
})
export class ExpenseInterfaceService {

constructor(private coreApi:CoreAPIService) { }

  getExpenseListByOrgId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Expense',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createExpense(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Expense',
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
      url: 'Expense',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteExpense(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Expense',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}


