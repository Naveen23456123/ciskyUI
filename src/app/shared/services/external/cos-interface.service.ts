import { Injectable,Type } from '@angular/core';
import { CosListComponent } from '@app/shared/components/cos/cos-list/cos-list.component';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class CosInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getTemplateColumnList() {
    let columns = [
      { label: 'coscode', value: 'coscode' },
      { label: 'letter', value: 'letter' },
      { label: 'processinitiatedate', value: 'processinitiatedate' },
      { label: 'approvaldate', value: 'approvaldate' },
      { label: 'amount', value: 'amount' },
      { label: 'cosstatus', value: 'cosstatus' },
    ];
  return columns;
  }


   getCostListComponent(){
            return {
              component: CosListComponent,
              inputs: {
                headline: 'Openings in all departments',
                body: 'Apply today',
              }
        } as {component: Type<any>, inputs: Record<string, unknown>}
  }

  getAllCOSDetailsByOrdIdProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'COS',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  //   return of([
  //     {
  //         "id": "5081953c-4b34-4945-a936-5bf0c0da6480",
  //         "contractorname": "M/S J. Kumar Infra project Ltd. - M/S J. M. Mhatre Infra Pvt. Ltd. (JV)",
  //         "letternumber": "JKIL-JMM (JV)/PKG-3/2021/2233",
  //         "projectshortname": "AE JNPT Pkg-3",
  //         "projectcode": "230604123015",
  //         "cosstatus": "Approved",
  //         "coscode": "COS - XI",
  //         "approvaldate": "2021-04-19",
  //         "amount": "6284087.04",
  //         "approvedamount": "6284087.04",
  //         "createdat": "2025-01-27T10:29:34.732292Z",
  //         "workperformedby": "contractor",
  //         "processinitiatedate": "2021-06-30",
  //         "project": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09",
  //         "letter": "d6f7ce2d-d2b7-451b-83be-714b85ddba2c",
  //         "contractor": "8133ed32-d7cb-11ef-9964-e751e23a1ffa",
  //         "closeletter": "d6f7ce2d-d2b7-451b-83be-714b85ddba2c"
  //     }
  // ]);
  }
   createCOS(request: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'COS',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
      }
      return this.coreApi.standardService(standardAttribute);
    }
    updateCOS(request: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'COS',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.UPDATE
      }
      return this.coreApi.standardService(standardAttribute);
    }
    deleteCOS(params: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'COS',
        params: params,
        headers: true,
        guid: '',
        request: {},
        action: Operation.DELETE
      }
      return this.coreApi.standardService(standardAttribute);
    }
}
