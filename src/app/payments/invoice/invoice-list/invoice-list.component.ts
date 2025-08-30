import { ChangeDetectorRef, Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InventoryControlService } from '@app/inventory-control/inventory-control.service';
import { PaymentService } from '@app/payments/payment.service';
import { ManageDprInvoiceListComponent } from '@app/shared/components/payment/invoices/transport/dpr/manage-dpr-invoice-list/manage-dpr-invoice-list.component';
import { ManageSupervisionInvoiceListComponent } from '@app/shared/components/payment/invoices/transport/supervision/manage-supervision-invoice-list/manage-supervision-invoice-list.component';
import { SECTOR_ABBR } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-invoice-list',
  standalone: false,
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent {

  allowedSectors:any[]=[];
  sectors = [
    {
      name: SECTOR_ABBR.TRASNPORT,
      subcategories: [
        { name: SECTOR_ABBR.CONSTRUCTION_SUPERVISION, component: ManageSupervisionInvoiceListComponent },
        { name: SECTOR_ABBR.DETAILED_PROJECT_REPORT, component: ManageDprInvoiceListComponent }
      ]
    }
  ];

 constructor(private commonService:CommonService, private sessionService:SessionService,
  private cdr:ChangeDetectorRef
 ){
 
 }

 ngOnInit()  {
  
  this.sessionService.orgSubject$.subscribe((response:any)=>{
    if(response){
      this.allowedSectors = this.commonService.mapSectors(response,this.sectors);
    }
  })
  }
}

