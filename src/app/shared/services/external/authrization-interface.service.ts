import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class AuthrizationInterfaceService {

  constructor(private coreApiService:CoreAPIService) { }

  login(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Auth/Login',
      params: false,
      headers: true,
      guid: guid,
      request: request,
      action: Operation.CREATE
    }
    return this.coreApiService.standardService(standardAttribute);
  }
  forgotPassword(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Auth/forgot-password',
      params: false,
      headers: true,
      guid: guid,
      request: request,
      action: Operation.CREATE
    }
    return this.coreApiService.standardService(standardAttribute);
  }
  resetPassword(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Auth/reset-password',
      params: false,
      headers: true,
      guid: guid,
      request: request,
      action: Operation.CREATE
    }
    return this.coreApiService.standardService(standardAttribute);
  }
  changePassword(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Auth/change-password',
      params: false,
      headers: true,
      guid: guid,
      request: request,
      action: Operation.CREATE
    }
    return this.coreApiService.standardService(standardAttribute);
  } 
  getUserInfo(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Auth/UserInfo',
      params: {},
      headers: true,
      guid: guid,
      request: {},
      action: Operation.GET
    }
    return this.coreApiService.standardService(standardAttribute);
  }
}
