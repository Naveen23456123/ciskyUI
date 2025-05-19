import { Injectable ,Type} from '@angular/core';
import { ManageLettersListComponent } from '@app/shared/components/letters/manage-letters-list/manage-letters-list.component';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class LetterInterfaceService {

  constructor(private coreApi :CoreAPIService) { }

  getTemplateColumnList() {
    let columns = [
      { label: 'Project Code', value: 'project' },
      { label: 'Letter_Number', value: 'letternumber' },
      { label: 'Exchange_Type', value: 'exchangetypeid' },
      { label: 'Related_To', value: 'relatedtoid' },
      { label: 'Reply_By', value: 'replybyid' },
      { label: 'Letter_Type', value: 'lettertype' },
      { label: 'Letter_Date', value: 'letterdate' },
      { label: 'Subject', value: 'subject' },
      { label: 'Department', value: 'department' },
      { label: 'Status', value: 'statusid' },
      { label: 'Letter_From', value: 'letterfrom' },
      { label: 'Letter_To', value: 'letterto' },
      { label: 'Contractor', value: 'contractor' },
      { label: 'Remarks', value: 'remarks' },
    ];
  return columns;
  }

  getContractorLettersListComponent(){
        return {
          component: ManageLettersListComponent,
          inputs: {
            headline: 'Openings in all departments',
            body: 'Apply today',
          }
      } as {component: Type<any>, inputs: Record<string, unknown>}
  }

  getLettersListComponent(){
    return {
      component: ManageLettersListComponent,
      inputs: {
      }
  } as {component: Type<any>, inputs: Record<string, unknown>}
}

  getAllContractorLettersDetailsByOrdIdProjectId(param: any, guid: string) {
    return of([{
      "id": "f17f623f-e0dc-4e14-a61f-1cf34e327cd1",
      "siteprcode": "230604123015",
      "projectshortname": "AE JNPT Pkg-3",
      "associatedletters": [],
      "associatedlettersget": [],
      "documents": [
          {
              "id": "3d707c92-1264-468a-a4ab-d7fc0c3eb26d",
              "documentname": "Contractor letter",
              "documentfile": "https://cipl-aimantra.s3.amazonaws.com/documents/Aimantra2025-01-2212-03-35aXCElDdcontractorletter.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250212%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250212T112714Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8eaf555ab7c2739f55f1d30928c39453b4e1b0a218666da27763c7f508d0ed75",
              "documenttype": null,
              "createdat": "2025-01-22T06:33:41.718673Z",
              "project": null,
              "emolyee": null,
              "contractor": null,
              "vehicledocs": null,
              "employeedocs": null,
              "certifications": null,
              "lettertracking": null,
              "letterrecord": "f17f623f-e0dc-4e14-a61f-1cf34e327cd1",
              "miscellaneousdocs": null,
              "officerent": null,
              "letterstracking": null
          },
          {
              "id": "939706d3-6500-4bed-af33-08d19b7cd1d6",
              "documentname": "Yongma/AGICL/AE/JNPT-III/Feb/2024/2452",
              "documentfile": "https://cipl-aimantra.s3.amazonaws.com/documents/Aimantra2025-01-2212-03-35fwrAOIPC-73PKG-3.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250212%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250212T112714Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=346f547c51d70e595c9fab90dca770eb0a307016186214a717636cf7e2cdea55",
              "documenttype": null,
              "createdat": "2025-01-22T06:33:41.841417Z",
              "project": null,
              "emolyee": null,
              "contractor": null,
              "vehicledocs": null,
              "employeedocs": null,
              "certifications": null,
              "lettertracking": null,
              "letterrecord": "f17f623f-e0dc-4e14-a61f-1cf34e327cd1",
              "miscellaneousdocs": null,
              "officerent": null,
              "letterstracking": null
          }
      ],
      "letternum": "NHIDC/7832434-PKG123-DUPLICATE",
      "replyby": null,
      "subject": "Interim Payment ABC Application",
      "letterdate": "2024-02-08",
      "status": "close",
      "lettertype": "billing",
      "workperformedby": "contractor",
      "letterExchange": "receive",
      "letterfrom": "NHIDC",
      "letterto": "NHAI ABC Office",
      "reviewedby": null,
      "adminapprovalfordlt": false,
      "reqraisedbyAE": null,
      "remarks": null,
      "createdat": "2025-01-23T13:37:37.167413Z",
      "project": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09",
      "contractor": "8133ed32-d7cb-11ef-9964-e751e23a1ffa",
      "letterdepartment": "efcf3c28-2dba-4058-adc6-1a5644bdd8f5"
  }]);
  }
  getAllConsultantLettersDetailsByOrdIdProjectId(param: any, guid: string) {
    return of([{
      "id": "f17f623f-e0dc-4e14-a61f-1cf34e327cd1",
      "siteprcode": "230604123015",
      "projectshortname": "AE JNPT Pkg-3",
      "associatedletters": [],
      "associatedlettersget": [],
      "documents": [
          {
              "id": "3d707c92-1264-468a-a4ab-d7fc0c3eb26d",
              "documentname": "Contractor letter",
              "documentfile": "https://cipl-aimantra.s3.amazonaws.com/documents/Aimantra2025-01-2212-03-35aXCElDdcontractorletter.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250212%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250212T112714Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8eaf555ab7c2739f55f1d30928c39453b4e1b0a218666da27763c7f508d0ed75",
              "documenttype": null,
              "createdat": "2025-01-22T06:33:41.718673Z",
              "project": null,
              "emolyee": null,
              "contractor": null,
              "vehicledocs": null,
              "employeedocs": null,
              "certifications": null,
              "lettertracking": null,
              "letterrecord": "f17f623f-e0dc-4e14-a61f-1cf34e327cd1",
              "miscellaneousdocs": null,
              "officerent": null,
              "letterstracking": null
          },
          {
              "id": "939706d3-6500-4bed-af33-08d19b7cd1d6",
              "documentname": "Yongma/AGICL/AE/JNPT-III/Feb/2024/2452",
              "documentfile": "https://cipl-aimantra.s3.amazonaws.com/documents/Aimantra2025-01-2212-03-35fwrAOIPC-73PKG-3.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250212%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250212T112714Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=346f547c51d70e595c9fab90dca770eb0a307016186214a717636cf7e2cdea55",
              "documenttype": null,
              "createdat": "2025-01-22T06:33:41.841417Z",
              "project": null,
              "emolyee": null,
              "contractor": null,
              "vehicledocs": null,
              "employeedocs": null,
              "certifications": null,
              "lettertracking": null,
              "letterrecord": "f17f623f-e0dc-4e14-a61f-1cf34e327cd1",
              "miscellaneousdocs": null,
              "officerent": null,
              "letterstracking": null
          }
      ],
     "letternum": "NHIDC/7832434-PKG123-DUPLICATE",
      "replyby": null,
      "subject": "Interim Payment ABC Application",
      "letterdate": "2024-02-08",
      "status": "close",
      "lettertype": "billing",
      "workperformedby": "contractor",
      "letterExchange": "receive",
      "letterfrom": "NHIDC",
      "letterto": "NHAI ABC Office",
      "reviewedby": null,
      "adminapprovalfordlt": false,
      "reqraisedbyAE": null,
      "remarks": null,
      "createdat": "2025-01-23T13:37:37.167413Z",
      "project": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09",
      "contractor": "8133ed32-d7cb-11ef-9964-e751e23a1ffa",
      "letterdepartment": "efcf3c28-2dba-4058-adc6-1a5644bdd8f5"
  }]);
  }

  getLettersByProjectIdAndContractorId(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'FetchLetter',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  getAllLetters(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Letter',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getLettersPartial(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Letter/Partial',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getLetterById(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Letter/GetById/'+param.id,
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getLetterDetailsById(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Letter/GetDetailsById/'+param.id,
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getLetterDocumentsById(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'Letter/Documents/'+param.id,
        params: {},
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
  }
  createLetter(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Letter',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createBulkLetter(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Letter/Bulk',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createLetterDocumentsById(request: any, guid: string) {
    console.log(request);
    const standardAttribute: ServiceAttributeModel = {
        url: 'Letter/Documents',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
      }
      return this.coreApi.standardService(standardAttribute);
  }
  searchLetters(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Letter/Search',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateLetter(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Letter',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteLetter(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Letter',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteLetterDocumentsById(request: any, guid: string) {
    console.log(request);
    const standardAttribute: ServiceAttributeModel = {
        url: 'Letter/DeleteDoc',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
      }
      return this.coreApi.standardService(standardAttribute);
  }
}
