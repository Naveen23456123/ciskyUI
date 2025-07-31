import { Injectable } from '@angular/core';
import { CoreAPIService } from './coreapi.service';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { Operation } from '@app/shared/models/http/ActionModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectReportInterfaceService {

  constructor(private coreApi:CoreAPIService) { }

  getCSVTemplateColumnList() {
      let columns = [
        { label: 'Type', value: 'type' },
        { label: 'Name', value: 'name' },
        { label: 'Number', value: 'no' },
        { label: 'Letter_Number', value: 'letterno' },
        { label: 'Date', value: 'date' },
        { label: 'Email', value: 'email' },
        { label: 'Remarks', value: 'remark' }
      ];
    return columns;
  }
  getPReportList(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'PReport/Search',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
    }
      return this.coreApi.standardService(standardAttribute);
  }
  getPReportAllList(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
        url: 'PReport/SearchAll',
        params: {},
        headers: true,
        guid: '',
        request: request,
        action: Operation.CREATE
    }
      return this.coreApi.standardService(standardAttribute);
  }
  createPReport(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'PReport',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.CREATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  updatePReport(request: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'PReport',
      params: {},
      headers: true,
      guid: '',
      request: request,
      action: Operation.UPDATE
    }
    return this.coreApi.standardService(standardAttribute);
  }
  deletePReport(params: any, guid: string) {
    const standardAttribute: ServiceAttributeModel = {
      url: 'PReport',
      params: params,
      headers: true,
      guid: '',
      request: {},
      action: Operation.DELETE
    }
    return this.coreApi.standardService(standardAttribute);
  }
}

