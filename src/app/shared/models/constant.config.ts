import { group } from '@angular/animations';
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
  projectEntityStorage: string;
  invoiceEntityStorage: string;
  orgData: string;
  IsEditableTrue: number;
  Active: number;
  AuthToken: string;
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
  orgData: 'org-data',
  workingProjectStorage: 'project',
  projectEntityStorage: 'project-entity',
  invoiceEntityStorage: 'invoice-entity',
  IsEditableTrue: 1,
  Active: 1,
  AuthToken: 'auth-token',
  InActive: 2

};

export interface ILetterType {
  SITE_PROGRESS: string;
  EOT: string;
  COS: string;
  CONTRACTORBILL: string;
  CONTRACTORREOMMENDED: string;
  MILESTONE: string;
  allLetter: string;
  BILLING: string

}
export const LetterType: ILetterType = {
  SITE_PROGRESS: 'Site progress',
  EOT: 'eot',
  COS: 'cos',
  CONTRACTORBILL: 'Bill',
  CONTRACTORREOMMENDED: 'Recommended',
  MILESTONE: 'milestone',
  BILLING: 'billing',
  allLetter: 'letter'

};
export enum LetterEntity {
  CONSULTANT = 'consultant',
  CONTRACTOR = 'contractor',
  ANY = 'any'
}
export enum DialogOperation {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete'
}
export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  INPROCESS = 'inprocess',
  CLOSE = 'close'
}
export enum WorkTypeStatus {
  ACHIEVED = 'achieved',
  NOT_ACHIEVED = 'not achieved'
}

export enum StaffType {
  SUPPORT_STAFF = 'Support Staff',
  KEY_PROFESSIONAL = 'Key Professional',
  SUB_PROFESSIONAL = 'Sub Professional'
}

export enum ProfitLossScope {
  REVENUE_FROM_OPERATION = 'REVENUE_FROM_OPERATION',
  OTHER_INCOME = 'OTHER_INCOME',
  EMPLOYEE_BENEFIT_EXPENSES = 'EMPLOYEE_BENEFIT_EXPENSES',
  FINANCE_COST = 'FINANCE_COST',
  OTHER_EXPENSES = 'OTHER_EXPENSES'
}
export enum BOQ_INVOICE {
  ALL_RECORD_INSERTED_MESSAGE = "As per BOQ , All record have been successfully added. Kindly update the record if want to change or delete the existing record and add a new one."
}

export const TOTAL_PROFIT_LOSS_HEADING = [
  { Name: "Revenue", ispersonal: false, isadmin: false, isincome: true, key: 'INCOME' },
  { Name: "Personal Expense", ispersonal: true, isadmin: false, isincome: false, key: 'PERSONAL' },
  { Name: "Admin Expense", isadmin: true, ispersonal: false, isincome: false, key: 'ADMIN' },
  { Name: "Overhead Expenses", isadmin: true, ispersonal: false, isincome: false, key: 'OVERHEAD_DEDUCTIONS' }

];

export interface DynamicTabComponent {
  subsectorId: string;
}
//Guid for permission 
export const PermissionGuids = {
  vehicle: '680dd2733682904bdd6e9ab7',
  inventory: '680dd2933682904bdd6e9ab5',
  siteEmployee: '680dd2733682904bdd6e9aa9',
  letters: '680dd1bd3682904bdd6e9ac1',
  profitloss:'680dd1bd3682904bdd6e9ac8',
  expense:'680dd2933682904bdd6e9afc'
};

//sectors
export interface Subsector {
  name: string;
  id: string;
  abbr: string;
}

export interface Sector {
  name: string;
  id: string;
  abbr: string;
  subcategories?: Subsector[];
}
export enum SECTOR_ABBR {
  TRASNPORT = 'Transport',
  CONSTRUCTION_SUPERVISION = 'AE/IE',
  OM_OPERATION = 'O&M',
  DETAILED_PROJECT_REPORT = 'DPR',
  FEAIBILITY_REPORT = 'FS',
  SAFETY_CONSULTANT = 'SC'
};
export const SECTORS: Sector[] = [
  {
    name: 'Smart Cities/Urban',
    abbr: '',
    id: ''
  },
  {
    name: 'Env & Social',
    abbr: '',
    id: ''
  },
  {
    name: 'Survey & Testing',
    abbr: '',
    id: ''
  },
  {
    name: 'Finance & Advisory',
    abbr: '',
    id: ''
  },
  {
    name: 'Transport Infra',
    abbr: 'Transport',
    id: '',
    subcategories: [
      { name: 'Construction Provision', abbr: SECTOR_ABBR.CONSTRUCTION_SUPERVISION, id: '' },
      { name: 'O&M Operation', abbr: SECTOR_ABBR.OM_OPERATION, id: '' },
      { name: 'Detailed Project Report', abbr: SECTOR_ABBR.DETAILED_PROJECT_REPORT, id: '' },
      { name: 'Feasibility Report', abbr: SECTOR_ABBR.FEAIBILITY_REPORT, id: '' },
      { name: 'Safety Consultant', abbr: SECTOR_ABBR.SAFETY_CONSULTANT, id: '' }
    ]
  },
  {
    name: 'Railway & Metros',
    abbr: '',
    id: '',
    subcategories: [
      { name: 'Construction Provision', abbr: SECTOR_ABBR.CONSTRUCTION_SUPERVISION, id: '' },
      { name: 'O&M Operation', abbr: SECTOR_ABBR.OM_OPERATION, id: '' },
      { name: 'Detailed Project Report', abbr: SECTOR_ABBR.DETAILED_PROJECT_REPORT, id: '' },
      { name: 'Feasibility Report', abbr: SECTOR_ABBR.FEAIBILITY_REPORT, id: '' },
      { name: 'Safety Consultant', abbr: SECTOR_ABBR.SAFETY_CONSULTANT, id: '' }
    ]
  },
  {
    name: 'Water Resources',
    abbr: '',
    id: '',
    subcategories: [
      { name: 'Construction Provision', abbr: SECTOR_ABBR.CONSTRUCTION_SUPERVISION, id: '' },
      { name: 'O&M Operation', abbr: SECTOR_ABBR.OM_OPERATION, id: '' },
      { name: 'Detailed Project Report', abbr: SECTOR_ABBR.DETAILED_PROJECT_REPORT, id: '' },
      { name: 'Feasibility Report', abbr: SECTOR_ABBR.FEAIBILITY_REPORT, id: '' },
      { name: 'Safety Consultant', abbr: SECTOR_ABBR.SAFETY_CONSULTANT, id: '' }
    ]
  },
  {
    name: 'Tourism',
    abbr: '',
    id: '',

  }
];

// Bill Type
export enum BillType {
  IPC = 'ipc',
  SPS = 'sps'
}
export enum BillPercentage {
  IPC = 10,
  SPS = 90
}
// Merge into key-value-percentage list
export const BillTypePercentValue = Object.keys(BillType).map((key) => ({
  key,
  value: BillType[key as keyof typeof BillType],
  percentage: BillPercentage[key as keyof typeof BillPercentage]
}));

export const DECIMAL_LIMIT = {
  BOQ: 3,
  INVOICE: 3,     // allow 3 digits after decimal
  TAX: 2,          // example: allow 2 digits after decimal
  WEIGHT: 4        // example: allow 4 digits
};

export const BOQ_TBN = {
  TBN: 'TBN'
}