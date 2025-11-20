import { Injectable } from '@angular/core';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from './coreapi.service';
import { Operation } from '@app/shared/models/http/ActionModel';

@Injectable({
  providedIn: 'root'
})
export class InvoiceInterfaceService {

  constructor(private coreApi: CoreAPIService) { }

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
  getInvoicePartial(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/Partial',
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

  getReleaseInvoiceAmount(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ReleaseInvoice/Details',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  upsertReleaseInvoiceScopes(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ReleaseInvoice/UpsertScope',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getReleaseInvoiceTemplate(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ReleaseInvoice/GetTemplateInfo/'+request.projectid+'/'+request.invoiceid,
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  upsertReleaseInvoiceAmount(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ReleaseInvoice',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getReleaseInvoiceDetails(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ReleaseInvoice/GetDetailedInfo',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  upsertTransportInvoiceScope(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/Transport',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getTransportScopeByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/Transport/' + param.id,
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteInvoiceTransportationScope(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/Transport/' + params.id,
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  upsertDutyTravelInvoiceScope(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/DutyTravel',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getDutyTravelScopeByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/DutyTravel/' + param.id,
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteInvoiceDutyTravelScope(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/DutyTravel/' + params.id,
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  upsertOfcRentInvoiceScope(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/OfcRent',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getOfcRentScopeByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/OfcRent/' + param.id,
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteInvoiceOfcRentScope(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/OfcRent/' + params.id,
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  upsertOfcSupplyInvoiceScope(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/OfcSupply',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getOfcSupplyScopeByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/OfcSupply/' + param.id,
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteInvoiceOfcSupplyScope(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/OfcSupply/' + params.id,
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  upsertOfcFurnitureInvoiceScope(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/OfcFurniture',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getOfcFurnitureScopeByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/OfcFurniture/' + param.id,
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteInvoiceOfcFurnitureScope(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/OfcFurniture/' + params.id,
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  upsertReportDocInvoiceScope(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/ReportDoc',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getReportDocScopeByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/ReportDoc/' + param.id,
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteInvoiceReportDocScope(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/ReportDoc/' + params.id,
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  upsertRoadSurveyInvoiceScope(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/RoadSurvey',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getRoadSurveyScopeByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/RoadSurvey/' + param.id,
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteInvoiceRoadSurveyScope(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/RoadSurvey/' + params.id,
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  upsertStaffInvoiceScope(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/Staff',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getStaffScopeByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/Staff/' + param.id,
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteInvoiceStaffScope(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/Staff/' + params.id,
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  upsertContingencyInvoiceScope(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/Contingency',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getContingencyScopeByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/Contingency/' + param.id,
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteContingencyScope(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Invoice/Contingency/' + params.id,
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }

}
