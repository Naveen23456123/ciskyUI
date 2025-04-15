import { Injectable, Type } from '@angular/core';
import { ContractorBillingListComponent } from '@app/shared/components/contractor-billing/contractor-billing-list/contractor-billing-list.component';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class ContractorInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getContractorBillingListComponent(){
            return {
              component: ContractorBillingListComponent,
              inputs: {
                headline: 'Contractor Billings'
              }
        } as {component: Type<any>, inputs: Record<string, unknown>}
    }

  getTemplateColumnList() {
    let columns = [
      { label: 'name', value: 'name' },
      { label: 'cost', value: 'cost' },
      { label: 'projectlength', value: 'projectlength' },
      { label: 'contractorbidduedate', value: 'contractorbidduedate' },
      { label: 'loaawarddate', value: 'loaawarddate' },
      { label: 'agreementdate', value: 'agreementdate' },
      { label: 'projectduration', value: 'projectduration' },
      { label: 'commencementdate', value: 'commencementdate' },
      { label: 'actualcompletiondate', value: 'actualcompletiondate' },
      { label: 'schedulecompletiondate', value: 'schedulecompletiondate' },
      { label: 'actualconstructioncompletiondate', value: 'actualconstructioncompletiondate' },
      { label: 'scheduleconstructioncompletiondate', value: 'scheduleconstructioncompletiondate' },
      { label: 'contractoraddress', value: 'contractoraddress' },
          
    ];
  return columns;
  }


  getAllContractorDetailsByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'Contractor',
        params: param,
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
//    return of([{
//     "id": "a514bfe9-3417-4b6a-a999-72670cfa247f",
//     "contractors": [
//         {
//             "id": "54814cf2-e2bc-11ef-9964-e751e23a1ffa",
//             "name": "M/s ABC Projects Limited - Pkg 67",
//             "cost": "78737333",
//             "costwithcos": null,
//             "projectlength": "35",
//             "contractorbidduedate": null,
//             "loaawarddate": null,
//             "agreementdate": "2019-09-05",
//             "projectduration": "36",
//             "commencementdate": "2019-09-05",
//             "actualcompletiondate": null,
//             "schedulecompletiondate": null,
//             "schedulecompletiondatewitheot": null,
//             "actualconstructioncompletiondate": "2024-06-15",
//             "scheduleconstructioncompletiondate": "2024-07-15",
//             "scheduleconstructioncompletiondatewitheot": null,
//             "contractoraddress": "",
//             "eots": [],
//             "coss": [],
//             "billingdetails": [
//                 {
//                     "billsubmittedtotal": 0,
//                     "siterecommendedbillamount": 0,
//                     "recommendedbillamount": 0
//                 }
//             ],
//             "latestprogress": {
//                 "financialprogress": null,
//                 "physicalprogress": null,
//                 "month": null,
//                 "year": null
//             }
//         },
//         {
//             "id": "6ac68054-e2bc-11ef-9964-e751e23a1ffa",
//             "name": "M/s ABC Projects Limited - Pkg 4",
//             "cost": "2133000000",
//             "costwithcos": null,
//             "projectlength": "20",
//             "contractorbidduedate": null,
//             "loaawarddate": null,
//             "agreementdate": "2018-12-13",
//             "projectduration": "36",
//             "commencementdate": "2018-12-13",
//             "actualcompletiondate": null,
//             "schedulecompletiondate": null,
//             "schedulecompletiondatewitheot": null,
//             "actualconstructioncompletiondate": "2023-03-18",
//             "scheduleconstructioncompletiondate": "2023-03-18",
//             "scheduleconstructioncompletiondatewitheot": null,
//             "contractoraddress": "",
//             "eots": [],
//             "coss": [],
//             "billingdetails": [
//                 {
//                     "billsubmittedtotal": 0,
//                     "siterecommendedbillamount": 0,
//                     "recommendedbillamount": 0
//                 }
//             ],
//             "latestprogress": {
//                 "financialprogress": null,
//                 "physicalprogress": null,
//                 "month": null,
//                 "year": null
//             }
//         },
//         {
//             "id": "8aac3972-e2bc-11ef-9964-e751e23a1ffa",
//             "name": "M/s ABC Projects Limited - Pkg 5",
//             "cost": "1881000000",
//             "costwithcos": null,
//             "projectlength": "22",
//             "contractorbidduedate": null,
//             "loaawarddate": null,
//             "agreementdate": "2018-12-20",
//             "projectduration": "36",
//             "commencementdate": "2018-12-20",
//             "actualcompletiondate": null,
//             "schedulecompletiondate": null,
//             "schedulecompletiondatewitheot": null,
//             "actualconstructioncompletiondate": "2023-04-23",
//             "scheduleconstructioncompletiondate": "2023-04-23",
//             "scheduleconstructioncompletiondatewitheot": null,
//             "contractoraddress": "",
//             "eots": [],
//             "coss": [],
//             "billingdetails": [
//                 {
//                     "billsubmittedtotal": 0,
//                     "siterecommendedbillamount": 0,
//                     "recommendedbillamount": 0
//                 }
//             ],
//             "latestprogress": {
//                 "financialprogress": null,
//                 "physicalprogress": null,
//                 "month": null,
//                 "year": null
//             }
//         }
//     ],
//     "siteprcode": "67234343",
//     "projectname": "Demo project Name of Jaipur having the length of 78- KM",
//     "projectshortname": "AE Demp Project"
//   }]);
  }
  
  getAllContractorPartialDetailsByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'Contractor/Partial',
        params: param,
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
  }
  getAllContractorDetailsListViewById(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'Contractor/DetailsView/'+param.id,
        params: {},
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
  }
  getContractorBillingByProjectIdandOrgId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ContractorBill',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
    // return of([
    //     {
    //         "billperiodstart": "2024-01-01",
    //         "billperiodend": "2024-01-31",
    //         "contractors": [
    //             {
    //                 "contractor": "M/S J. Kumar Infra project Ltd. - M/S J. M. Mhatre Infra Pvt. Ltd. (JV)",
    //                 "bill": [
    //                     {
    //                         "id": "efc3e4d2-12aa-485f-90f7-01e64913091e",
    //                         "billtype": "ipc",
    //                         "billnum": "73",
    //                         "billcatagory": "bills",
    //                         "month": null,
    //                         "year": null,
    //                         "billperiodstart": "2024-01-01",
    //                         "billperiodend": "2024-01-31",
    //                         "submittedbilldate": "2024-02-12",
    //                         "recomendedbilldate": null,
    //                         "submittedbillamount": "6607776.00",
    //                         "recommendedbillamount": "0.00",
    //                         "recommendedpercentage": "NaN",
    //                         "submittedpercentage": "19.09",
    //                         "ldamount": null,
    //                         "withheldamt": null,
    //                         "releasedwithheldamt": null,
    //                         "deductionamount": null,
    //                         "contractordeductionamt": "281933.00",
    //                         "workdoneamt": "5081703.00",
    //                         "percentageamt": "1261554.80",
    //                         "remark": null,
    //                         "siterecomendedbilldate": null,
    //                         "siterecommendedbillamount": "6607776.00",
    //                         "siterecommendedpercentage": "104.46",
    //                         "siteldamount": "0.00",
    //                         "sitewithheldamt": "0.00",
    //                         "sitereleasedwithheldamt": "0.00",
    //                         "sitedeductionamount": "281933.00",
    //                         "siteremark": "IPC-73 of Contractor M/s J.Kumar-JMM (JV) up to Jan 2024 reg.",
    //                         "siteattachment": "https://cipl-aimantra.s3.amazonaws.com/billingdetailfield/IPC-73PKG-3.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250226%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250226T061013Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=7a9b98e4dc1d1f6ce06e5181fe02c50cf1a765af6606a49815f1470fceeb98ac",
    //                         "siteworkdoneamt": "5081703.00",
    //                         "sitepercentageamt": "1261554.87",
    //                         "hoattachment": null,
    //                         "adminapprovalfordlt": false,
    //                         "reqraisedbyAE": null,
    //                         "escalation": "1655610.45",
    //                         "gst": "152396",
    //                         "siteescalation": "1655610.45",
    //                         "sitegst": "152396",
    //                         "hoescalation": null,
    //                         "hogst": null,
    //                         "createdat": "2025-01-23T13:37:33.968481Z",
    //                         "howorkdoneamt": null,
    //                         "hopercentageamt": null,
    //                         "project": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09",
    //                         "contractor": "8133ed32-d7cb-11ef-9964-e751e23a1ffa",
    //                         "submittedletternum": null,
    //                         "recomendedletternum": null,
    //                         "contractorname": null
    //                     },
    //                     {
    //                         "id": "efc3e4d2-12aa-485f-90f7-01e64913091e",
    //                         "billtype": "ipc",
    //                         "billnum": "73",
    //                         "billcatagory": "bills",
    //                         "month": null,
    //                         "year": null,
    //                         "billperiodstart": "2024-01-01",
    //                         "billperiodend": "2024-01-31",
    //                         "submittedbilldate": "2024-02-12",
    //                         "recomendedbilldate": null,
    //                         "submittedbillamount": "6607776.00",
    //                         "recommendedbillamount": "0.00",
    //                         "recommendedpercentage": "NaN",
    //                         "submittedpercentage": "19.09",
    //                         "ldamount": null,
    //                         "withheldamt": null,
    //                         "releasedwithheldamt": null,
    //                         "deductionamount": null,
    //                         "contractordeductionamt": "281933.00",
    //                         "workdoneamt": "5081703.00",
    //                         "percentageamt": "1261554.80",
    //                         "remark": null,
    //                         "siterecomendedbilldate": null,
    //                         "siterecommendedbillamount": "6607776.00",
    //                         "siterecommendedpercentage": "104.46",
    //                         "siteldamount": "0.00",
    //                         "sitewithheldamt": "0.00",
    //                         "sitereleasedwithheldamt": "0.00",
    //                         "sitedeductionamount": "281933.00",
    //                         "siteremark": "IPC-73 of Contractor M/s J.Kumar-JMM (JV) up to Jan 2024 reg.",
    //                         "siteattachment": "https://cipl-aimantra.s3.amazonaws.com/billingdetailfield/IPC-73PKG-3.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250226%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250226T061013Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=7a9b98e4dc1d1f6ce06e5181fe02c50cf1a765af6606a49815f1470fceeb98ac",
    //                         "siteworkdoneamt": "5081703.00",
    //                         "sitepercentageamt": "1261554.87",
    //                         "hoattachment": null,
    //                         "adminapprovalfordlt": false,
    //                         "reqraisedbyAE": null,
    //                         "escalation": "1655610.45",
    //                         "gst": "152396",
    //                         "siteescalation": "1655610.45",
    //                         "sitegst": "152396",
    //                         "hoescalation": null,
    //                         "hogst": null,
    //                         "createdat": "2025-01-23T13:37:33.968481Z",
    //                         "howorkdoneamt": null,
    //                         "hopercentageamt": null,
    //                         "project": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09",
    //                         "contractor": "8133ed32-d7cb-11ef-9964-e751e23a1ffa",
    //                         "submittedletternum": null,
    //                         "recomendedletternum": null,
    //                         "contractorname": null
    //                     }
    //                 ],
    //                 "balancebill": []
    //             }
    //         ]
    //     }
    // ])
  }

  createContractor(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Contractor',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateContractor(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Contractor',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteContractor(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Contractor',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createContractorBill(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ContractorBill',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateContractorBill(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ContractorBill',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteContractorBill(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'ContractorBill',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }

}
