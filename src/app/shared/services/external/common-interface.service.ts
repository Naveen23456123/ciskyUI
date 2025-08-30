import { Injectable } from '@angular/core';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { Operation } from '@app/shared/models/http/ActionModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';


@Injectable({
  providedIn: 'root'
})
export class CommonInterfaceService {

  constructor(private coreApi: CoreAPIService) { }

  
  getLetterStatusList(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/GeneralStatus',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getDepartmentsList(param: any, guid: string) {
    return of([
      {'id':'562534-23432', 'name':'Design'},
      {'id':'562534-23432', 'name':'Highway'},
      {'id':'562534-23432', 'name':'Quality'},
      {'id':'562534-23432', 'name':'Billing'},
    ]);
  }
  getExchangeTypeList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/ExchangeType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  } 
  getApprovalRoles(){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/ApprovalRoles',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getAppRoles(){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/AppRoles',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
    return this.coreApi.standardService(standardAttribute);
  }
  getCircularTypes(){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/CircularType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getGeneralStatusList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/GeneralStatus',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }

  getAccountTypeList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/AccountType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);    
  }
  getEmployeeTypeList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/StaffType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute); 
  }
  getPReportList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/PReportType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute); 
  }
  getEmployeeRoleList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/EmployeeRoles',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getEmployeeStatusList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/StatusType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getStatusList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/StatusType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getGenderList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/GenderType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute); 
  }

  getMaritalStatusList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/MaritalStatus',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute); 
  }
  getWorkOwnerList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/WorkOwner',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getOfficeTypeList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/OfficeType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getEntityTypeList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/EntityType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getApprovalStatusList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/ApprovalStatus',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getOurRoleList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/OurRole',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute); 
  }
  getProjectWorkTypeList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/ProjectWorkType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute); 
  }

  getContractModeList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/ContractMode',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute); 
  }

  getStaffTypesList(param: any, guid: string){
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/StaffType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }

  getBillTypeList(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/BillType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getBillCategoryList(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/BillCategory',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getContactTypeList(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/ContactType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getCommonDesignationList(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/CommonDesignation',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getWorkStatusTypeList(param: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Common/WorkStatusType',
      params: {},
      headers: true,
      guid: '',
      request: {},
      action: Operation.GET
    }
     return this.coreApi.standardService(standardAttribute);
  }
  getContactDesignationList(param: any, guid: string) {
    return of([
      {'id':'562534-23432', 'name':'Deputy Manager'},
      {'id':'562534-23432', 'name':'General Manager'},
    ]);
  }

  getContactBranchList(param: any, guid: string) {
    return of([
      {'id':'562534-23432', 'name':'PIU'},
      {'id':'562534-23432', 'name':'RO'},
    ]);
  }
}
