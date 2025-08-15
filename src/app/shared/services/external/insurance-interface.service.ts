import { Injectable, Type } from '@angular/core';
import { InsuranceListComponent } from '@app/shared/components/insurance/insurance-list/insurance-list.component';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getTemplateColumnList() {
    let columns = [
      { label: 'Project', value: 'Project' },
      { label: 'Insurance_Name', value: 'insurancename' },
      { label: 'Company_Name', value: 'companyname' },
      { label: 'Policy_Number', value: 'policynumber' },
      { label: 'Amount', value: 'amount' },
      { label: 'Start_Date', value: 'startdate' },
      { label: 'Expiry_Date', value: 'enddate' }
    
    ];
  return columns;
  }
  getCsvTemplateColumnList() {
    let columns = [
      { label: 'Insurance_Name', value: 'insurancename' },
      { label: 'Company_Name', value: 'companyname' },
      { label: 'Policy_Number', value: 'policynumber' },
      { label: 'Amount', value: 'amount' },
      { label: 'Start_Date', value: 'startdate' },
      { label: 'Expiry_Date', value: 'enddate' }
    
    ];
  return columns;
  }
  getInsuranceListComponent(){
        return {
          component: InsuranceListComponent,
          inputs: {
            headline: 'All Insurance',             
          }
      } as {component: Type<any>, inputs: Record<string, unknown>}
  }

  getInsuranceListByProjectIdByOrgId(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Insurance/Search',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }

  createInsurance(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Insurance',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  createBulkInsurance(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Insurance/Bulk',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateInsurance(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Insurance',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteInsurance(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'Insurance',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}
