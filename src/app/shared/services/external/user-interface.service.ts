import { Injectable } from '@angular/core';
import { CoreAPIService } from './coreapi.service';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { Operation } from '@app/shared/models/http/ActionModel';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {  
  
    constructor(private coreApi:CoreAPIService) { }
    
    getUserPartialDetails(request: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'User/Partial',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
      }
      return this.coreApi.standardService(standardAttribute);
    }
}
