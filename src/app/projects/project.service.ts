import { Injectable } from '@angular/core';
import { BankGuaranteeInterfaceService } from '@app/shared/services/external/bank-guarantee-interface.service';
import { ContactInterfaceService } from '@app/shared/services/external/contact-interface.service';
import { ContractorInterfaceService } from '@app/shared/services/external/contractor-interface.service';
import { CosInterfaceService } from '@app/shared/services/external/cos-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { EotInterfaceService } from '@app/shared/services/external/eot-interface.service';
import { InsuranceInterfaceService } from '@app/shared/services/external/insurance-interface.service';
import { InventoryInterfaceService } from '@app/shared/services/external/inventory-interface.service';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { MilestoneInterfaceService } from '@app/shared/services/external/milestone-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SiteProgressInterfaceService } from '@app/shared/services/external/site-progress-interface.service';
import { VehicleInterfaceService } from '@app/shared/services/external/vehicle-interface.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private projectInterface : ProjectInterfaceService, private contractorService : ContractorInterfaceService,
    private mileStoneService:MilestoneInterfaceService, private siteProgressService: SiteProgressInterfaceService,
    private eotService: EotInterfaceService, private cosService: CosInterfaceService, private contractLettersService:LetterInterfaceService,
    private insuranceService:InsuranceInterfaceService, private bankGuaranteeService:BankGuaranteeInterfaceService,
    private vehicleService:VehicleInterfaceService, private employeeService : EmployeeInterfaceService,
    private inventoryService: InventoryInterfaceService, private contactService:ContactInterfaceService
  ) { }

  getAllProjectDetailsByOrdIg(request: any, guid: string){
    return this.projectInterface.getAllProjectDetailsByOrdIg(request,guid);
  }
  getProjectCSVTemplateColumnList(){
    return this.projectInterface.getCSVTemplateColumnList();
  }
  getAllProjectDetailsById(param: any, guid: string){
    return this.projectInterface.getAllProjectDetailsById(param,guid);
  }
  getAllContractorDetailsByProjectId(param: any, guid: string) {
    return this.contractorService.getAllContractorDetailsByProjectId(param,guid);
  } 

  getAllContractorDetailsListViewById(param: any, guid: string){
    return this.contractorService.getAllContractorDetailsListViewById(param,guid); 
  }
  
  getMilestoneListComponent() {
    return this.mileStoneService.getMilestoneListComponent();
  }
  getSiteProgressListComponent() {
    return this.siteProgressService.getSiteProgressListComponent();
  }
  getEotListComponent() {
    return this.eotService.getEotListComponent();
  }
  getCostListComponent() {
    return this.cosService.getCostListComponent();
  }
  getContractorLettersListComponent() {
    return this.contractLettersService.getContractorLettersListComponent();
  }
  getBankGuaranteeListComponent() {
    return this.bankGuaranteeService.getBankGuaranteeListComponent();
  }
  getInsuranceListComponent() {
    return this.insuranceService.getInsuranceListComponent();
  }
  getContractorBillingListComponent() {
    return this.contractorService.getContractorBillingListComponent();
  }
  getVehicleListComponent() {
    return this.vehicleService.getVehicleListComponent();
  }

  getEmployeeListComponent() {
    return this.employeeService.getEmployeeListComponent();
  }
  getInventoryListComponent() {
    return this.inventoryService.getInventoryListComponent();
  }
  
  getContactListComponent() {
    return this.contactService.getContactListComponent();
  }
}
