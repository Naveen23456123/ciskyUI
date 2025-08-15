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
      { label: 'Tender_Id', value: 'tenderId' },
      { label: 'Project_Code', value: 'projectCode' },
      { label: 'Short_Name', value: 'projectShortName' },
      { label: 'Location', value: 'projectLocation' },
      { label: 'Project Name', value: 'projectName' },
      { label: 'Key_Points', value: 'keyPoints' },
      { label: 'Company', value: 'companyId' },
      { label: 'Our_Role', value: 'ourRoleId' },
      { label: 'Project_Length', value: 'projectLength' },
      { label: 'Bid_Due_Date', value: 'bidDueDate' },
      { label: 'LOA_Date', value: 'loaDate' },
      { label: 'Agreement_date', value: 'agreementDate' },
      { label: 'Commencement_Date', value: 'commencementDate' },
      { label: 'Schedule_Construction_Complete_Date', value: 'scheduleConstructionCompleteDate' },
      { label: 'Auth_Engineer', value: 'authengineer' },
      { label: 'Cordinator', value: 'cordinator' },
      { label: 'Remark', value: 'remark' },
      { label: 'Consultancy_Fees', value: 'consultancyFees' },
      { label: 'Contract_Mode', value: 'contractmodeid' },
      { label: 'Lead', value: 'lead' },
      { label: 'JV', value: 'jv' },
      { label: 'Our_Share', value: 'ourshare' },
      { label: 'JV_Share', value: 'jvshare' },
      { label: 'Association', value: 'association' },
      { label: 'Client', value: 'client' },
      { label: 'Regional_Office_Name', value: 'regionalofficename' },
      { label: 'Regional_Office_Address', value: 'regionalofficeaddress' },
      { label: 'Member_Name', value: 'membername' },
      { label: 'Member_Location', value: 'memberlocation' },
      { label: 'Director_Name', value: 'directorname' },
      { label: 'Director_Location', value: 'directorlocation' },
      { label: 'PIU_Address', value: 'piuaddress' },
      { label: 'Site_Address', value: 'siteaddress' },
      { label: 'Client_Address', value: 'clientaddress' }
    ];
  return columns;
  }
  getCSVTemplateColumnList() {
    let columns = [
      { label: 'Project_Code', value: 'projectcode' },
      { label: 'Short_Name', value: 'projectshortname' },
      { label: 'Location', value: 'projectlocation' },
      { label: 'Project Name', value: 'projectname' },
      { label: 'Project_Length', value: 'projectlength' },
      { label: 'Agreement_date', value: 'agreementdate' },
      { label: 'Commencement_Date', value: 'commencementdate' },
      { label: 'Our_Share', value: 'ourshare' },
      { label: 'JV_Share', value: 'jvshare' },
      { label: 'Client', value: 'client' }
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
  createBulkConsultants(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant/Bulk',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getProjectIncome(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant/Income',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  } 

  getProjectIncomeSummary(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant/IncomeSummary',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getProjectExpenseSummary(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant/ExpenseSummary',
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

  getAllProjectDetailsByOrdIg(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant/Search',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
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

  getProjectCountSummary(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant/Summary',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  
  }
  getProjectRoleCountSummary(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant/RoleSummary',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);  
  }
  getProjectListSummary(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant/ListSummary',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getProjectInfoSummary(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Consultant/InfoSummary',
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
