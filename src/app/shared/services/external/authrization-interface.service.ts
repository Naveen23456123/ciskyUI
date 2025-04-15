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
      url: 'Login/Login',
      params: false,
      headers: true,
      guid: guid,
      request: request,
      action: Operation.CREATE
    }
    return this.coreApiService.standardService(standardAttribute);
  }
}
