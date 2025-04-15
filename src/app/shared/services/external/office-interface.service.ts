import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeInterfaceService {

  constructor(private coreApi : CoreAPIService) { }

  getOfficeListByOrdIdProjectId(param: any, guid: string) {
    return of([
      {
          "id": "d094d487-830c-4626-80be-fddef0d0b184",
          "projectshortname": "AE, Agartala  Bypass Tripura",
          "projectcode": "230604158140",
          "documents": [],
          "shortname": null,
          "rentamt": "15000.00",
          "tdspercentage": null,
          "tdsamt": null,
          "totalamt": null,
          "agreementduration": "11",
          "agreementdate": "2024-02-09",
          "ownername": "MinaBiswas",
          "agreementupload": "https://cipl-aimantra.s3.amazonaws.com/documents/Aimantra2025-01-0817-17-50QvFhesRentAgreement.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250301%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250301T135313Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5dca1eaa3dadac4ff119d92c4c58aa234e24c256e68b6ae41af9d86f9a1ce686",
          "bankname": "State Bank of India",
          "accountholdername": "Mina Biswas",
          "accountnum": "10218755189",
          "ifsccode": "SBIN0006863",
          "pancard": "CJHPB9864M",
          "gstnum": "NA",
          "address": "Near Nimbark Ashram Badharghat,Agartala,ONGC,West Tripura,Pin-799014",
          "enddate": null,
          "mobile": 6909004715,
          "adminapprovalstatus": "approved",
          "createdat": "2025-01-23T13:37:37.326031Z",
          "project": "b14b6d66-40c7-4589-b056-f3328224b017",
          "boqofficeRent": null
      },
      {
          "id": "283af3d0-549e-49f7-82ac-0c10ab78fb80",
          "projectshortname": "Digboi",
          "projectcode": "241004021025",
          "documents": [],
          "shortname": null,
          "rentamt": "32000.00",
          "tdspercentage": null,
          "tdsamt": null,
          "totalamt": null,
          "agreementduration": "23",
          "agreementdate": "2024-07-01",
          "ownername": "PBorthakur",
          "agreementupload": "https://cipl-aimantra.s3.amazonaws.com/documents/Aimantra2025-01-0916-08-154qQsngtundefined?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250301%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250301T135313Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=09448cad98b0b5cbd58cd8bf537c184f80fbb1f1c2438da9398f86935cc10b4a",
          "bankname": "Indian Bank",
          "accountholdername": "Pradip Borthakur",
          "accountnum": "466057128",
          "ifsccode": "IDIB000D022",
          "pancard": "AIRPB2859F",
          "gstnum": "NIL",
          "address": "Jyoti Nagar, Borbil No. 1, Digboi, Back Side of BOI Bank, PO-Digboi, Dist-Tinsukia, Pin-786171 (Assam)",
          "enddate": null,
          "mobile": 9678627538,
          "adminapprovalstatus": "approved",
          "createdat": "2025-01-23T13:37:37.326031Z",
          "project": "054ba03c-8e06-4d0c-8991-03db53691af4",
          "boqofficeRent": null
      },
      {
          "id": "00bde20c-c19a-4dd9-9882-4afa7b1ff390",
          "projectshortname": "AE JNPT Pkg-3",
          "projectcode": "230604123015",
          "documents": [],
          "shortname": null,
          "rentamt": "26353.00",
          "tdspercentage": null,
          "tdsamt": null,
          "totalamt": null,
          "agreementduration": "11",
          "agreementdate": "2024-06-26",
          "ownername": "Saroj M.",
          "agreementupload": "https://cipl-aimantra.s3.amazonaws.com/documents/Aimantra2025-01-1515-28-05VyYoqUhrundefined?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250301%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250301T135313Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=c49b9465cc045489490ea3bb8409849a37ea6852a892407e6c004da4b2a66392",
          "bankname": "State Bank of India",
          "accountholdername": "Saroj Kumar Mahapatra",
          "accountnum": "20313427983",
          "ifsccode": "SBIN0002135",
          "pancard": "AAUPM5196K",
          "gstnum": "No",
          "address": "S/O Ram Chandra Mahapatra H-041, THE COSMOPOLIS, DUMUDUMA, KHANDAGIRI, BHUBANESWAR, Aiginia, Khorda, Odisha - 751019",
          "enddate": null,
          "mobile": 9438917900,
          "adminapprovalstatus": "approved",
          "createdat": "2025-01-23T13:37:37.326031Z",
          "project": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09",
          "boqofficeRent": null
      },
      {
          "id": "07f9f769-ddd1-4aa2-ab1f-29f5239d088b",
          "projectshortname": "IE Udaiypura-Bhogu NH-39",
          "projectcode": "230604021142",
          "documents": [],
          "shortname": null,
          "rentamt": "12000.00",
          "tdspercentage": null,
          "tdsamt": null,
          "totalamt": null,
          "agreementduration": "11",
          "agreementdate": "2024-06-18",
          "ownername": "Mr. Sujeet",
          "agreementupload": "https://cipl-aimantra.s3.amazonaws.com/documents/Aimantra2025-01-1615-43-052cKQPWiOfficeAgreement.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250301%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250301T135313Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a3775ecae916f98d23603affc207d9ed625e71d81c4c97993fa0c7b421caca02",
          "bankname": "Axis Bank Ltd",
          "accountholdername": "Sujeet Kumar Mehta",
          "accountnum": "917010042621061",
          "ifsccode": "UTIB0001375",
          "pancard": "CMKPM4554R",
          "gstnum": "0",
          "address": "Village- Sitadih, PO+PS Lesliganj, Palamu, Jharkhand-822118",
          "enddate": null,
          "mobile": 8709696242,
          "adminapprovalstatus": "approved",
          "createdat": "2025-01-23T13:37:37.326031Z",
          "project": "e80f772a-2a80-4e84-bf08-8f59beb9f135",
          "boqofficeRent": null
      },
      {
          "id": "b2caaca1-08bc-4968-9fb9-a246b1feca67",
          "projectshortname": "Digboi",
          "projectcode": "241004021025",
          "documents": [],
          "shortname": null,
          "rentamt": "18000.00",
          "tdspercentage": null,
          "tdsamt": null,
          "totalamt": null,
          "agreementduration": "11",
          "agreementdate": "2024-04-01",
          "ownername": "Geeta Dey",
          "agreementupload": "https://cipl-aimantra.s3.amazonaws.com/documents/Aimantra2025-01-1616-44-00hElAq3GGundefined?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250301%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250301T135313Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6afcaa565c7fa4377612b4ef02fb5b48bc01d50e05a469e1095e4a9aed28a6ff",
          "bankname": "Punjab National Bank",
          "accountholdername": "Geeta Dey",
          "accountnum": "960010100002",
          "ifsccode": "PUNB0096020",
          "pancard": "ABYPD9281H",
          "gstnum": "Nil",
          "address": "Vill/Town Segunbari, T.E, P.S Margherita, Sub-Division, Dist-Tinsukia, Asaam-786181",
          "enddate": null,
          "mobile": 7896216429,
          "adminapprovalstatus": "approved",
          "createdat": "2025-01-23T13:37:37.326031Z",
          "project": "054ba03c-8e06-4d0c-8991-03db53691af4",
          "boqofficeRent": null
      },
      {
          "id": "3ad7fef9-09d6-4975-ae4d-faf3d92ed3c9",
          "projectshortname": "AE Tuticorin, Tamil Nadu",
          "projectcode": "230604158139",
          "documents": [],
          "shortname": null,
          "rentamt": "8000.00",
          "tdspercentage": null,
          "tdsamt": null,
          "totalamt": null,
          "agreementduration": "11",
          "agreementdate": "2023-08-01",
          "ownername": "Vigneshwar",
          "agreementupload": "https://cipl-aimantra.s3.amazonaws.com/documents/Aimantra2025-01-1711-12-55IdhaguooRENTALAGREEMENT.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250301%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250301T135313Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=b01c7f3313f27b75e053aa02013462913af78fcdcf18619f59aed30fdea3fa07",
          "bankname": "Union Bank of India",
          "accountholdername": "Vigneshwari S",
          "accountnum": "319205010095035",
          "ifsccode": "UBIN0650221",
          "pancard": "AOCPK2033L",
          "gstnum": "24AADCG0367LIZM",
          "address": "Plot No. 59, Survey No. 343/3 Door No. 2/206/18, Annai Square Nagar, Korampallam, Thoothukudi-628101",
          "enddate": null,
          "mobile": 8667846355,
          "adminapprovalstatus": "approved",
          "createdat": "2025-01-23T13:37:37.326031Z",
          "project": "e959de0b-2444-47db-8c2e-aa17b3345eba",
          "boqofficeRent": null
      },
      {
          "id": "4ac0f67a-6bd7-4871-8430-a6b6e00e76dd",
          "projectshortname": "AE SRR Phase-II",
          "projectcode": "241016021024",
          "documents": [
              {
                  "id": "34d6ea3b-ff13-43b7-b864-3549a1e5d91b",
                  "documentname": "AGICL Srinagar office rent agreement",
                  "documentfile": "https://cipl-aimantra.s3.amazonaws.com/documents/AGICL-SrinagarofficeNowgamagrerment.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250301%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250301T135313Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=0579dcc247f08c644a0e76a0ff3c7911726c9b32793d768cb4e30e0a387600ee",
                  "documenttype": "actual",
                  "createdat": "2025-01-28T04:48:57.126798Z",
                  "project": null,
                  "emolyee": null,
                  "contractor": null,
                  "vehicledocs": null,
                  "employeedocs": null,
                  "certifications": null,
                  "OfficeRenttracking": null,
                  "OfficeRentrecord": null,
                  "miscellaneousdocs": null,
                  "officerent": "4ac0f67a-6bd7-4871-8430-a6b6e00e76dd",
                  "OfficeRentstracking": null
              }
          ],
          "shortname": null,
          "rentamt": "42000.00",
          "tdspercentage": null,
          "tdsamt": null,
          "totalamt": null,
          "agreementduration": "11",
          "agreementdate": "2024-10-24",
          "ownername": "mohdyaseen",
          "agreementupload": "https://cipl-aimantra.s3.amazonaws.com/documents/Aimantra2025-01-2815-13-02y18dbNaTundefined?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250301%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250301T135313Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=7b3d0dc2b85f8ba661b19f43e26226047d52391cf63467a98c0ced6f85e89eb7",
          "bankname": "J&K Bank",
          "accountholdername": "Mohammad Yaseen Dar",
          "accountnum": "0322010100010952",
          "ifsccode": "JAKA0JNAGAR",
          "pancard": "ADQPD7001D",
          "gstnum": "null",
          "address": "Kursoo Rajbagh, Near Lawrance Vidya Bhavan Gogi Bagh srinagar",
          "enddate": null,
          "mobile": 9149614308,
          "adminapprovalstatus": "approved",
          "createdat": "2025-01-23T13:37:37.326031Z",
          "project": "4765e96c-1763-4dbb-9a81-8d6f2d755036",
          "boqofficeRent": null
      }
  ])
  }
  getOfficeRentsByOrdIdProjectId(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'OfficeRent',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createOfficeRent(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'OfficeRent',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateOfficeRent(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'OfficeRent',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteOfficeRent(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'OfficeRent',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }

}
