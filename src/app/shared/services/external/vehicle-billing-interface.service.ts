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
  generateBulkVehicleBilling(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'VehicleBilling/GenearateBilling',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  actVehicleBilling(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'VehicleBilling/Action',
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
  deleteVehicleBilling(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'VehicleBilling/Delete/'+request.id,
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  searchVehicleBillingRequests(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'VehicleBilling/Requests',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  } 
  getVehicleBillingById(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'VehicleBilling/GetDetails/'+request.id,
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  } 

}
