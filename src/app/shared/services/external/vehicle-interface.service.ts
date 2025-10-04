import { Injectable, Type } from '@angular/core';
import { ManageVehicleListComponent } from '@app/shared/components/vehicle/manage-vehicle-list/manage-vehicle-list.component';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleInterfaceService {

  constructor(private coreApi :CoreAPIService) { }

  getTemplateColumnList() {
    let columns = [
        { label: 'Vehicle_Name', value: 'name' },
        { label: 'Project_Code', value: 'project' },
        { label: 'Vehicle_Number', value: 'number' },
        { label: 'Fixed_KM', value: 'fixedkm' },
        { label: 'Fixed_Bill_Amount', value: 'fixedbillamount' },
        { label: 'Extra_Amt_After_Fixed_KM', value: 'extraamountafterfixedkm' },
        { label: 'KM_Per_Liter', value: 'kmperliter' },
        { label: 'Fuel_Price', value: 'fuelprice' },
        { label: 'Bank_Name', value: 'bankname' },
        { label: 'Account_Number', value: 'accountnumber' },
        { label: 'Account_Holder_Name', value: 'accountholdername' },
        { label: 'IFSC_Code', value: 'ifsccode' },
        { label: 'PAN_Number', value: 'pancard' },
        { label: 'Address', value: 'address' },
        { label: 'Mobile', value: 'mobilenumber' },
        { label: 'GST_Number', value: 'gstnumber' },
        
    
    ];
  return columns;
  }
  getCSVTemplateColumnList() {
    let columns = [
        { label: 'Vehicle_Name', value: 'name' },
        { label: 'Project_Code', value: 'project' },
        { label: 'Vehicle_Number', value: 'number' },
        { label: 'Fixed_KM', value: 'fixedkm' },
        { label: 'Fixed_Bill_Amount', value: 'fixedbillamount' },
        { label: 'Extra_Amt_After_Fixed_KM', value: 'extraamountafterfixedkm' },
        { label: 'Address', value: 'address' },
        { label: 'Mobile', value: 'mobilenumber' },
    ];
  return columns;
  }
  getVehicleListComponent(){
        return {
          component: ManageVehicleListComponent,
          inputs: {
            headline: 'Openings in all departments',
            body: 'Apply today',
          }
      } as {component: Type<any>, inputs: Record<string, unknown>}
    }

  getVehileDetailsByOrgId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'Vehicle',
        params: param,
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
    // return of([
    // {
    //     "id": "712bcb68-d0c1-4b4e-adb2-df82574eeb2f",
    //     "projectshortname": "IE Udaiypura-Bhogu NH-39",
    //     "documents": [
    //         {
    //             "id": "81de90a2-71ad-402d-a2d4-1f7346d860cf",
    //             "documentname": "Vehicle Agreement XUV 300",
    //             "documentfile": "https://cipl-aimantra.s3.amazonaws.com/documents/XUV300Agreement.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250219%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250219T170046Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a3e79b2c2286bc3279caa6bff17db888b8dc529b5549bb3f5500615b06dc2273",
    //             "documenttype": null,
    //             "createdat": "2025-01-16T06:48:59.269672Z",
    //             "project": null,
    //             "emolyee": null,
    //             "contractor": null,
    //             "vehicledocs": "712bcb68-d0c1-4b4e-adb2-df82574eeb2f",
    //             "employeedocs": null,
    //             "certifications": null,
    //             "lettertracking": null,
    //             "letterrecord": null,
    //             "miscellaneousdocs": null,
    //             "officerent": null,
    //             "letterstracking": null
    //         }
    //     ],
    //     "name": "Mahindra XUV300",
    //     "vehiclenum": "JH03AJ0482",
    //     "fixedkm": "3000",
    //     "fixedbillamt": "26000",
    //     "extraamtabovefixkm": "00",
    //     "kmperlit": "12",
    //     "fuelprice": "94.50",
    //     "bankname": "HDFC Bank Ltd",
    //     "accountholdername": "Shashank Kumar Vishwakarma",
    //     "accountnum": "50100328819876",
    //     "ifsccode": "HDFC0001743",
    //     "pancard": "BRBPV7790K",
    //     "gstnum": "",
    //     "address": "S/O Manoj Kumar Vishwakarma, Vill- Pandwa, PO- Rajhara, PS- Pandwa, Palamu, Jharkhand 822124",
    //     "mobile": 7004545721,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "e80f772a-2a80-4e84-bf08-8f59beb9f135",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "07a0b062-f9e4-4f95-8fc7-a95ca411cdb7",
    //     "projectshortname": "Digboi",
    //     "documents": [],
    //     "name": "Bolero B6",
    //     "vehiclenum": "AS23AH7819",
    //     "fixedkm": "2500",
    //     "fixedbillamt": "55000",
    //     "extraamtabovefixkm": "10",
    //     "kmperlit": "89.38",
    //     "fuelprice": "89.38",
    //     "bankname": "STATE BANK OF INDIA",
    //     "accountholdername": "PRITAM KUMAR KHOUND",
    //     "accountnum": "20020011124",
    //     "ifsccode": "SBIN0006000",
    //     "pancard": "AOXPK7308G",
    //     "gstnum": "0",
    //     "address": "Mission Para, Borbil No. 1, Digboi, Tinsukia, Assam-786171",
    //     "mobile": 7086709826,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "054ba03c-8e06-4d0c-8991-03db53691af4",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "01acbee5-d2d5-4840-a3f4-1d3ad0afc66a",
    //     "projectshortname": "AE SRR Phase-II",
    //     "documents": [],
    //     "name": "Maruti swift Dzire",
    //     "vehiclenum": "JK01AW 0674",
    //     "fixedkm": "3000",
    //     "fixedbillamt": "45000",
    //     "extraamtabovefixkm": "15",
    //     "kmperlit": "16",
    //     "fuelprice": "99.64",
    //     "bankname": "J&K Bank",
    //     "accountholdername": "Mohd Imran Mir",
    //     "accountnum": "0257040100006707",
    //     "ifsccode": "JAKA0LASJAN",
    //     "pancard": "BNJPM1726Q",
    //     "gstnum": null,
    //     "address": "Lasjan Srinagar, Jammu and Kashmir, 191101",
    //     "mobile": 7006294504,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "4765e96c-1763-4dbb-9a81-8d6f2d755036",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "40562d70-c050-476b-b87b-574771660722",
    //     "projectshortname": "AE SRR Phase-II",
    //     "documents": [],
    //     "name": "Hyundai Creta",
    //     "vehiclenum": "JK02DK 8149",
    //     "fixedkm": "3000",
    //     "fixedbillamt": "40000",
    //     "extraamtabovefixkm": "15",
    //     "kmperlit": "16",
    //     "fuelprice": "99.64",
    //     "bankname": "ICICI Bank",
    //     "accountholdername": "Shalvi Rai",
    //     "accountnum": "098501548019",
    //     "ifsccode": "ICIC0000985",
    //     "pancard": "CAMPR8817E",
    //     "gstnum": null,
    //     "address": "308 Sainik colony, Sector-D, Jammu, J&K-180011",
    //     "mobile": 7304937533,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "4765e96c-1763-4dbb-9a81-8d6f2d755036",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "2dba74dc-83e0-4113-bc4a-e39d7e9e6797",
    //     "projectshortname": "Digboi",
    //     "documents": [],
    //     "name": "Bolero B6",
    //     "vehiclenum": "AR20A5411",
    //     "fixedkm": "2500",
    //     "fixedbillamt": "55000",
    //     "extraamtabovefixkm": "10",
    //     "kmperlit": "",
    //     "fuelprice": "89.38",
    //     "bankname": "STATE BANK OF INDIA",
    //     "accountholdername": "PRITAM KUMAR KHOUND",
    //     "accountnum": "20020011124",
    //     "ifsccode": "SBIN0006000",
    //     "pancard": "AOXPK7308G",
    //     "gstnum": "",
    //     "address": "Mission Para, Borbil No. 1, Old Little Star School Road, Digboi, Assam-786171.",
    //     "mobile": 7086709826,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "054ba03c-8e06-4d0c-8991-03db53691af4",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "b8c1f1c2-a74b-4fb0-a9de-36e89e6892de",
    //     "projectshortname": "AE, Agartala  Bypass Tripura",
    //     "documents": [],
    //     "name": "Scorpio-01",
    //     "vehiclenum": "TR03J0782",
    //     "fixedkm": "0",
    //     "fixedbillamt": "30000",
    //     "extraamtabovefixkm": "0",
    //     "kmperlit": "9",
    //     "fuelprice": "90.16",
    //     "bankname": "Canara Bank",
    //     "accountholdername": "Global Infotech",
    //     "accountnum": "125002111083",
    //     "ifsccode": "CNRB0003484",
    //     "pancard": "CMIPS9447M",
    //     "gstnum": "16CMIPS9447M1Z3",
    //     "address": "A House of Travel Agency, Battala Dasamighat Road,Agartala,Tripura-799001.",
    //     "mobile": 9862604846,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "b14b6d66-40c7-4589-b056-f3328224b017",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "b4f1f15e-93dd-4909-ba49-402b20a23535",
    //     "projectshortname": "AE, Agartala  Bypass Tripura",
    //     "documents": [],
    //     "name": "Scorpio-2",
    //     "vehiclenum": "TR01AX0432",
    //     "fixedkm": "0",
    //     "fixedbillamt": "28000",
    //     "extraamtabovefixkm": "0",
    //     "kmperlit": "9",
    //     "fuelprice": "90.16",
    //     "bankname": "Canara Bank",
    //     "accountholdername": "Global Infotech",
    //     "accountnum": "125002111083",
    //     "ifsccode": "CNRB0003484",
    //     "pancard": "CMIPS9447M",
    //     "gstnum": "16CMIPS9447M1Z3",
    //     "address": "A House of Travel Agency, Battala, Dasamighat road, Agartala,Tripura-799001.",
    //     "mobile": 9862604846,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "b14b6d66-40c7-4589-b056-f3328224b017",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "b5119c0e-cf67-4c5f-9cc8-455f115ceb11",
    //     "projectshortname": "Digboi",
    //     "documents": [],
    //     "name": "Bolero B6",
    //     "vehiclenum": "AS23AG7126",
    //     "fixedkm": "2500",
    //     "fixedbillamt": "55000",
    //     "extraamtabovefixkm": "10",
    //     "kmperlit": "",
    //     "fuelprice": "89.38",
    //     "bankname": "STATE BANK OF INDIA",
    //     "accountholdername": "PRITAM KUMAR KHOUND",
    //     "accountnum": "20020011124",
    //     "ifsccode": "SBIN0006000",
    //     "pancard": "AOXPK7308G",
    //     "gstnum": "",
    //     "address": "Mission Para, Borbil No. 1, Old Little Star School Road, Digboi, Assam-786171.",
    //     "mobile": 7086709826,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "054ba03c-8e06-4d0c-8991-03db53691af4",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "211a73e2-d688-4e7f-a74b-60f2cbfb10ef",
    //     "projectshortname": "AE Una-Hoshiarpur",
    //     "documents": [],
    //     "name": "TOYOTA INNOVA COMPANY OWNED",
    //     "vehiclenum": "MP04CP5494",
    //     "fixedkm": "3000",
    //     "fixedbillamt": "15000",
    //     "extraamtabovefixkm": "0",
    //     "kmperlit": "",
    //     "fuelprice": "",
    //     "bankname": "NOT REQUIRED",
    //     "accountholdername": "COMPANY OWN",
    //     "accountnum": "0",
    //     "ifsccode": "00000000000",
    //     "pancard": "0000000000",
    //     "gstnum": "",
    //     "address": "The Vehicles deployed in Site Office are company owned and fuel price depend on running of vehicle also the CTC salary of driver is filled in Fixed Bill Amount option.",
    //     "mobile": 9999625292,
    //     "createdat": "2025-01-24T11:49:33.288124Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "37c94a61-63b8-4e29-a943-2a8c0961386f",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "1ad5e32a-d9cd-4b8d-b058-e038da0ad73b",
    //     "projectshortname": "Sihuni-Rajol Pkg-IIA",
    //     "documents": [],
    //     "name": "9134",
    //     "vehiclenum": "HP01D9134",
    //     "fixedkm": "2000",
    //     "fixedbillamt": "48000",
    //     "extraamtabovefixkm": "12",
    //     "kmperlit": "12",
    //     "fuelprice": "96.34",
    //     "bankname": "HDFC BANK",
    //     "accountholdername": "Sangam",
    //     "accountnum": "50200079637945",
    //     "ifsccode": "HDFC0000605",
    //     "pancard": "GMMPS4547C",
    //     "gstnum": "02GMMPS4547C4ZV",
    //     "address": "45 Mile, Gaggal Dist. Kangra, HP-176208",
    //     "mobile": 8988870007,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "d34660a0-b782-40ac-b71a-47222cce9503",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "82f30fd6-c546-4a38-87fc-a8e4928c570a",
    //     "projectshortname": "AE Una-Hoshiarpur",
    //     "documents": [],
    //     "name": "MARUTI CIAZ COMPANY OWNED",
    //     "vehiclenum": "DL12CK3702",
    //     "fixedkm": "3000",
    //     "fixedbillamt": "15000",
    //     "extraamtabovefixkm": "0",
    //     "kmperlit": "",
    //     "fuelprice": "",
    //     "bankname": "NOT REQUIRED",
    //     "accountholdername": "COMPANY OWN",
    //     "accountnum": "0",
    //     "ifsccode": "00000000000",
    //     "pancard": "0000000000",
    //     "gstnum": "",
    //     "address": "The Vehicles deployed in Site Office are company owned and fuel price depend on running of vehicle also the CTC salary of driver is filled in Fixed Bill Amount option.",
    //     "mobile": 9999625292,
    //     "createdat": "2025-01-25T11:41:49.259008Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "37c94a61-63b8-4e29-a943-2a8c0961386f",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "ad4d3902-2c11-4a9e-b847-79aa6c4ca7ff",
    //     "projectshortname": "Sihuni-Rajol Pkg-IIA",
    //     "documents": [],
    //     "name": "0256",
    //     "vehiclenum": "HP01DA0256",
    //     "fixedkm": "2000",
    //     "fixedbillamt": "55000",
    //     "extraamtabovefixkm": "12",
    //     "kmperlit": "12",
    //     "fuelprice": "96.34",
    //     "bankname": "HDFC BANK",
    //     "accountholdername": "Sangam",
    //     "accountnum": "50200079637945",
    //     "ifsccode": "HDFC0000605",
    //     "pancard": "GMMPS4547C",
    //     "gstnum": "02GMMPS4547C4ZV",
    //     "address": "45 Mile, Gaggal Dist. Kangra, HP-176208",
    //     "mobile": 8988870007,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "d34660a0-b782-40ac-b71a-47222cce9503",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "1abda8b1-805a-4840-a7f1-38bf2f3b3c77",
    //     "projectshortname": "AE SRR Phase-II",
    //     "documents": [],
    //     "name": "Mahindra Scorpio",
    //     "vehiclenum": "JK15B 7497",
    //     "fixedkm": "3000",
    //     "fixedbillamt": "55000",
    //     "extraamtabovefixkm": "15",
    //     "kmperlit": "12",
    //     "fuelprice": "84.82",
    //     "bankname": "J&K Bank",
    //     "accountholdername": "Mohd. Ashraf Sheikh",
    //     "accountnum": "0061040100018114",
    //     "ifsccode": "JAKA0WULLAR",
    //     "pancard": "IRJPS4993C",
    //     "gstnum": null,
    //     "address": "Gamro Bandipora, Jammu and Kashmir, 193502",
    //     "mobile": 7298902008,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "4765e96c-1763-4dbb-9a81-8d6f2d755036",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "e9eb9d7f-d240-4dad-8875-53ae5a7098f5",
    //     "projectshortname": "Sihuni-Rajol Pkg-IIA",
    //     "documents": [],
    //     "name": "9123",
    //     "vehiclenum": "HP01D9123",
    //     "fixedkm": "2000",
    //     "fixedbillamt": "48000",
    //     "extraamtabovefixkm": "12",
    //     "kmperlit": "12",
    //     "fuelprice": "96.34",
    //     "bankname": "HDFC BANK",
    //     "accountholdername": "Sangam",
    //     "accountnum": "50200079637945",
    //     "ifsccode": "HDFC0000605",
    //     "pancard": "GMMPS4547C",
    //     "gstnum": "02GMMPS4547C4ZV",
    //     "address": "45 Mile, Gaggal Dist. Kangra, HP-176208",
    //     "mobile": 8988870007,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "d34660a0-b782-40ac-b71a-47222cce9503",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "90529117-fe7f-4586-8f06-405cbb92b084",
    //     "projectshortname": "Sihuni-Rajol Pkg-IIA",
    //     "documents": [],
    //     "name": "9961",
    //     "vehiclenum": "HP01D9961",
    //     "fixedkm": "2000",
    //     "fixedbillamt": "55000",
    //     "extraamtabovefixkm": "12",
    //     "kmperlit": "12",
    //     "fuelprice": "96.34",
    //     "bankname": "HDFC BANK",
    //     "accountholdername": "Sangam",
    //     "accountnum": "50200079637945",
    //     "ifsccode": "HDFC0000605",
    //     "pancard": "GMMPS4547C",
    //     "gstnum": "02GMMPS4547C4ZV",
    //     "address": "45 Mile, Gaggal Dist. Kangra, HP-176208",
    //     "mobile": 8988870007,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "d34660a0-b782-40ac-b71a-47222cce9503",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "9ad41a82-db08-4d6b-bf43-c4828e49ffc5",
    //     "projectshortname": "AE JNPT Pkg-3",
    //     "documents": [
    //         {
    //             "id": "19caa381-444b-46aa-a96b-7e5b44eb0f72",
    //             "documentname": "Insurance",
    //             "documentfile": "https://cipl-aimantra.s3.amazonaws.com/documents/ErtigaInsurance.PDF?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250219%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250219T170046Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=0015df2ace34b991426e30e2b71e57e9d06770be530972ca57e5e49e134077fe",
    //             "documenttype": null,
    //             "createdat": "2025-01-15T07:37:14.159412Z",
    //             "project": null,
    //             "emolyee": null,
    //             "contractor": null,
    //             "vehicledocs": "9ad41a82-db08-4d6b-bf43-c4828e49ffc5",
    //             "employeedocs": null,
    //             "certifications": null,
    //             "lettertracking": null,
    //             "letterrecord": null,
    //             "miscellaneousdocs": null,
    //             "officerent": null,
    //             "letterstracking": null
    //         },
    //         {
    //             "id": "f54199d2-b19b-407f-a7ab-a3900c8dba51",
    //             "documentname": "RC Book",
    //             "documentfile": "https://cipl-aimantra.s3.amazonaws.com/documents/Ertiga.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250219%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250219T170046Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=79fee01b4b2256525992addb6448d7a0b4268bc12db21770658d82b7dd53512a",
    //             "documenttype": null,
    //             "createdat": "2025-01-15T07:37:39.683715Z",
    //             "project": null,
    //             "emolyee": null,
    //             "contractor": null,
    //             "vehicledocs": "9ad41a82-db08-4d6b-bf43-c4828e49ffc5",
    //             "employeedocs": null,
    //             "certifications": null,
    //             "lettertracking": null,
    //             "letterrecord": null,
    //             "miscellaneousdocs": null,
    //             "officerent": null,
    //             "letterstracking": null
    //         },
    //         {
    //             "id": "094ec959-a2ed-4663-811c-0cd94bab51d0",
    //             "documentname": "Agreement",
    //             "documentfile": "https://cipl-aimantra.s3.amazonaws.com/documents/SignedAgreementofErtigaVehicle.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250219%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250219T170046Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5d75d02c92f284297efba7cf7406261318dfc00538037808565754d207a5c989",
    //             "documenttype": null,
    //             "createdat": "2025-01-15T07:38:23.732706Z",
    //             "project": null,
    //             "emolyee": null,
    //             "contractor": null,
    //             "vehicledocs": "9ad41a82-db08-4d6b-bf43-c4828e49ffc5",
    //             "employeedocs": null,
    //             "certifications": null,
    //             "lettertracking": null,
    //             "letterrecord": null,
    //             "miscellaneousdocs": null,
    //             "officerent": null,
    //             "letterstracking": null
    //         }
    //     ],
    //     "name": "Ertiga",
    //     "vehiclenum": "MH-46-BZ-2071",
    //     "fixedkm": "3000",
    //     "fixedbillamt": "53000",
    //     "extraamtabovefixkm": "0",
    //     "kmperlit": "10",
    //     "fuelprice": "104",
    //     "bankname": "Bank of Baroda",
    //     "accountholdername": "Umesh Ghodke",
    //     "accountnum": "76210100001714",
    //     "ifsccode": "BARB0VJNPAN",
    //     "pancard": "AWCPK1570H",
    //     "gstnum": "No",
    //     "address": "Room no 07B wing M-1 Sairaj Housing society Chipale Gav Nere Road  Shikarar estate Raigad Maharashtra 410206",
    //     "mobile": 9773575754,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "b4846b52-f69f-4861-a37a-b7a2c14809ba",
    //     "projectshortname": "AE JNPT Pkg-3",
    //     "documents": [
    //         {
    //             "id": "321c316c-bddc-4b3d-84e6-28da54492752",
    //             "documentname": "Insurance",
    //             "documentfile": "https://cipl-aimantra.s3.amazonaws.com/documents/SwiftDizreInsurance.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250219%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250219T170047Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=393790363b5d8884cfbcbe5191fd16ca39454caf8ca0208ef51dfb3fe7e5a533",
    //             "documenttype": null,
    //             "createdat": "2025-01-15T07:39:14.958773Z",
    //             "project": null,
    //             "emolyee": null,
    //             "contractor": null,
    //             "vehicledocs": "b4846b52-f69f-4861-a37a-b7a2c14809ba",
    //             "employeedocs": null,
    //             "certifications": null,
    //             "lettertracking": null,
    //             "letterrecord": null,
    //             "miscellaneousdocs": null,
    //             "officerent": null,
    //             "letterstracking": null
    //         },
    //         {
    //             "id": "c0c2ae40-caca-4f70-9481-4e44e5996835",
    //             "documentname": "RC Book",
    //             "documentfile": "https://cipl-aimantra.s3.amazonaws.com/documents/SwiftDizre.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250219%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250219T170047Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8cbd25735ae6a33869823a7781a20cb98454d97644bec8385349d8e264b8bc41",
    //             "documenttype": null,
    //             "createdat": "2025-01-15T07:39:33.760809Z",
    //             "project": null,
    //             "emolyee": null,
    //             "contractor": null,
    //             "vehicledocs": "b4846b52-f69f-4861-a37a-b7a2c14809ba",
    //             "employeedocs": null,
    //             "certifications": null,
    //             "lettertracking": null,
    //             "letterrecord": null,
    //             "miscellaneousdocs": null,
    //             "officerent": null,
    //             "letterstracking": null
    //         },
    //         {
    //             "id": "3f71a669-dbb9-4443-9874-e58a934c9618",
    //             "documentname": "Agreement",
    //             "documentfile": "https://cipl-aimantra.s3.amazonaws.com/documents/SignedvehicleAgreementofswift.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHXVOR4Q5OBBZVJD%2F20250219%2Fap-south-1%2Fs3%2Faws4request&X-Amz-Date=20250219T170047Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=58fdc588184289c9c6fe37b9c876ef2e1a55cb766480a0b1bb00777194a2bde6",
    //             "documenttype": null,
    //             "createdat": "2025-01-15T07:39:53.891122Z",
    //             "project": null,
    //             "emolyee": null,
    //             "contractor": null,
    //             "vehicledocs": "b4846b52-f69f-4861-a37a-b7a2c14809ba",
    //             "employeedocs": null,
    //             "certifications": null,
    //             "lettertracking": null,
    //             "letterrecord": null,
    //             "miscellaneousdocs": null,
    //             "officerent": null,
    //             "letterstracking": null
    //         }
    //     ],
    //     "name": "Swift Dzire",
    //     "vehiclenum": "MH-46-BQ-9839",
    //     "fixedkm": "3000",
    //     "fixedbillamt": "47250",
    //     "extraamtabovefixkm": "0",
    //     "kmperlit": "10",
    //     "fuelprice": "104",
    //     "bankname": "Bank of Baroda",
    //     "accountholdername": "Umesh Ghodke",
    //     "accountnum": "76210100001714",
    //     "ifsccode": "BARB0VJNPAN",
    //     "pancard": "AWCPK1570H",
    //     "gstnum": "No",
    //     "address": "Room no 07B wing M-1 Sairaj Housing society Chipale Gav Nere Road  Shikarar estate Raigad Maharashtra 410206",
    //     "mobile": 9773575754,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "daeb92e3-009c-4db9-a9e0-2bde0ae07f09",
    //     "boqtransportation": null
    // },
    // {
    //     "id": "7777364f-2c79-4d99-8bad-7a39bad6ee75",
    //     "projectshortname": "AE SRR Phase-II",
    //     "documents": [],
    //     "name": "Mahindra Scorpio",
    //     "vehiclenum": "JK05M 96754",
    //     "fixedkm": "3000",
    //     "fixedbillamt": "55000",
    //     "extraamtabovefixkm": "15",
    //     "kmperlit": "12",
    //     "fuelprice": "84.82",
    //     "bankname": "J&K Bank",
    //     "accountholdername": "Nadeem Ahmad Shah",
    //     "accountnum": "1033040100001069",
    //     "ifsccode": "JAKA0DHOBWN",
    //     "pancard": "SEGPS8985N",
    //     "gstnum": null,
    //     "address": "Shah Mohalla Magraypora,Pattan, Jammu and Kashmir, 191101",
    //     "mobile": 7006294504,
    //     "createdat": "2025-01-23T13:37:38.323170Z",
    //     "enddate": null,
    //     "adminapprovalstatus": "approved",
    //     "project": "4765e96c-1763-4dbb-9a81-8d6f2d755036",
    //     "boqtransportation": null
    // }
    // ]);
  }

  getVehiclePartialDetailsByProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'Vehicle/Partial',
        params: param,
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
  }
  getVehiclePartialForLogsProjectId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'Vehicle/PartialForLog',
        params: param,
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
  }
  getVehicleInfoSummary(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'Vehicle/InfoSummary',
        params: param,
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
  }
  getVehicleDetailsById(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'Vehicle/Details/'+param.id,
        params: {},
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
  }
  getVehicleDocumentsById(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'Vehicle/Documents/'+param.id,
        params: {},
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
  }
  createVehicleDocumentsById(request: any, guid: string) {
    console.log(request);
    const standardAttribute: ServiceAttributeModel = {
        url: 'Vehicle/Documents',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
      }
      return this.coreApi.standardService(standardAttribute);
  }
  createBulkVehicles(request: any, guid: string) {
    console.log(request);
    const standardAttribute: ServiceAttributeModel = {
        url: 'Vehicle/Bulk',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
      }
      return this.coreApi.standardService(standardAttribute);
  }
  deleteVehicleDocumentsById(request: any, guid: string) {
    console.log(request);
    const standardAttribute: ServiceAttributeModel = {
        url: 'Vehicle/DeleteDoc',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
      }
      return this.coreApi.standardService(standardAttribute);
  }
  createVehicle(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Vehicle',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateVehicle(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Vehicle',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteVehicle(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Vehicle',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getVehicleWithBillingByVehId(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Vehicle/VehBillingDetails',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }

}
