import { Injectable } from '@angular/core';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from './coreapi.service';
import { Operation } from '@app/shared/models/http/ActionModel';

@Injectable({
  providedIn: 'root'
})
export class ProfitLossInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getProfitLossSheetListByOrgId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ProfitLoss/Sheet',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getProfitLossListByOrgId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ProfitLoss',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getProfitLossListById(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ProfitLoss/'+param.id,
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getCommulativeProfitLossByProjectIdId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ProfitLoss/Project/'+param.id,
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getProfitLossScopes(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ProfitLoss/Scope',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getProfitLossByScopeId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ProfitLoss/ByScope/'+param.id,
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getProfitLossFinancial(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ProfitLoss/Financial',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateProfitLossById(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ProfitLoss',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createProfitLossSheet(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ProfitLoss/Sheet',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createProfitLoss(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ProfitLoss',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateProfitLossSymbol(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ProfitLoss/Sheet',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteProfitLossSheet(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ProfitLoss/Sheet',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteProfitLoss(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ProfitLoss',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  } 
  getExpenseSummary(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ProfitLoss/ExpenseSummary',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}
