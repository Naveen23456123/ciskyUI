import { Component,ViewChild,inject} from '@angular/core';
import { ManageDprBoqListComponent } from '@app/shared/components/payment/boq/transport/dpr/manage-dpr-boq-list/manage-dpr-boq-list.component';
import { ManageSupervisionBoqListComponent } from '@app/shared/components/payment/boq/transport/supervision/manage-supervision-boq-list/manage-supervision-boq-list.component';
import { SECTOR_ABBR } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { SessionService } from '@app/shared/services/session.service';

@Component({
  selector: 'app-boq-list',
  standalone: false,
  templateUrl: './boq-list.component.html',
  styleUrl: './boq-list.component.scss'
})
export class BoqListComponent {
 allowedSectors:any[]=[];
  sectors = [
    {
      name: SECTOR_ABBR.TRASNPORT,
      subcategories: [
        { name: SECTOR_ABBR.CONSTRUCTION_SUPERVISION, component: ManageSupervisionBoqListComponent },
        { name: SECTOR_ABBR.DETAILED_PROJECT_REPORT, component: ManageDprBoqListComponent }
      ]
    }
  ];

 constructor(private commonService:CommonService, private sessionService:SessionService
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