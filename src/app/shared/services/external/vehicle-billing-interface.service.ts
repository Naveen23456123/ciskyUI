import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleBillingInterfaceService {

  constructor(private coreApi:CoreAPIService) { }
  
  getVehicleBillingDetails(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'VehicleBilling/SearchBilling',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createVehicleBilling(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'VehicleBilling',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateVehicleBilling(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'VehicleBilling',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteVehicleBilling(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'VehicleBilling',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }

}
