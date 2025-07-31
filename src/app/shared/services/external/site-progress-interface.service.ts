import { Injectable,Type } from '@angular/core';
import { SiteProgressListComponent } from '@app/shared/components/site-progress/site-progress-list/site-progress-list.component';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class SiteProgressInterfaceService {

  constructor(private coreApi :CoreAPIService) { }
  
  getCSVTemplateColumnList() {
    let columns = [
      { label: 'Month_Year', value: 'monthandyear' },
      { label: 'Project', value: 'project' },
      { label: 'Contractor', value: 'contractor' },
      { label: 'Submitted_Physical_Progress', value: 'submittedphysicalprogress' },
      { label: 'Submitted_Financial_Progress', value: 'submittedfinancialprogress' },
      { label: 'Status', value: 'status' },
    
    ];
  return columns;
  }
  getSiteProgressListComponent(){
        return {
          component: SiteProgressListComponent,
          inputs: {
            headline: 'Openings in all departments',
            body: 'Apply today',
          }
       } as {component: Type<any>, inputs: Record<string, unknown>}
      }

  getAllSiteProgressByOrdIdProjectId(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SiteProgress/Search',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  //   return of([
  //     {
  //         "id": "100776ba-702c-4978-9b20-c9203c110427",
  //         "financialprogress": "91.36",
  //         "physicalprogress": "91.62",
  //         "month": "12",
  //         "year": "2024",
  //         "submittedphysicalprogress": "91.62",
  //         "submittedfinancialprogress": "91.36",
  //         "createdat": "2025-01-23T13:37:37.424183Z",
  //         "project": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09",
  //         "submittedletter": "9af2c456-8e2c-4a38-a808-375dc4b06943",
  //         "approvedletter": "9af2c456-8e2c-4a38-a808-375dc4b06943",
  //         "contractor": "8133ed32-d7cb-11ef-9964-e751e23a1ffa"
  //     }
  // ]);
  }
  createSiteProgress(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SiteProgress',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateSiteProgress(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SiteProgress',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteSiteProgress(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SiteProgress',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }

}
