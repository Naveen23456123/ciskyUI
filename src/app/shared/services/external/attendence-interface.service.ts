import { Injectable } from '@angular/core';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class AttendenceInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getBOQAttendenceListByProjectIdByOrgId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqAttendence',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
    // return of(
    //   [
    //     {
    //         "id": "eeb033ae-ca26-4ec9-89e3-061be42ec83a",
    //         "employeename": "Jagadeesh Surathu",
    //         "employeecode": "0084",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "projectcode": "230604123015",
    //         "totaldays": "31",
    //         "manmonths": "1.000",
    //         "month": "12",
    //         "year": "2024",
    //         "createdat": "2025-01-28T07:35:59.575107Z",
    //         "projectId": null,
    //         "employeeId": "1e4963cc-2fba-4ade-b9c2-fd9a015ee2b5"
    //     },
    //     {
    //         "id": "4063a115-375b-4cd3-926f-902bb3df0354",
    //         "employeename": "Priyanka Tukaram Patil",
    //         "employeecode": "00224",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "projectcode": "230604123015",
    //         "totaldays": "18",
    //         "manmonths": "0.580",
    //         "month": "12",
    //         "year": "2024",
    //         "createdat": "2025-01-28T08:01:25.851847Z",
    //         "projectId": null,
    //         "employeeId": "bb2d0bd6-d4c4-4395-8823-53f8e6abd008"
    //     },
    //     {
    //         "id": "bc08031c-c03d-4557-b708-d5eb6eb83c1a",
    //         "employeename": "Roshani Vasant Gharat",
    //         "employeecode": "0686",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "projectcode": "230604123015",
    //         "totaldays": "31",
    //         "manmonths": "1.000",
    //         "month": "12",
    //         "year": "2024",
    //         "createdat": "2025-01-28T08:02:04.254130Z",
    //         "projectId": null,
    //         "employeeId": "32951eb4-fb3e-4dc8-8090-71fbe197736e"
    //     },
    //     {
    //         "id": "36d92b7e-7cfa-48c0-8b34-91b410d19142",
    //         "employeename": "Karan Datre",
    //         "employeecode": "0516",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "projectcode": "230604123015",
    //         "totaldays": "29",
    //         "manmonths": "0.940",
    //         "month": "12",
    //         "year": "2024",
    //         "createdat": "2025-01-28T08:03:27.059157Z",
    //         "projectId": null,
    //         "employeeId": "720b3bb4-23cb-4992-8743-63d98839437b"
    //     },
    //     {
    //         "id": "0665c841-e628-4c95-a4d5-da1e001e8a66",
    //         "employeename": "Jagadeesh Surathu",
    //         "employeecode": "0084",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "projectcode": "230604123015",
    //         "totaldays": "26",
    //         "manmonths": "0.930",
    //         "month": "1",
    //         "year": "2025",
    //         "createdat": "2025-01-28T08:21:27.330843Z",
    //         "projectId": null,
    //         "employeeId": "1e4963cc-2fba-4ade-b9c2-fd9a015ee2b5"
    //     },
    //     {
    //         "id": "517e9926-aced-4c23-921e-371656fe4302",
    //         "employeename": "Priyanka Tukaram Patil",
    //         "employeecode": "00224",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "projectcode": "230604123015",
    //         "totaldays": "21",
    //         "manmonths": "0.750",
    //         "month": "1",
    //         "year": "2025",
    //         "createdat": "2025-01-28T08:22:37.044991Z",
    //         "projectId": null,
    //         "employeeId": "bb2d0bd6-d4c4-4395-8823-53f8e6abd008"
    //     },
    //     {
    //         "id": "333eecad-4299-430d-9892-7afcbf7dd820",
    //         "employeename": "Roshani Vasant Gharat",
    //         "employeecode": "0686",
    //         "projectshortname": "AE JNPT Pkg-3",
    //         "projectcode": "230604123015",
    //         "totaldays": "28",
    //         "manmonths": "1.000",
    //         "month": "1",
    //         "year": "2025",
    //         "createdat": "2025-01-28T08:23:05.661391Z",
    //         "projectId": null,
    //         "employeeId": "32951eb4-fb3e-4dc8-8090-71fbe197736e"
    //     }
    // ]
    // )
  }
  getActualAttendenceListByProjectIdByOrgId(param: any, guid: string) {
  }
  createBoqAttendence(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqAttendence',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  } 
  searchBoqAttendence(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqAttendence/Search',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateBoqAttendence(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqAttendence',
      params: {},
      headers: true,
      guid: '',
      request: request,
       action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteBoqAttendence(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BoqAttendence',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }

}
