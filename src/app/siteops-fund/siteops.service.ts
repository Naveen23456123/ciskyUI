import { Injectable } from '@angular/core';
import { ExpenseInterfaceService } from '@app/shared/services/external/expense-interface.service';
import { ImperestInterfaceService } from '@app/shared/services/external/imperest-interface.service';

@Injectable({
  providedIn: 'root'
})
export class SiteopsService {

  constructor(private imperestService: ImperestInterfaceService, private expenseService:ExpenseInterfaceService) { }

  getImperestListByOrgId(param: any, guid: string) {
    return this.imperestService.getImperestListByOrgId(param,guid);
  }
  getExpenseListByOrgId(param: any, guid: string) {
    return this.expenseService.getExpenseListByOrgId(param,guid);
  }
}
