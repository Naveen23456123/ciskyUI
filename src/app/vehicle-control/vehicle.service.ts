import { Injectable } from '@angular/core';
import { VehicleBillingInterfaceService } from '@app/shared/services/external/vehicle-billing-interface.service';
import { VehicleInterfaceService } from '@app/shared/services/external/vehicle-interface.service';
import { VehicleLogInterfaceService } from '@app/shared/services/external/vehicle-log-interface.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private vehicleService: VehicleInterfaceService,
    private vehcileBillingService:VehicleBillingInterfaceService, private vehicleLogService:VehicleLogInterfaceService
  ) {

   }
   getVehileDetailsByOrgId(param: any, guid: string) {
     return this.vehicleService.getVehileDetailsByOrgId(param,guid);
   }
   getVehicleCSVTemplateColumnList() {
     return this.vehicleService.getCSVTemplateColumnList();
   }
   getVehicleLogDetailsByOrgId(request: any, guid: string){
    return this.vehicleLogService.getVehicleLogDetails(request,guid);
   }
   getVehicleBillingDetailsByOrgId(request: any, guid: string) {
    return this.vehcileBillingService.getVehicleBillingDetails(request,guid);
   }
   getVehicleViewLogDetails(param: any, guid: string) {
    return this.vehicleLogService.getVehicleViewLogDetails(param,guid);
   }
   getVehicleListComponent() {
    return this.vehicleService.getVehicleListComponent();
   }

}
