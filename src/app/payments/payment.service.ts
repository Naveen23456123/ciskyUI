import { Injectable } from '@angular/core';
import { InvoiceInterfaceService } from '@app/shared/services/external/invoice-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private projectService:ProjectInterfaceService, private invoiceService:InvoiceInterfaceService) { }

  getAllProjectDetailsByOrdIg(param: any, guid: string) {
    return this.projectService.getAllProjectDetailsByOrdIg(param,guid);
  }
  getAllProjectPartialDetailsByOrdIg(param: any, guid: string) {
    return this.projectService.getAllProjectPartialDetailsByOrdIg(param,guid);
  }
  getInvoiceListByOrgId(param: any, guid: string) {
    return this.invoiceService.getInvoiceListByOrgId(param,guid);
  }
}
