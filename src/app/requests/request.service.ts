import { Injectable } from '@angular/core';
import { ExpenseInterfaceService } from '@app/shared/services/external/expense-interface.service';
import { ImperestInterfaceService } from '@app/shared/services/external/imperest-interface.service';
import { OfficeInterfaceService } from '@app/shared/services/external/office-interface.service';
import { VehicleBillingInterfaceService } from '@app/shared/services/external/vehicle-billing-interface.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private officeService:OfficeInterfaceService, private imperestService:ImperestInterfaceService,
    private vehicleBillingService:VehicleBillingInterfaceService, private expenseService:ExpenseInterfaceService
  ) { }

  searchOfficeBillingRequests(request: any, guid: string) {
    return this.officeService.searchOfficeBillingRequests(request, guid);
  }
  searchImperestBillingRequests(request: any, guid: string) {
    return this.imperestService.searchImperestBillingRequests(request, guid);
  }
  searchVehicleBillingRequests(request: any, guid: string) {
    return this.vehicleBillingService.searchVehicleBillingRequests(request, guid);
  }
  searchExpenseBillingRequests(request: any, guid: string) {
    return this.expenseService.searchExpenseBillingRequests(request, guid);
  }
}
