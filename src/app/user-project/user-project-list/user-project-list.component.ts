import { Component } from '@angular/core';
import { ManageDprInvoiceListComponent } from '@app/shared/components/payment/invoices/transport/dpr/manage-dpr-invoice-list/manage-dpr-invoice-list.component';
import { ManageSupervisionInvoiceListComponent } from '@app/shared/components/payment/invoices/transport/supervision/manage-supervision-invoice-list/manage-supervision-invoice-list.component';
import { ManageDprListComponent } from '@app/shared/components/projects/transport-infra/dpr/manage-dpr-list/manage-dpr-list.component';
import { ManageSupervisionListComponent } from '@app/shared/components/projects/transport-infra/supervision/manage-supervision-list/manage-supervision-list.component';
import { SECTOR_ABBR } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { SessionService } from '@app/shared/services/session.service';

@Component({
  selector: 'app-user-project-list',
  standalone: false,
  templateUrl: './user-project-list.component.html',
  styleUrl: './user-project-list.component.scss'
})
export class UserProjectListComponent {
selectedSubcategory: { vertical: string, sub: string } | null = null;
allowedSectors:any[]=[];
constructor(private sessionService:SessionService, private commonService:CommonService){}

// invoiceVerticals = [
//   {
//     label: 'Smart Cities/Urban',
    
//   },
//   {
//     label: 'Env & Social',
    
//   },
//   {
//     label: 'Survey & Testing',
    
//   },
//   {
//     label: 'Finance & Advisory',
   
//   },
//   {
//     label: 'Transport Infra',
//     subcategories: [
//       { label: 'Construction Provision' },
//       { label: 'O&M Operation' },
//       { label: 'Detailed Project Report' },
//       { label: 'Feasibility Report' },
//       { label: 'Safety COnsultant' }
//     ]
//   },{
//     label: 'Railway & Metros',
//     subcategories: [
//        { label: 'Construction Provision' },
//       { label: 'O&M Operation' },
//       { label: 'Detailed Project Report' },
//       { label: 'Feasibility Report' },
//       { label: 'Safety COnsultant' }
//     ]
//   },
//   {
//     label: 'Water Resources',
//     subcategories: [
//        { label: 'Construction Provision' },
//       { label: 'O&M Operation' },
//       { label: 'Detailed Project Report' },
//       { label: 'Feasibility Report' },
//       { label: 'Safety COnsultant' }
//     ]
//   },
//   {
//     label: 'Tourism',
//     subcategories: [
//       { label: 'Local' },
//       { label: 'International' }
//     ]
//   }
// ];
  sectors = [
    {
      name: SECTOR_ABBR.TRASNPORT,
      subcategories: [
        { name: SECTOR_ABBR.CONSTRUCTION_SUPERVISION, component: ManageSupervisionInvoiceListComponent },
        { name: SECTOR_ABBR.DETAILED_PROJECT_REPORT, component: ManageDprInvoiceListComponent }
      ]
    }
  ];
  ngOnInit(){
    this.sessionService.orgSubject$.subscribe((response:any)=>{
      if(response){
        this.allowedSectors = this.commonService.mapSectors(response,this.sectors);
      }
    })
  }
  selectSubcategory(vertical: string, sub: string) {
    this.selectedSubcategory = { vertical, sub };
  }

  isSelected(vertical: string, sub: string): boolean {
    return this.selectedSubcategory?.vertical === vertical && this.selectedSubcategory?.sub === sub;
  }
}
