import { Injectable } from '@angular/core';
import { ConsultantAccountInterfaceService } from '@app/shared/services/external/consultant-account-interface.service';
import { DepartmentInterfaceService } from '@app/shared/services/external/department-interface.service';
import { DesignationInterfaceService } from '@app/shared/services/external/designation-interface.service';
import { SiteControlInterfaceService } from '@app/shared/services/external/site-control-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';

@Injectable({
  providedIn: 'root'
})
export class SiteControlService {

  constructor(private siteControlService:SiteControlInterfaceService,
    private departmentService:DepartmentInterfaceService,
    private subCompanyService: SubCompanyInterfaceService,
    private consultantAccountService: ConsultantAccountInterfaceService,
    private designationService:DesignationInterfaceService
  ) { }

  getSubCompanyListByOrgId(param: any, guid: string) {
    return this.subCompanyService.getSubCompanyListByOrgId(param,guid);
  }
  getDepartmentListByOrgId(param: any, guid: string) { 
    return this.departmentService.getDepartmentListByOrgId(param,guid);
  }
  getDesignationListByOrgId(param: any, guid: string) {
    return this.designationService.getDesignationList(param,guid);
  }
  getConsultantAccountListByOrgId(param: any, guid: string) {
    return this.consultantAccountService.getConsultantAccountListByOrgId(param,guid);
  }
}
