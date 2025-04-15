import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class SiteControlInterfaceService {

  constructor(private coreapi: CoreAPIService) { }

  getSubCompanyListByOrgId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'SubCompany',
        params: {},
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreapi.standardService(standardAttribute);
//      return of([
//       {
//           "id": "cda335ad-a121-447d-967c-50f2c34f3499",
//           "name": "AGICL",
//           "employeecount":45,
//           "companyname": null,
//           "companyaddress": null,
//           "companynumber": null,
//           "companygst": null,
//           "companylogo": null,
//           "createdat": "2025-01-23T13:37:38.138743Z"
//       },
//       {
//           "id": "61ca2c66-deca-4314-ab94-1e0ae582463f",
//           "name": "AGSL",
//           "employeecount":20,
//           "companyname": null,
//           "companyaddress": null,
//           "companynumber": null,
//           "companygst": null,
//           "companylogo": null,
//           "createdat": "2025-01-23T13:37:38.138743Z"
//       },
//       {
//           "id": "e1008435-885f-4222-a7e4-e3af6d4f8631",
//           "name": "demo",
//           "employeecount":30,
//           "companyname": null,
//           "companyaddress": null,
//           "companynumber": null,
//           "companygst": null,
//           "companylogo": null,
//           "createdat": "2025-01-23T13:37:38.138743Z"
//       }
//   ]);

  }
  getDepartmentListByOrgId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'department',
        params: {},
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreapi.standardService(standardAttribute);
//     return of([
//       {
//           "id": "86422734-2b46-4a41-a374-e6f39c1b23d1",
//           "subcompanyname": "AGICL",
//           "name": "design",
//           "createdat": "2025-01-23T13:37:37.742646Z",
//           "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499"
//       },
//       {
//           "id": "efcf3c28-2dba-4058-adc6-1a5644bdd8f5",
//           "subcompanyname": "AGICL",
//           "name": "Highway",
//           "createdat": "2025-01-23T13:37:37.742646Z",
//           "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499"
//       },
//       {
//           "id": "6e5c58c2-cbc4-4953-b5e5-2dc18e31be61",
//           "subcompanyname": "AGICL",
//           "name": "Structure Design",
//           "createdat": "2025-01-23T13:37:37.742646Z",
//           "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499"
//       },
//       {
//           "id": "0dc8ede7-121c-491b-9a81-3ca5466f80f2",
//           "subcompanyname": "AGICL",
//           "name": "Billing",
//           "createdat": "2025-01-23T13:37:37.742646Z",
//           "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499"
//       },
//       {
//           "id": "96c827ac-f29b-4bce-bb03-8774507ea60d",
//           "subcompanyname": "AGICL",
//           "name": "Quality",
//           "createdat": "2025-01-23T13:37:37.742646Z",
//           "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499"
//       },
//       {
//           "id": "0ae44dbe-7ee7-4831-8e8e-94e821bf9d09",
//           "subcompanyname": "AGICL",
//           "name": "Other",
//           "createdat": "2025-01-23T13:37:37.742646Z",
//           "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499"
//       },
//       {
//           "id": "f26770cd-fd3a-46e3-9445-7df481fe0996",
//           "subcompanyname": "AGICL",
//           "name": "Q&ME",
//           "createdat": "2025-01-23T13:37:37.742646Z",
//           "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499"
//       },
//       {
//           "id": "0a15a3f8-2ed4-4c6f-8a2b-bfcf6a4fc22c",
//           "subcompanyname": "AGICL",
//           "name": "Survey",
//           "createdat": "2025-01-23T13:37:37.742646Z",
//           "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499"
//       },
//       {
//           "id": "1a2bb55f-e70b-4f91-87de-a4bf8337a386",
//           "subcompanyname": "AGICL",
//           "name": "Environment Eng",
//           "createdat": "2025-01-23T13:37:37.742646Z",
//           "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499"
//       }
//   ]);

 }
 getDesignationListByOrgId(param: any, guid: string) {
  return of([
    {
        "id": "eacf8395-8fff-45f1-a667-1310269160cd",
        "name": "Assistant Quality cum Material Engineer-2",
        "employeecount": 0,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "d25effe4-cf50-4c14-9364-ce556904d718",
        "name": "Assistant Quality Cum Material Engineer-I",
        "employeecount": 2,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "ffbf9cff-8e2b-4ad6-a626-d7fae0b9547b",
        "name": "Assistant Bridge Engineer",
        "employeecount": 2,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "1c571286-dbc1-4bdc-a5e9-84a074797374",
        "name": "Senior Pavement Specialist",
        "employeecount": 1,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "11c40d2a-8127-49d2-85b6-3ad348734f15",
        "name": "Accountant",
        "employeecount": 1,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "000dac1e-54b3-4ba5-8580-17998f3408f8",
        "name": "Survey Engineer",
        "employeecount": 3,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "17d2546a-cc69-4278-9bb8-c6f3145d0881",
        "name": "Steno cum Computer Operator",
        "employeecount": 1,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "29a319b0-a21d-4bee-a539-dd8aec2914fb",
        "name": "Assistant Quality Cum Material Engineer-II",
        "employeecount": 3,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "2d8f26d6-6d9a-498d-9066-023313db49d1",
        "name": "Environment Eng",
        "employeecount": 0,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "f306bf06-f28e-4202-9170-9ca365e0afcc",
        "name": "Electrical Engineer",
        "employeecount": 2,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "369b70d5-00a1-4671-b459-4a4fe3644b16",
        "name": "Senior Quality Cum Material Expert",
        "employeecount": 2,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "ef1a9ad4-35b4-4bb1-ba82-0b9cac306065",
        "name": "CAD Expert",
        "employeecount": 2,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "5cee47d4-df1f-4082-af97-0ef305ea6ef2",
        "name": "Horticulture expert",
        "employeecount": 0,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "c658f30d-1ff5-44f9-aeb9-e99f490ff497",
        "name": "Testing",
        "employeecount": 4,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "3e87ff1c-e865-4b65-b2f9-915e07af19f9",
        "name": "Senior Quality cum Material Engineer",
        "employeecount": 2,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "4664e8c9-b5d7-42d1-942b-0bc480108cfd",
        "name": "Accountant cum Cashier",
        "employeecount": 4,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "248c6697-09a4-4e33-bc8f-1b247628338f",
        "name": "HTMS/Toll Expert",
        "employeecount": 0,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "ada60bd9-c066-407a-95fb-34ca44905af9",
        "name": "Resident Cum Highway Engineer",
        "employeecount": 3,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "cfc6944b-3158-43a8-bd96-94a0b6b02c0b",
        "name": "Computer Operator",
        "employeecount": 2,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "f64c7340-a2a1-4b09-980f-7beb5eed7517",
        "name": "Assistant Quality cum Material Engineer",
        "employeecount": 1,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "a0153c4e-dbd6-458a-84ee-fe732ee62c28",
        "name": "Testing",
        "employeecount": 0,
        "subcompany": "e1008435-885f-4222-a7e4-e3af6d4f8631",
        "subcompanyname": "demo"
    },
    {
        "id": "1a7327fe-eab5-4565-bdea-1bc9c37e3b7a",
        "name": "Assistant highway Engineer-II",
        "employeecount": 2,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "00e254f6-1183-48ff-82fe-fda63b2d9f8c",
        "name": "Team Leader",
        "employeecount": 1,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "e2a4dd3a-8733-4e7e-b6b3-f2b75699b5cb",
        "name": "Site Access Account",
        "employeecount": 6,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "2d2a263d-6808-4400-8d16-0570991fd9d7",
        "name": "Assistant Highway Engineer",
        "employeecount": 5,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "b80372eb-260a-43ad-9d6e-c5a22c47a2a1",
        "name": "Slope Characterization Expert",
        "employeecount": 0,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "145f53d1-737b-45c8-84c3-319433f834c7",
        "name": "Quantity Surveyor",
        "employeecount": 3,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "54e6b23a-0874-45c2-bec4-2cd6af6f5eed",
        "name": "Team Leader cum Sr. Highway Engineer",
        "employeecount": 2,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "f92593ba-d923-47f0-917d-3e5db0d4c1c1",
        "name": "Office Boy",
        "employeecount": 5,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "8c8c44c3-3c14-4ed6-b982-248a3dc40a08",
        "name": "Highway Design Engineer",
        "employeecount": 2,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "e37c9c0d-669c-4dd1-8a3f-b24296aa0aca",
        "name": "Road Safety Expert",
        "employeecount": 1,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "9d50b0fc-f9d2-490a-9833-5dfa6ce91e73",
        "name": "Bridge / Structutre Engineer",
        "employeecount": 3,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "b0178277-9647-429c-b998-9764ad3758ef",
        "name": "Deputy General Manager",
        "employeecount": 1,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    },
    {
        "id": "b73c194b-c5e9-4ad9-a1fa-3337b5cbd47d",
        "name": "Office Manager",
        "employeecount": 6,
        "subcompany": "cda335ad-a121-447d-967c-50f2c34f3499",
        "subcompanyname": "AGICL"
    }
]);

 }

 getConsultantAccountListByOrgId(param: any, guid: string) {
  return of([
    {
        "id": "7b5d9c3e-7e9a-487e-bf03-809be17128fd",
        "companyname": "cda335ad-a121-447d-967c-50f2c34f3499",
        "address": "Tulip Lemon, Sector 69",
        "accountnumber": "24904010006666",
        "ifsccode": "HDFC0000661",
        "bankname": "JK Bank",
        "gstno": "demo demo",
        "panno": "demo",
        "created_at": "2025-01-27T09:30:11.160674Z",
        "accounttype": "fixed Account",
        "document": "https://cipl-aimantra.s3.amazonaws.com/site_ConsultantAccountDetails_documents/Aimantra_2025-01-27_15-00-25_j-RqQq_Vijay_Kumar_2_1.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250216%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T150507Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6bc73742adcc37bde28bb13c94ab021a2a816e92195a544b9178255d41dbdd09",
        "subCompany": null
    }
])
 }
}
