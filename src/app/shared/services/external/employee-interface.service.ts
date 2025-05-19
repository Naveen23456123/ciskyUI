import { Injectable, Type } from '@angular/core';
import { ManageEmployeeListComponent } from '@app/shared/components/employee/manage-employee-list/manage-employee-list.component';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getTemplateColumnList() {
    let columns = [
      { label: 'Employee_Code', value: 'Code' },
      { label: 'Project_Code', value: 'ProjectCode' },
      { label: 'Employee_Name', value: 'name' },
      { label: 'Date_Of_Birth', value: 'dateOfBirth' },
      { label: 'Role', value: 'roleid' },
      { label: 'Gender', value: 'genderId' },
      { label: 'Marital_Status', value: 'maritalStatusId' },
      { label: 'Qualification', value: 'qualification' },
      { label: 'Designation', value: 'designation' },
      { label: 'Professional_Type', value: 'TypeId' },
      { label: 'Current_Address', value: 'currentAddress' },
      { label: 'Mobile', value: 'PhoneNumber' },
      { label: 'Email', value: 'emailId' },
      { label: 'Joining_Date', value: 'joiningDate' },
      { label: 'Employee_Status', value: 'statusId' },
      { label: 'Emergency_Person_Name', value: 'emergencyPersonName' },
      { label: 'Emergency_Contact_Number', value: 'EmergencyContactNumber' },
      { label: 'Emergency_Relation', value: 'relation' },
      { label: 'Emergency_Address', value: 'emergencyAddress' },
      { label: 'Sub_Company', value: 'Company' },
      { label: 'Account_Number', value: 'AccountNumber' },
      { label: 'IFSC_Code', value: 'ifscCode' },
      { label: 'Bank_Name', value: 'bankName' },
      { label: 'Bank_Address', value: 'bankAddress' },
      { label: 'UAN_Number', value: 'UanNumber' },
      { label: 'Aadhaar_Number', value: 'AadharNumber' },
      { label: 'PAN_Number', value: 'PanNumber' },
    ];
  return columns;
  }

  getEmployeeListComponent(){
            return {
              component: ManageEmployeeListComponent,
              inputs: {
                headline: 'Employee List'
              }
        } as {component: Type<any>, inputs: Record<string, unknown>}
    }

  getAllEmployeesByOrdId(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'SiteEmployee',
        params: param,
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
  }

  getSiteEmployeeParital(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SiteEmployee/Partial',
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  } 
  getSiteEmployeeUsingItem(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SiteEmployee/ItemEmployees/'+param.itemid,
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getSiteEmployeeDetailsById(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SiteEmployee/Details/'+param.id,
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getSiteEmployeeById(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SiteEmployee/'+param.id,
      params: param,
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createEmployee(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SiteEmployee',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  searchEmployee(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SiteEmployee/Search',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createBulkSiteEmployees(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SiteEmployee/Bulk',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  uploadEmployeeImage(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SiteEmployee/UploadImage',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }

  updateEmployee(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SiteEmployee',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteEmployee(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'SiteEmployee',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }

  getEmployeeDocumentsById(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'SiteEmployee/Documents/'+param.id,
        params: {},
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
  }
  createEmployeeDocumentsById(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'SiteEmployee/Documents',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
      }
      return this.coreApi.standardService(standardAttribute);
  }
  deleteEmployeeDocumentsById(request: any, guid: string) {
    console.log(request);
    const standardAttribute: ServiceAttributeModel = {
        url: 'SiteEmployee/DeleteDoc',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
      }
      return this.coreApi.standardService(standardAttribute);
  }
}
