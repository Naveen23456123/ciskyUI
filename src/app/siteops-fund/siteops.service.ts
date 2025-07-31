import { Injectable } from '@angular/core';
import { ExpenseInterfaceService } from '@app/shared/services/external/expense-interface.service';
import { ImperestInterfaceService } from '@app/shared/services/external/imperest-interface.service';

@Injectable({
  providedIn: 'root'
})
export class SiteopsService {

  constructor(private imperestService: ImperestInterfaceService, private expenseService:ExpenseInterfaceService) { }

  searchImperestListByOrgId(request: any, guid: string) {
    return this.imperestService.searchImperestListByOrgId(request,guid);
  }
  searchExpenseListByOrgId(param: any, guid: string) {
    return this.expenseService.searchExpenseListByOrgId(param,guid);
  }
}
