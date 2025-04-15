import { Injectable,Type } from '@angular/core';
import { EotListComponent } from '@app/shared/components/eot/eot-list/eot-list.component';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class EotInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getTemplateColumnList() {
    let columns = [
      { label: 'eotcode', value: 'eotcode' },
      { label: 'processinitiatedate', value: 'processinitiatedate' },
      { label: 'approveddate', value: 'approveddate' },
      { label: 'approveddays', value: 'approveddays' },
      { label: 'letter', value: 'letter' },
      { label: 'eotstatus', value: 'eotstatus' },
    
    ];
  return columns;
  }

  getEotListComponent(){
          return {
            component: EotListComponent,
            inputs: {
              headline: 'Openings in all departments',
              body: 'Apply today',
            }
      } as {component: Type<any>, inputs: Record<string, unknown>}
  }

  getAllEOTDetailsByOrdIdProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'EOT',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  //   return of([
  //     {
  //         "id": "d68a8789-7a9c-4978-bfc6-5c4712502ec4",
  //         "contractorname": "M/S J. Kumar Infra project Ltd. - M/S J. M. Mhatre Infra Pvt. Ltd. (JV)",
  //         "letternumber": "JKIL-JMM(JV)/Pkg-III/2019/1459 or 1517",
  //         "projectshortname": "AE JNPT Pkg-3",
  //         "projectcode": "230604123015",
  //         "eotstatus": "Approved",
  //         "eotcode": "EOT - 02",
  //         "approveddate": "2020-02-25",
  //         "days": null,
  //         "approveddays": "750",
  //         "createdat": "2025-01-23T13:37:35.563354Z",
  //         "workperformedby": "contractor",
  //         "processinitiatedate": "2019-06-04",
  //         "project": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09",
  //         "letter": "22037efa-8a70-413d-be19-379c6b1024e5",
  //         "contractor": "8133ed32-d7cb-11ef-9964-e751e23a1ffa",
  //         "closeletter": "22037efa-8a70-413d-be19-379c6b1024e5"
  //     }
  // ]);
  }
    createEOT(request: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'EOT',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
      }
      return this.coreApi.standardService(standardAttribute);
    }
    updateEOT(request: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'EOT',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.UPDATE
      }
      return this.coreApi.standardService(standardAttribute);
    }
    deleteEOT(params: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'EOT',
        params: params,
        headers: true,
        guid: '',
        request: {},
        action: Operation.DELETE
      }
      return this.coreApi.standardService(standardAttribute);
    }
}
