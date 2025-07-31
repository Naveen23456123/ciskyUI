import { Injectable, Type } from '@angular/core';
import { ManageInventoryListComponent } from '@app/shared/components/inventory/manage-inventory-list/manage-inventory-list.component';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getTemplateColumnList(){
    let columns = [
        { label: 'Project_Code', value: 'project' },
        { label: 'Employee_Code', value: 'employee' },
        { label: 'Item_Name', value: 'item' },
        { label: 'Description', value: 'description' },
        { label: 'Quantity', value: 'quantity' },
        { label: 'Cost_Per_Item', value: 'costperitem' },
        { label: 'Purchase_Date', value: 'purchasedate' }
      
      ];
    return columns;
  }
  getCSVTemplateColumnList(){
    let columns = [
        { label: 'Item_Name', value: 'item' },
        { label: 'Project_Code', value: 'project' },
        { label: 'Employee_Code', value: 'employee' },        
        { label: 'Description', value: 'description' },
        { label: 'Quantity', value: 'quantity' },
        { label: 'Cost_Per_Item', value: 'costperitem' },
        { label: 'Purchase_Date', value: 'purchasedate' }
      
      ];
    return columns;
  }
  getInventoryListComponent(){
              return {
                component: ManageInventoryListComponent,
                inputs: {
                  headline: 'Inventory List'
                }
    } as {component: Type<any>, inputs: Record<string, unknown>}
  }


  getSiteInventoryListByOrgId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'Inventory',
        params: param,
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
    //   return of([
    //     {
    //         "id": "ee087835-a78a-47dd-af4c-8cf0c08a7870",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Laptop",
    //         "description": "Received from HO ALmondz",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": "2024-03-01",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-23T13:37:37.860122Z",
    //         "itemid": "b0e5fecf-7334-423d-80a6-ecb92e69e114",
    //         "empcode": "AGICL/SRR/3",
    //         "projectId": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "cb649db4-f08d-44e8-b61b-6626078f0b07",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Laptop",
    //         "description": "Received from HO ALmondz",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": "2024-03-01",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-23T13:37:37.860122Z",
    //         "itemid": "b0e5fecf-7334-423d-80a6-ecb92e69e114",
    //         "empcode": "AGICL/SRR/5",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "a7acd8c6-47ee-4cae-a913-afe1856b39f5",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Laptop",
    //         "description": "Received from HO ALmondz",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": "2024-07-27",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-23T13:37:37.860122Z",
    //         "itemid": "b0e5fecf-7334-423d-80a6-ecb92e69e114",
    //         "empcode": "AGICL/SRR/4",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "a656b69f-96a7-4d76-b546-0377ba698e91",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Laptop",
    //         "description": "Received from HO ALmondz",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": "2024-03-01",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-23T13:37:37.860122Z",
    //         "itemid": "b0e5fecf-7334-423d-80a6-ecb92e69e114",
    //         "empcode": "AGICL/SRR/17",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "325b35d4-7a9a-4970-8a3b-266f918a4e5d",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Laptop",
    //         "description": "Received from Almondz HO",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": "2024-03-01",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-23T13:37:37.860122Z",
    //         "itemid": "b0e5fecf-7334-423d-80a6-ecb92e69e114",
    //         "empcode": "AGICL/SRR/18",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "25b2ab9c-145d-47c1-b9a0-55c752f9ea4e",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Office Chair (Revolving)",
    //         "description": "chairs",
    //         "quantity": 14,
    //         "rateperitem": "0",
    //         "purchasedate": "2024-02-28",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-23T13:37:37.860122Z",
    //         "itemid": "7d766058-bae5-4a4c-ac50-e0751dee82d9",
    //         "empcode": "10024",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "05773abd-1ed2-4d4e-96e9-63025f8afacf",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Table",
    //         "description": "tables",
    //         "quantity": 16,
    //         "rateperitem": "0",
    //         "purchasedate": "2024-02-28",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-23T13:37:37.860122Z",
    //         "itemid": "44cbe326-3a2e-45cd-a807-526e87aa2fab",
    //         "empcode": "10024",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "af985d5d-d7e4-4c17-9009-de09a57f8ea5",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Electric Induction",
    //         "description": "electric heat induction for cooking",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": "2024-03-01",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-23T13:37:37.860122Z",
    //         "itemid": "4a6431ad-1d8c-4302-bc3a-6b396aaef5c1",
    //         "empcode": "10024",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "6f2ac06b-9fd3-4368-a86a-f3639ac85c8c",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "RO water filter",
    //         "description": "RO water filter",
    //         "quantity": 1,
    //         "rateperitem": "17000",
    //         "purchasedate": "2024-02-29",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-23T13:37:37.860122Z",
    //         "itemid": "cb9df355-4f7a-4f73-8b86-534a6bea97e4",
    //         "empcode": "10024",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "74cbaebf-ce29-4597-834b-f1a119f422af",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Printer - BW",
    //         "description": "Black only",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": "2024-05-01",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-23T13:37:37.860122Z",
    //         "itemid": "38b88945-4a7b-441b-bd6a-e2c152b4676f",
    //         "empcode": "10024",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "c3272e14-44d6-4c1f-b6d3-3038b8fb57bd",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "name": "Printer - BW",
    //         "description": "Printer purchase for Pkg-3 TL office",
    //         "quantity": 1,
    //         "rateperitem": "17278",
    //         "purchasedate": "2020-09-27",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-25T08:59:03.404371Z",
    //         "itemid": "38b88945-4a7b-441b-bd6a-e2c152b4676f",
    //         "empcode": "0084",
    //         "projectid": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09"
    //     },
    //     {
    //         "id": "fe05706a-d50c-441e-b15b-78a9465b76b5",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "name": "Printer - BW",
    //         "description": "Printer purchase for Pkg-3 TL office",
    //         "quantity": 1,
    //         "rateperitem": "17278",
    //         "purchasedate": "2020-09-27",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-25T08:59:07.082972Z",
    //         "itemid": "38b88945-4a7b-441b-bd6a-e2c152b4676f",
    //         "empcode": "0084",
    //         "projectid": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09"
    //     },
    //     {
    //         "id": "ffedfeaa-905b-4b6b-8539-78bf9196ce1e",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "name": "Printer - BW",
    //         "description": "Printer purchase for Pkg-3 TL office",
    //         "quantity": 1,
    //         "rateperitem": "17278",
    //         "purchasedate": "2020-09-27",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-25T08:59:07.785816Z",
    //         "itemid": "38b88945-4a7b-441b-bd6a-e2c152b4676f",
    //         "empcode": "0084",
    //         "projectid": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09"
    //     },
    //     {
    //         "id": "9d3da815-70a6-4534-9885-cce16c6ea07c",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "name": "Printer - BW",
    //         "description": "Printer purchase for Pkg-3 TL office",
    //         "quantity": 1,
    //         "rateperitem": "17278",
    //         "purchasedate": "2020-09-27",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-25T08:59:08.328758Z",
    //         "itemid": "38b88945-4a7b-441b-bd6a-e2c152b4676f",
    //         "empcode": "0084",
    //         "projectid": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09"
    //     },
    //     {
    //         "id": "a012d376-8411-48a7-a2ac-5bd3d75c7894",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "name": "Laptop",
    //         "description": "Laptop received from Head office",
    //         "quantity": 2,
    //         "rateperitem": "40000",
    //         "purchasedate": "2020-01-20",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-25T09:11:18.570858Z",
    //         "itemid": "b0e5fecf-7334-423d-80a6-ecb92e69e114",
    //         "empcode": "0084",
    //         "projectid": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09"
    //     },
    //     {
    //         "id": "00a760c7-aa96-4835-9ceb-1afb9312e5a2",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "name": "Laptop",
    //         "description": "Laptop received from Head office",
    //         "quantity": 2,
    //         "rateperitem": "40000",
    //         "purchasedate": "2020-01-20",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-25T09:11:20.878757Z",
    //         "itemid": "b0e5fecf-7334-423d-80a6-ecb92e69e114",
    //         "empcode": "0084",
    //         "projectid": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09"
    //     },
    //     {
    //         "id": "d9a45ed3-fcb0-4176-ae9a-6eefaf77913b",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "name": "Laptop",
    //         "description": "Laptop received from Head office",
    //         "quantity": 2,
    //         "rateperitem": "40000",
    //         "purchasedate": "2020-01-20",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-25T09:11:38.248914Z",
    //         "itemid": "b0e5fecf-7334-423d-80a6-ecb92e69e114",
    //         "empcode": "0084",
    //         "projectid": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09"
    //     },
    //     {
    //         "id": "541550ba-f100-468f-89c4-b2486620cb0c",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "name": "Laptop",
    //         "description": "Laptop received from Head office",
    //         "quantity": 2,
    //         "rateperitem": "40000",
    //         "purchasedate": "2020-01-20",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-25T09:12:18.911826Z",
    //         "itemid": "b0e5fecf-7334-423d-80a6-ecb92e69e114",
    //         "empcode": "0084",
    //         "projectid": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09"
    //     },
    //     {
    //         "id": "68705765-34c4-4ca3-8f1c-53d507fb39c2",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "name": "Desktop",
    //         "description": "Desktop of TL office",
    //         "quantity": 2,
    //         "rateperitem": "89000",
    //         "purchasedate": "2018-01-09",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-25T09:15:28.677571Z",
    //         "itemid": "fda77a08-2017-4fab-9b84-d9b4b496e769",
    //         "empcode": "00224",
    //         "projectid": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09"
    //     },
    //     {
    //         "id": "1a45e3fc-34ba-433a-a309-e84de013aa8d",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "name": "Desktop",
    //         "description": "Desktop of TL office",
    //         "quantity": 2,
    //         "rateperitem": "89000",
    //         "purchasedate": "2018-01-09",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-25T09:15:32.691738Z",
    //         "itemid": "fda77a08-2017-4fab-9b84-d9b4b496e769",
    //         "empcode": "00224",
    //         "projectid": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09"
    //     },
    //     {
    //         "id": "a159ce7c-81b8-4a8d-ba3f-f7a50068a52e",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Gas Stove",
    //         "description": "Pantry use",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": null,
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-26T04:37:06.342142Z",
    //         "itemid": "c86a7fc2-dd04-480b-862f-92aca2ed65cc",
    //         "empcode": "10024",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "5cb96636-70a9-424c-b841-e1b515288458",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Gas Cylinder",
    //         "description": "For pantry Gas stove use",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": null,
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-26T04:38:05.298471Z",
    //         "itemid": "44a18aa5-6ada-40d2-9c76-4c75f11428e7",
    //         "empcode": "10024",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "c58775c7-3204-4533-a5ec-44edd6687771",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Electric Heat Pilar",
    //         "description": "For Heating",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": null,
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-26T04:40:14.464622Z",
    //         "itemid": "b1e9d6ca-97d9-4ac2-9225-6f8806f678aa",
    //         "empcode": "AGICL/SRR/4",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "35e00e35-63bc-477f-8097-fe79a0bc2a0f",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Electric Heat Pilar",
    //         "description": "For heating",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": null,
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-26T04:40:49.166159Z",
    //         "itemid": "b1e9d6ca-97d9-4ac2-9225-6f8806f678aa",
    //         "empcode": "AGICL/SRR/5",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "376754b5-04a7-4cb0-a6f2-b12ee9f87f30",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Electric Heat Pilar",
    //         "description": "For heating",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": null,
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-26T04:41:05.920728Z",
    //         "itemid": "b1e9d6ca-97d9-4ac2-9225-6f8806f678aa",
    //         "empcode": "AGICL/SRR/3",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "63378922-949b-4325-a5fe-be4379646132",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Electric Heat Pilar",
    //         "description": "For heating",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": null,
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-26T04:41:26.356454Z",
    //         "itemid": "b1e9d6ca-97d9-4ac2-9225-6f8806f678aa",
    //         "empcode": "AGICL/SRR/17",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "74be76dc-cf2c-4bcc-838a-0a0d8fd8d816",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Electric Heat Pilar",
    //         "description": "For heating",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": null,
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-26T04:41:41.817205Z",
    //         "itemid": "b1e9d6ca-97d9-4ac2-9225-6f8806f678aa",
    //         "empcode": "AGICL/SRR/12",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "d54689f3-0020-45c9-abbd-0d0461542cbb",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Electric Heat Pilar",
    //         "description": "For heating",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": null,
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-26T04:42:14.014948Z",
    //         "itemid": "b1e9d6ca-97d9-4ac2-9225-6f8806f678aa",
    //         "empcode": "10024",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "d079ba49-c6f3-44b2-9e0a-1ddf35b2efec",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Steel Rack",
    //         "description": "For files",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": null,
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-26T04:45:14.525773Z",
    //         "itemid": "306d3b38-696e-412f-aa6e-3ab9feaa0180",
    //         "empcode": "10024",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "8da505a4-24bc-4cf0-8841-b11c2da1d105",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Steel Almira",
    //         "description": "For stationary & other items",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": null,
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-26T04:45:54.135757Z",
    //         "itemid": "9eff630b-9569-4b8c-b690-44ebdb5edc63",
    //         "empcode": "10024",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "c6d6b8da-c3ee-472f-8fa2-9c95718e147c",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Printer-color",
    //         "description": "Epson Color Printer",
    //         "quantity": 1,
    //         "rateperitem": "9830.5",
    //         "purchasedate": "2024-08-09",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-23T13:37:37.860122Z",
    //         "itemid": "27eec813-1da7-44b6-84a1-224654ba4ebd",
    //         "empcode": "AGICL/SRR/6",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "ae995d6d-28d0-40d9-a7af-9824621c2789",
    //         "projectshortname": "AE SRR Phase-II",
    //         "description": "Monitor, Keyboard, Mouse",
    //         "quantity": 1,
    //         "rateperitem": "8643",
    //         "purchasedate": "2024-08-09",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-23T13:37:37.860122Z",
    //         "itemid": null,
    //         "empcode": "AGICL/SRR/6",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "317a6ca5-104f-442d-a8c0-1090bd0d9c25",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Desktop",
    //         "description": "Received from HO ALmondz",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": "2024-03-01",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-23T13:37:37.860122Z",
    //         "itemid": "fda77a08-2017-4fab-9b84-d9b4b496e769",
    //         "empcode": "AGICL/SRR/1",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "5bce70a8-d4b7-4811-af66-1d934bed36bd",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Desktop",
    //         "description": "demo",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": "2025-01-28",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-27T07:24:14.454136Z",
    //         "itemid": "fda77a08-2017-4fab-9b84-d9b4b496e769",
    //         "empcode": "AGICL/SRR/17",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "70eed1aa-f1c8-414b-8c09-fdaaa104be33",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Electric Heat Pilar",
    //         "description": "demo",
    //         "quantity": 2,
    //         "rateperitem": "0",
    //         "purchasedate": null,
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-27T07:11:58.727887Z",
    //         "itemid": "b1e9d6ca-97d9-4ac2-9225-6f8806f678aa",
    //         "empcode": "10024",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     },
    //     {
    //         "id": "5cd1302a-f394-454b-af90-bf86df2a5fb3",
    //         "projectshortname": "AE SRR Phase-II",
    //         "name": "Laptop",
    //         "description": "Received from HO ALmondz",
    //         "quantity": 1,
    //         "rateperitem": "0",
    //         "purchasedate": "2024-03-01",
    //         "remaningquantity": null,
    //         "distributedquantity": null,
    //         "createdat": "2025-01-23T13:37:37.860122Z",
    //         "itemid": "b0e5fecf-7334-423d-80a6-ecb92e69e114",
    //         "empcode": "AGICL/SRR/2",
    //         "projectid": "4765e96c-1763-4dbb-9a81-8d6f2d755036"
    //     }
    // ]);
  }
  getSiteInventoryListByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'Inventory/ByProjectId/'+param.id,
        params: param,
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
   }
  getItemListByOrgId(param: any, guid: string) {
    return of([
      {
          "id": "b1e9d6ca-97d9-4ac2-9225-6f8806f678aa",
          "name": "Electric Heat Pilar",
          "createdat": "2025-01-26T04:39:23.426703Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "306d3b38-696e-412f-aa6e-3ab9feaa0180",
          "name": "Steel Rack",
          "createdat": "2025-01-26T04:44:38.149345Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "f17b7448-ef05-4221-b208-68ae8642d37d",
          "name": "testing1",
          "createdat": "2025-01-27T08:42:35.956090Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "278a54e1-dbf6-436d-bef0-6c2321fe6f24",
          "name": "testing1",
          "createdat": "2025-01-27T08:50:13.674205Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "4a6431ad-1d8c-4302-bc3a-6b396aaef5c1",
          "name": "Electric Induction",
          "createdat": "2025-01-23T13:37:38.108976Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "cb9df355-4f7a-4f73-8b86-534a6bea97e4",
          "name": "RO water filter",
          "createdat": "2025-01-23T13:37:38.108976Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "b0e5fecf-7334-423d-80a6-ecb92e69e114",
          "name": "Laptop",
          "createdat": "2025-01-23T13:37:38.108976Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "44cbe326-3a2e-45cd-a807-526e87aa2fab",
          "name": "Table",
          "createdat": "2025-01-23T13:37:38.108976Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "fda77a08-2017-4fab-9b84-d9b4b496e769",
          "name": "Desktop",
          "createdat": "2025-01-23T13:37:38.108976Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "d5ff742e-da06-4571-9ed5-7c965f84213a",
          "name": "Visiting Chair",
          "createdat": "2025-01-23T13:37:38.108976Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "7d766058-bae5-4a4c-ac50-e0751dee82d9",
          "name": "Office Chair (Revolving)",
          "createdat": "2025-01-23T13:37:38.108976Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "27eec813-1da7-44b6-84a1-224654ba4ebd",
          "name": "Printer-color",
          "createdat": "2025-01-23T13:37:38.108976Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "38b88945-4a7b-441b-bd6a-e2c152b4676f",
          "name": "Printer - BW",
          "createdat": "2025-01-24T09:28:17.120610Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "c86a7fc2-dd04-480b-862f-92aca2ed65cc",
          "name": "Gas Stove",
          "createdat": "2025-01-24T09:33:39.770410Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "44a18aa5-6ada-40d2-9c76-4c75f11428e7",
          "name": "Gas Cylinder",
          "createdat": "2025-01-24T09:34:13.480871Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "7ecc3778-6699-4a84-8f4a-57c493fcf0d4",
          "name": "Gas Heater",
          "createdat": "2025-01-24T09:35:28.655023Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "b867cfd5-2e2f-493e-8b59-95a3a817cd91",
          "name": "Handy Gas Heater",
          "createdat": "2025-01-24T09:36:52.914938Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      },
      {
          "id": "9eff630b-9569-4b8c-b690-44ebdb5edc63",
          "name": "Steel Almira",
          "createdat": "2025-01-26T04:42:56.839007Z",
          "subcompanyId": "cda335ad-a121-447d-967c-50f2c34f3499"
      }
  ]);
}
  createInventory(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Inventory',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createBulkInventory(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Inventory/Bulk',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateInventory(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Inventory',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteInventory(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Inventory',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }

}
