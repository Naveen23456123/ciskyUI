import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from '../coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class BoqTransportationInterfaceService {

 constructor(private coreApi:CoreAPIService) { }
 
   getBoqTransportationListByProjectId(param: any, guid: string) {
     const standardAttribute: ServiceAttributeModel = {
       url: 'BoqTransportation/'+param.id,
       params: {},
       headers: true,
       guid: '',
       request: {},
       action: Operation.GET
     }
     return this.coreApi.standardService(standardAttribute);
   }
 
   createBoqTransportation(request: any, guid: string) {
     const standardAttribute: ServiceAttributeModel = {
       url: 'BoqTransportation',
       params: {},
       headers: true,
       guid: '',
       request: request,
       action: Operation.CREATE
     }
     return this.coreApi.standardService(standardAttribute);
   }
   updateBoqTransportation(request: any, guid: string) {
     const standardAttribute: ServiceAttributeModel = {
       url: 'BoqTransportation',
       params: {},
       headers: true,
       guid: '',
       request: request,
       action: Operation.UPDATE
     }
     return this.coreApi.standardService(standardAttribute);
   }
   deleteBoqTransportation(params: any, guid: string) {
     const standardAttribute: ServiceAttributeModel = {
       url: 'BoqTransportation',
       params: params,
       headers: true,
       guid: '',
       request: {},
       action: Operation.DELETE
     }
     return this.coreApi.standardService(standardAttribute);
   }
 }

