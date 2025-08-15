import { InjectionToken } from '@angular/core';

export let CONSTANTS = new InjectionToken('constants.config');
export interface AppConstants {
    create: string;
    update: string;
    delete: string;
    get: string;
    invalid: string;
    //Storage Constants
    OrgLocationStorage: string;
    userStorage: string;
    workingProjectStorage: string;
    projectEntityStorage:string;
    invoiceEntityStorage:string;
    orgData:string;
    IsEditableTrue: number;
    Active: number;
    AuthToken:string;
    InActive: number;

}
export const Constants: AppConstants = {
    create: 'create',
    update: 'update',
    delete: 'delete',
    get: 'get',
    invalid: 'invalid',
    OrgLocationStorage: 'Location',
    userStorage: 'User',
    orgData:'org-data',
    workingProjectStorage: 'project',
    projectEntityStorage: 'project-entity',
    invoiceEntityStorage:'invoice-entity',
    IsEditableTrue: 1,
    Active: 1,
    AuthToken:'auth-token',
    InActive: 2

};

export interface ILetterType {
    SITE_PROGRESS: string;
    EOT: string;
    COS: string;
    CONTRACTORBILL: string;
    CONTRACTORREOMMENDED: string;
    MILESTONE: string;
    allLetter:string;
    BILLING:string

}
export const LetterType: ILetterType = {
    SITE_PROGRESS: 'Site progress',
    EOT: 'eot',
    COS: 'cos',
    CONTRACTORBILL: 'Bill',
    CONTRACTORREOMMENDED: 'Recommended',
    MILESTONE: 'milestone',
    BILLING: 'billing',
    allLetter:'letter'

};
export enum LetterEntity{
    CONSULTANT='consultant',
    CONTRACTOR='contractor',
    ANY='any'
}
export enum DialogOperation{
    ADD='add',
    EDIT='edit',
    DELETE='delete'
}
export enum ApprovalStatus{
    PENDING='pending',
    APPROVED='approved',
    REJECTED='rejected',
    INPROCESS='inprocess',
    CLOSE='close'
}
export enum WorkTypeStatus{
    ACHIEVED='achieved',
    NOT_ACHIEVED='not achieved'
}

export enum StaffType{
    SUPPORT_STAFF='Support Staff',
    KEY_PROFESSIONAL='Key Professional',
    SUB_PROFESSIONAL='Sub Professional'
}

export enum ProfitLossScope{
    REVENUE_FROM_OPERATION='REVENUE_FROM_OPERATION',
    OTHER_INCOME='OTHER_INCOME',
    EMPLOYEE_BENEFIT_EXPENSES='EMPLOYEE_BENEFIT_EXPENSES',
    FINANCE_COST='FINANCE_COST',
    OTHER_EXPENSES='OTHER_EXPENSES'
}
export enum BOQ_INVOICE{
    ALL_RECORD_INSERTED_MESSAGE="As per BOQ , All record have been successfully added. Kindly update the record if want to change or delete the existing record and add a new one."
}

export const TOTAL_PROFIT_LOSS_HEADING = [
    { Name: "Revenue", ispersonal: false,isadmin: false, isincome:true },
    { Name: "Personal expense", ispersonal: true,isadmin: false,isincome:false  },
    { Name: "Admin expense", isadmin: true,ispersonal: false,isincome:false  }   
   
  ];

  export interface DynamicTabComponent {
  subsectorId: string;
}