import { Injectable, Type } from '@angular/core';
import { ContactListComponent } from '@app/shared/components/contacts/contact-list/contact-list.component';
import { Operation } from '@app/shared/models/http/ActionModel';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { of } from 'rxjs';
import { CoreAPIService } from './coreapi.service';

@Injectable({
  providedIn: 'root'
})
export class ContactInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getTemplateColumnList() {
      let columns = [
        { label: 'Contact_Type', value: 'Contact_Type' },
        { label: 'Contact_Name', value: 'Contact_Name' },
        { label: 'Designation', value: 'Designation' },
        { label: 'Contact_Number', value: 'Contact_Number' },
        { label: 'Alternate_Contact_Number', value: 'Contact_Number' },
        { label: 'Email', value: 'Email' },
        { label: 'Office_Branch', value: 'Office_Branch' },
        { label: 'Office_Address', value: 'Office_Address' }
      ];
    return columns;
    }
  
    getContactListComponent(){
      return {
          component: ContactListComponent,
            inputs: {
              headline: 'All Contacts',             
            }
      } as {component: Type<any>, inputs: Record<string, unknown>}
    }

// getContactListByProjectIdAndOrgId(param: any, guid: string) {
//   return of([{
//     "contacttype":"NHAI",
//     "name":"Ashish",
//     "designationname":"General Manager",
//     "contactno":"9873945",
//     "alternatecontactno":"783465234",
//     "email":"ashish@gmail.com",
//     "branchname":"PIU",
//     "address":"Sri nagar"
//     }])
//     }
    getContactListByProjectIdAndOrgId(param: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'ConsultantContact/'+param.id,
        params: {},
        headers: true,
        guid: '',
        request: {},
        action: Operation.GET
      }
      return this.coreApi.standardService(standardAttribute);
    }
    createConsultantContact(request: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'ConsultantContact',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
      }
      return this.coreApi.standardService(standardAttribute);
    }
    updateConsultantContact(request: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'ConsultantContact',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.UPDATE
      }
      return this.coreApi.standardService(standardAttribute);
    }
    deleteConsultantContact(params: any, guid: string) {
      const standardAttribute: ServiceAttributeModel = {
        url: 'ConsultantContact',
        params: params,
        headers: true,
        guid: '',
        request: {},
        action: Operation.DELETE
      }
      return this.coreApi.standardService(standardAttribute);
    }
}
