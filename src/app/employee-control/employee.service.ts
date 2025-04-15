import { Injectable } from '@angular/core';
import { AttendenceInterfaceService } from '@app/shared/services/external/attendence-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private employeeService:EmployeeInterfaceService,
    private attendenceService:AttendenceInterfaceService
  ) {
  
   }
   
   getEmployeeListComponent(){
    return this.employeeService.getEmployeeListComponent();
   }
   getAllEmployeesByOrdId(param: any, guid: string) {
    return this.employeeService.getAllEmployeesByOrdId(param,guid);
   }

   getBOQAttendenceListByProjectIdByOrgId(param: any, guid: string) {
    return this.attendenceService.getBOQAttendenceListByProjectIdByOrgId(param,guid);
   }
}
