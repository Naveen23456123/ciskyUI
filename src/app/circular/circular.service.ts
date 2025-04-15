import { Injectable } from '@angular/core';
import { CircularInterfaceService } from '@app/shared/services/external/circular-interface.service';

@Injectable({
  providedIn: 'root'
})
export class CircularService {

  constructor(private circularService:CircularInterfaceService) { }
  
  getCircularListByProjectIdByOrgId(param: any, guid: string) {
    return this.circularService.getCircularListByProjectIdByOrgId(param,guid);
  }
}
