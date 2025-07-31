import { Injectable,Type } from '@angular/core';
import { MilestoneListComponent } from '@app/shared/components/milestone/milestone-list/milestone-list.component';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class MilestoneInterfaceService {

  constructor(private coreApi:CoreAPIService) { }


  getCSVTemplateColumnList() {
    let columns = [
      { label: 'Name', value: 'name' },
      { label: 'Project', value: 'project' },
      { label: 'Contractor', value: 'contractor' },
      { label: 'Appointed_Date', value: 'appointeddate' },
      { label: 'Milestone_Date', value: 'milestonedate' },
      { label: 'Status', value: 'status' },
    
    ];
  return columns;
  }  
  getMilestoneListComponent(){
      return {
        component: MilestoneListComponent,
        inputs: {
          headline: 'Openings in all departments',
          body: 'Apply today',
        }
    } as {component: Type<any>, inputs: Record<string, unknown>}
  }

  getAllMilestonesDetailsByOrdIdProjectId(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'MileStone/Search',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
//   return of([
//     {
//         "id": "661f5e3a-04e3-4163-a3e7-32c08c64ba8c",
//         "contractorname": "M/S J. Kumar Infra project Ltd. - M/S J. M. Mhatre Infra Pvt. Ltd. (JV)",
//         "name": "Milestone I",
//         "milestonedate": "2016-11-12",
//         "milestoneasperreschedule": null,//reschedule date 
//         "milestoneasperactual": null, // Complete date when work done 
//         "day": "180",
//         "rescedulegapdays": "",// automatically bdate 
//         "actualgapdays": "",
//         "createdat": "2025-01-23T13:37:37.242070Z",
//         "workperformedby": "contractor",
//         "project": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09",
//         "letter": null,
//         "contractor": "8133ed32-d7cb-11ef-9964-e751e23a1ffa",
//         "rescheduleletter": null,
//         "actualletter": null
//     },
//     {
//         "id": "4905b765-fd74-4520-b43b-e967dee000cd",
//         "contractorname": "M/S J. Kumar Infra project Ltd. - M/S J. M. Mhatre Infra Pvt. Ltd. (JV)",
//         "name": "Milestone II",
//         "milestonedate": "2017-05-16",
//         "milestoneasperreschedule": null,
//         "milestoneasperactual": null,
//         "day": "365",
//         "rescedulegapdays": "",
//         "actualgapdays": "",
//         "createdat": "2025-01-23T13:37:37.242070Z",
//         "workperformedby": "contractor",
//         "project": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09",
//         "letter": null,
//         "contractor": "8133ed32-d7cb-11ef-9964-e751e23a1ffa",
//         "rescheduleletter": null,
//         "actualletter": null
//     },
//     {
//         "id": "25391853-4dfd-498e-8465-2987f7af6c2f",
//         "contractorname": "M/S J. Kumar Infra project Ltd. - M/S J. M. Mhatre Infra Pvt. Ltd. (JV)",
//         "name": "Milestone III",
//         "milestonedate": "2017-11-17",
//         "milestoneasperreschedule": null,
//         "milestoneasperactual": null,
//         "day": "550",
//         "rescedulegapdays": "",
//         "actualgapdays": "",
//         "createdat": "2025-01-23T13:37:37.242070Z",
//         "workperformedby": "contractor",
//         "project": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09",
//         "letter": null,
//         "contractor": "8133ed32-d7cb-11ef-9964-e751e23a1ffa",
//         "rescheduleletter": null,
//         "actualletter": null
//     }
// ]);
  }
    createMileStone(request: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'MileStone',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
      }
      return this.coreApi.standardService(standardAttribute);
    }
    updateMileStone(request: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'MileStone',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.UPDATE
      }
      return this.coreApi.standardService(standardAttribute);
    }
    deleteMileStone(params: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'MileStone',
        params: params,
        headers: true,
        guid: '',
        request: {},
        action: Operation.DELETE
      }
      return this.coreApi.standardService(standardAttribute);
    }
}
