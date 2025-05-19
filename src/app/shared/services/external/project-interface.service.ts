import { Injectable, Type } from '@angular/core';
import { MilestoneListComponent } from '@app/shared/components/milestone/milestone-list/milestone-list.component';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getTemplateColumnList() {
    let columns = [
      { label: 'Month', value: 'siteprcode' },
      { label: 'Year', value: 'projectname' },
      { label: 'Physical_Progress', value: 'projectshortname' },
      { label: 'Financial_Progress', value: 'location' },
      { label: 'Month', value: 'subcompany' },
      { label: 'Year', value: 'worktype' },
      { label: 'Physical_Progress', value: 'bidduedate' },
      { label: 'Financial_Progress', value: 'loaawarddate' },
      { label: 'Month', value: 'actualconstructioncompletiondate' },
      { label: 'Year', value: 'scheduleconstructioncompletiondate' },
      { label: 'Physical_Progress', value: 'agreementdate' },
      { label: 'Financial_Progress', value: 'concernpersonname' },
      { label: 'Month', value: 'tenderid' },
      { label: 'Year', value: 'actualcompletiondate' },
      { label: 'Physical_Progress', value: 'schedulecompletiondate' },
      { label: 'Financial_Progress', value: 'remark' },
      { label: 'Month', value: 'projectlength' },
      { label: 'Year', value: 'consultancyfees' },
      { label: 'Physical_Progress', value: 'contractmode' },
      { label: 'Financial_Progress', value: 'jv' },
      { label: 'Month', value: 'lead' },
      { label: 'Year', value: 'ourshare' },
      { label: 'Physical_Progress', value: 'association' },
      { label: 'Financial_Progress', value: 'clientname' },
      { label: 'Financial_Progress', value: 'projectkeypoint' },
      { label: 'Month', value: 'ro' },
      { label: 'Year', value: 'roaddress' },
      { label: 'Physical_Progress', value: 'piuaddress' },
      { label: 'Financial_Progress', value: 'projectduration' },
      { label: 'Physical_Progress', value: 'ourrole' },
      { label: 'Financial_Progress', value: 'siteofficeaddress' },
    ];
  return columns;
  }
  createProject(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }

  updateProject(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteProject(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }

  getAllProjectDetailsByOrdIg(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  //  return of([  
  //   {
  //     "id": "a514bfe9-3417-4b6a-a999-72670cfa247f",
  //     "code": "9837525324",
  //     "name": "Consultancy Services for Authority's Engineer for Supervision of \"Two Lane with Hard shoulders of  Pfutsero  -  Phek  Road  from  (i)  Design  Km.  0.000  to  Km.  20.000  (existing  Km.  0.000  to  Km. 19.900) (ii) Desing Km. 20.000 to Km. 40.000 (Existing Km. 19.900 to Km. 40.090) (iii) Design km. 40.000 to Km. 62.558 (Existing Km. 40.090 to Km. 65.300)\" in the state of Nagaland under SARDP -NE on EPC Mode.",
  //     "shortname": "AE Demo Project",
  //     "location": "Ambala",
  //     "concernpersonname": "Rohit Singh",
  //     "tenderid": null,
  //     "projectLength": "62.558",
  //     "ro": null,
  //     "roaddress": "H. No. 330, patel nagar, Jaipur, Sirsi Road",
  //     "piuaddress": "Rohit Singh Director PIU -Jaipur, Address: H. No. 330, patel nagar, Jaipur, Sirsi Road",
  //     "siteofficeaddress": null,
  //     "agreementdate": null,
  //     "commencementdate": null,
  //     "agreementfileupload": null,
  //     "commencementfileupload": null,
  //     "projectduration": null,
  //     "ourshare": null,
  //     "clientname": "NHIDCL",
  //     "loaawarddate": null,
  //     "actualcompletiondate": null,
  //     "schedulecompletiondate": null,
  //     "schedulecompletiondatewitheot": null,
  //     "actualconstructioncompletiondate": null,
  //     "scheduleconstructioncompletiondate": "2022-03-27",
  //     "scheduleconstructioncompletion_date_with_eot": null,
  //     "projectcompletiondate": null,
  //     "bidduedate": null,
  //     "worktype": "construction consultant",
  //     "remark": null,
  //     "projectkeypoint": null,
  //     "consultancyfees": "139431656",
  //     "contractmode": "epc",
  //     "lead": "M/S ABC Infra Consultant Limited.",
  //     "jv": "M/s ABC Associates",
  //     "association": null,
  //     "jvshare": null,
  //     "status": "In Progress including O&M",
  //     "ourrole": "silent",
  //     "adminapprovalfordlt": false,
  //     "reqraisedbyAE": null,
  //     "esclation": null,
  //     "isescalationadded": false,
  //     "ourservices": null,
  //     "createdat": "2025-01-23T13:37:37.535034Z",
  //     "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
  //     "authorityengineer": null,
  //     "consultancyaccountdetails": null,
  //     "comoperators": []
  // }
  //   ]);
  }
  getAllProjectPartialDetailsByOrdIg(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant/Partial',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  
  }
  getProjectScopeDurationById(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant/ScopeDuration/'+params.id,
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  
  }
  getAllProjectDetailsById(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant/'+params.id,
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  
  }
  
}
