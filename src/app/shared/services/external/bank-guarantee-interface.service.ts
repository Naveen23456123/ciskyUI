import { Injectable, Type } from '@angular/core';
import { BankGuaranteeListComponent } from '@app/shared/components/bank-guarantee/bank-guarantee-list/bank-guarantee-list.component';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class BankGuaranteeInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getTemplateColumnList() {
    let columns = [
      { label: 'Bank_Name', value: 'Bank_Name' },
      { label: 'Bank_Guarantee_Name', value: 'Bank_Guarantee_Name' },
      { label: 'Amount', value: 'Amount' },
      { label: 'Start_Date', value: 'Start_Date' },
      { label: 'Expiry_Date', value: 'Expiry_Date' },
      { label: 'Release_Date', value: 'Release_Date' },
      { label: 'Remarks', value: 'Remarks' },
    ];
  return columns;
  }

  getBankGuaranteeListComponent(){
    return {
        component: BankGuaranteeListComponent,
          inputs: {
            headline: 'All BankGuarantee',             
          }
    } as {component: Type<any>, inputs: Record<string, unknown>}
  }
  getBankGuaranteeListByProjectIdByOrgId(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'BankGuarantee/Search',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
    }
      return this.coreApi.standardService(standardAttribute);
  }

  createBankGuarantee(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BankGuarantee',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updateBankGuarantee(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BankGuarantee',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deleteBankGuarantee(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'BankGuarantee',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}
