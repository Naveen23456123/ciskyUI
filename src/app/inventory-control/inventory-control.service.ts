import { Injectable } from '@angular/core';
import { InventoryInterfaceService } from '@app/shared/services/external/inventory-interface.service';
import { ItemInterfaceService } from '@app/shared/services/external/item-interface.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryControlService {

  constructor(private inventoryService:InventoryInterfaceService, private itemService:ItemInterfaceService) { }
  
  getItemListByOrgId(param: any, guid: string) {
    return this.itemService.getItemListByOrgId(param,guid);
  }
  getSiteInventoryListByOrgId(param: any, guid: string) {
    return this.inventoryService.getSiteInventoryListByOrgId(param,guid);
  } 
  getSiteInventoryListByProjectId(param: any, guid: string) {
    return this.inventoryService.getSiteInventoryListByProjectId(param,guid);
  }
  getInventoryListComponent() {
    return this.inventoryService.getInventoryListComponent();
  }
}
