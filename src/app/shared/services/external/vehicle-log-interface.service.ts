import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleLogInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getVehicleLogDetails(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'VehicleLog',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getVehicleViewLogDetails(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'VehicleLog/ViewLogs',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createVehicleLog(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'VehicleLog',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateVehicleLog(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'VehicleLog',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteVehicleLog(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'VehicleLog',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }

}
