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
      { label: 'Insurance_Name', value: 'Insurance_Name' },
      { label: 'Company_Name', value: 'Company_Name' },
      { label: 'Policy_Number', value: 'Policy_Number' },
      { label: 'Amount', value: 'Amount' },
      { label: 'Start_Date', value: 'Start_Date' },
      { label: 'Expiry_Date', value: 'Expiry_Date' }
    
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

    getInsuranceListByProjectIdByOrgId(param: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'Insurance',
        params: param,
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
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
