import { Injectable } from '@angular/core';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private projectService:ProjectInterfaceService) { }

  getAllProjectDetailsByOrdIg(param: any, guid: string) {
    return this.projectService.getAllProjectDetailsByOrdIg(param,guid);
  }
  getAllProjectPartialDetailsByOrdIg(param: any, guid: string) {
    return this.projectService.getAllProjectPartialDetailsByOrdIg(param,guid);
  }
}
