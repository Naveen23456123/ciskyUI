import { Component,Type,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryControlService } from '@app/inventory-control/inventory-control.service';
import { HelperService } from '@app/shared/services/helper.service';
import { SiteControlService } from '@app/site-control/site-control.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-inventory-list',
  standalone: false,
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent {
  
  inventoryListcomponentData!: Type<any>;
   constructor(private inventoryService:InventoryControlService){
   }
  
   ngOnInit()  { 
        this.inventoryListcomponentData = this.inventoryService.getInventoryListComponent().component;
    }
}