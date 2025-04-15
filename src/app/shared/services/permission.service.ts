import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private sessiionService:SessionService) { }
}
