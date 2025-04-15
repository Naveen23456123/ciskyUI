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
    IsEditableTrue: number;
    Active: number;
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
    workingProjectStorage: 'project',
    projectEntityStorage: 'project-entity',
    IsEditableTrue: 1,
    Active: 1,
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
    REJECTED='rejected'
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

