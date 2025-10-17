import { Injectable } from '@angular/core';
import { BoqContingencyInterfaceService } from '@app/shared/services/external/boq/boq-contingency-interface.service';
import { BoqDutyTravelInterfaceService } from '@app/shared/services/external/boq/boq-duty-travel-interface.service';
import { BoqOfficeFurnitureInterfaceService } from '@app/shared/services/external/boq/boq-office-furniture-interface.service';
import { BoqOfficeRentInterfaceService } from '@app/shared/services/external/boq/boq-office-rent-interface.service';
import { BoqOfficeSupplyInterfaceService } from '@app/shared/services/external/boq/boq-office-supply-interface.service';
import { BoqReportDocInterfaceService } from '@app/shared/services/external/boq/boq-report-doc-interface.service';
import { BoqRoadSurveyInterfaceService } from '@app/shared/services/external/boq/boq-road-survey-interface.service';
import { BoqStaffInterfaceService } from '@app/shared/services/external/boq/boq-staff-interface.service';
import { BoqTransportationInterfaceService } from '@app/shared/services/external/boq/boq-transportation-interface.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { DesignationInterfaceService } from '@app/shared/services/external/designation-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { InvContingencyInterfaceService } from '@app/shared/services/external/invoice/inv-contingency-interface.service';
import { InvDutyTravelInterfaceService } from '@app/shared/services/external/invoice/inv-duty-travel-interface.service';
import { InvOfcFurnitureInterfaceService } from '@app/shared/services/external/invoice/inv-ofc-furniture-interface.service';
import { InvOfcRentInterfaceService } from '@app/shared/services/external/invoice/inv-ofc-rent-interface.service';
import { InvOfcSupplyInterfaceService } from '@app/shared/services/external/invoice/inv-ofc-supply-interface.service';
import { InvReportDocInterfaceService } from '@app/shared/services/external/invoice/inv-report-doc-interface.service';
import { InvRoadSurveyInterfaceService } from '@app/shared/services/external/invoice/inv-road-survey-interface.service';
import { InvStaffInterfaceService } from '@app/shared/services/external/invoice/inv-staff-interface.service';
import { InvTransportInterfaceService } from '@app/shared/services/external/invoice/inv-transport-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private boqstaffService:BoqStaffInterfaceService, private boqTransportService:BoqTransportationInterfaceService,
    private projectService:ProjectInterfaceService,
    private staffService:InvStaffInterfaceService,private boqReportDOcService:BoqReportDocInterfaceService,
    private boqContingency : BoqContingencyInterfaceService, private commonService:CommonInterfaceService,
    private transportService:InvTransportInterfaceService, private dutyTravelService:InvDutyTravelInterfaceService,
    private officeRentService: InvOfcRentInterfaceService, private officeFurntiureService:InvOfcFurnitureInterfaceService,
    private officeSupplyService:InvOfcSupplyInterfaceService, private reportDocService : InvReportDocInterfaceService ,
    private roadSurveyService:InvRoadSurveyInterfaceService, private contigencyService:InvContingencyInterfaceService) { }

  getBoqStaffListByProjectId(param: any, guid: string) {
    return this.staffService.getBoqStaffListByProjectId(param,guid);
  }
  getConsultantStaffListByProjectId(param: any, guid: string) {
    return this.staffService.getConsultantStaffListByProjectId(param,guid);
  }
  getBoqTransportationListByProjectId(param: any, guid: string) {
    return this.boqTransportService.getBoqTransportationListByProjectId(param,guid);
  }

  getConsultantTransportationListByProjectId(param: any, guid: string) {
    return this.transportService.getConsultantTransportationListByProjectId(param,guid);
  }

  getBoqOfficeRentListByProjectId(param: any, guid: string) {
    return this.officeRentService.getBoqOfficeRentListByProjectId(param,guid);
  }
  getBoqOfficeSupplyListByProjectId(param: any, guid: string) {
    return this.officeSupplyService.getBoqOfficeSupplyListByProjectId(param,guid);
  }
  getBoqOfficeFurnitureListByProjectId(param: any, guid: string) {
    return this.officeFurntiureService.getBoqOfficeFurnitureListByProjectId(param,guid);
  }
  getConsultantOfficeRentListByProjectId(param: any, guid: string) {
    return this.officeRentService.getConsultantOfficeRentListByProjectId(param,guid);
  }
  getConsultantOfficeSupplyListByProjectId(param: any, guid: string) {
    return this.officeSupplyService.getConsultantOfficeSupplyListByProjectId(param,guid);
  }
  getConsultantOfficeFurnitureListByProjectId(param: any, guid: string) {
    return this.officeFurntiureService.getConsultantOfficeFurnitureListByProjectId(param,guid);
  }
  getBoqDutyTravelListByProjectId(param: any, guid: string) {
    return this.dutyTravelService.getBoqDutyTravelListByProjectId(param,guid);
  }
  getConsultantDutyTravelListByProjectId(param: any, guid: string) {
    return this.dutyTravelService.getConsultantDutyTravelListByProjectId(param,guid);
  }
  getBoqRoadSurveyListByProjectId(param: any, guid: string) {
    return this.roadSurveyService.getBoqRoadSurveyListByProjectId(param,guid);
  }
  getConsultantRoadSurveyListByProjectId(param: any, guid: string) {
    return this.roadSurveyService.getConsultantRoadSurveyListByProjectId(param,guid);
  }
  getBoqReportDocListByProjectId(param: any, guid: string) {
    return this.reportDocService.getBoqReportDocListByProjectId(param,guid);
  }
  getConsultantReportDocListByProjectId(param: any, guid: string) {
    return this.reportDocService.getConsultantReportDocListByProjectId(param,guid);
  }
  getBoqContingencyListByProjectId(param: any, guid: string) {
    return this.boqContingency.getBoqContingencyListByProjectId(param,guid);
  }
  getStaffTypesList(param: any, guid: string) {
    return this.commonService.getStaffTypesList(param,guid);
  }
  getProjectScopeDurationById(param: any, guid: string) {
    return this.projectService.getProjectScopeDurationById(param,guid);
  }  
  getConsultantContingencyListByProjectId(param: any, guid: string) {
    return this.contigencyService.getConsultantContingencyListByProjectId(param,guid);
  }
    getProjectBoqAmountSummary(param: any, guid: string) {
    return this.projectService.getProjectBoqAmountSummary(param,guid);
  }
}
