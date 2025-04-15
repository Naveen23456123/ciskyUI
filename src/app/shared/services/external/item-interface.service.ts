import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class ItemInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getItemListByOrgId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Item',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  //   return of([
  //     {
  //         "id": "b1e9d6ca-97d9-4ac2-9225-6f8806f678aa",
  //         "name": "Electric Heat Pilar",
  //         "createdat": "2025-01-26T04:39:23.426703Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "306d3b38-696e-412f-aa6e-3ab9feaa0180",
  //         "name": "Steel Rack",
  //         "createdat": "2025-01-26T04:44:38.149345Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "f17b7448-ef05-4221-b208-68ae8642d37d",
  //         "name": "testing1",
  //         "createdat": "2025-01-27T08:42:35.956090Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "278a54e1-dbf6-436d-bef0-6c2321fe6f24",
  //         "name": "testing1",
  //         "createdat": "2025-01-27T08:50:13.674205Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "4a6431ad-1d8c-4302-bc3a-6b396aaef5c1",
  //         "name": "Electric Induction",
  //         "createdat": "2025-01-23T13:37:38.108976Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "cb9df355-4f7a-4f73-8b86-534a6bea97e4",
  //         "name": "RO water filter",
  //         "createdat": "2025-01-23T13:37:38.108976Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "b0e5fecf-7334-423d-80a6-ecb92e69e114",
  //         "name": "Laptop",
  //         "createdat": "2025-01-23T13:37:38.108976Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "44cbe326-3a2e-45cd-a807-526e87aa2fab",
  //         "name": "Table",
  //         "createdat": "2025-01-23T13:37:38.108976Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "fda77a08-2017-4fab-9b84-d9b4b496e769",
  //         "name": "Desktop",
  //         "createdat": "2025-01-23T13:37:38.108976Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "d5ff742e-da06-4571-9ed5-7c965f84213a",
  //         "name": "Visiting Chair",
  //         "createdat": "2025-01-23T13:37:38.108976Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "7d766058-bae5-4a4c-ac50-e0751dee82d9",
  //         "name": "Office Chair (Revolving)",
  //         "createdat": "2025-01-23T13:37:38.108976Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "27eec813-1da7-44b6-84a1-224654ba4ebd",
  //         "name": "Printer-color",
  //         "createdat": "2025-01-23T13:37:38.108976Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "38b88945-4a7b-441b-bd6a-e2c152b4676f",
  //         "name": "Printer - BW",
  //         "createdat": "2025-01-24T09:28:17.120610Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "c86a7fc2-dd04-480b-862f-92aca2ed65cc",
  //         "name": "Gas Stove",
  //         "createdat": "2025-01-24T09:33:39.770410Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "44a18aa5-6ada-40d2-9c76-4c75f11428e7",
  //         "name": "Gas Cylinder",
  //         "createdat": "2025-01-24T09:34:13.480871Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "7ecc3778-6699-4a84-8f4a-57c493fcf0d4",
  //         "name": "Gas Heater",
  //         "createdat": "2025-01-24T09:35:28.655023Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "b867cfd5-2e2f-493e-8b59-95a3a817cd91",
  //         "name": "Handy Gas Heater",
  //         "createdat": "2025-01-24T09:36:52.914938Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     },
  //     {
  //         "id": "9eff630b-9569-4b8c-b690-44ebdb5edc63",
  //         "name": "Steel Almira",
  //         "createdat": "2025-01-26T04:42:56.839007Z",
  //         "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
  //     }
  // ]);
}
  createItem(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Item',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateItem(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Item',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteItem(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Item',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }

}
