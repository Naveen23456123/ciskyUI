import { Injectable } from '@angular/core';
import { OfficeInterfaceService } from '@app/shared/services/external/office-interface.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(private officeSevice:OfficeInterfaceService) { }

  getOfficeRentsByOrdIdProjectId(param: any, guid: string) {
    return this.officeSevice.getOfficeRentsByOrdIdProjectId(param,guid);
  }
  searchOfficeRent(request: any, guid: string) {
    return this.officeSevice.searchOfficeRent(request,guid);
  }
}
