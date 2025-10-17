import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StaffType } from '@app/shared/models/constant.config';
import { BOQInvoice } from '@app/shared/models/Invoice';
import { CommonService } from '@app/shared/services/common.service';
import { SessionService } from '@app/shared/services/session.service';
import { InvoiceService } from '../invoice.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-boq-invoice',
  standalone: false,
  templateUrl: './boq-invoice.component.html',
  styleUrl: './boq-invoice.component.scss'
})
export class BoqInvoiceComponent {
  isLoading=false;
  projectObject:any;
  today = new Date();
  displayedColumns: string[] = ['serial','value','amount', ];
  footerColumns: string[] = ['serial', 'amount']; 
  footerColumns1: string[] = ['serial', 'amount']; 
  footerColumns2: string[] = ['serial', 'amount']; 
  dataSource!: MatTableDataSource<any[]>; 
  readonly dialog = inject(MatDialog);
  private defaultdialogoptions:  MatDialogConfig = {     
      minWidth: '900px',
      disableClose: false,
      data: {},
    };
    tax:number=18;
  
 
  boqList:any[]=[
    {srno:1,key:BOQInvoice.LOCALSTAFF_KEY, value:BOQInvoice.LOCALSTAFF, amount:0},
    {srno:2,key:BOQInvoice.SUPPORTSTAF_KEY, value:BOQInvoice.SUPPORTSTAF, amount:0},
    {srno:3,key:BOQInvoice.TRANSPORTATION_KEY, value:BOQInvoice.TRANSPORTATION, amount:0},
    {srno:4,key:BOQInvoice.DUTY_TRAVEL_SITE_KEY, value:BOQInvoice.DUTY_TRAVEL_SITE, amount:0},    
    {srno:5,key:BOQInvoice.OFFICE_RENT_KEY, value:BOQInvoice.OFFICE_RENT, amount:0},
    {srno:6,key:BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM_KEY, value:BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM, amount:0},
    {srno:7,key:BOQInvoice.OFFICE_FURN_EPUIP_KEY, value:BOQInvoice.OFFICE_FURN_EPUIP, amount:0},
    {srno:8,key:BOQInvoice.REPORT_DOCUMENT_REPORTING_KEY, value:BOQInvoice.REPORT_DOCUMENT_REPORTING, amount:0},
    {srno:9,key:BOQInvoice.ROAD_SURVEY_EQUIP_KEY, value:BOQInvoice.ROAD_SURVEY_EQUIP, amount:0},
    {srno:10,key:BOQInvoice.CONTINGENCIES_KEY, value:BOQInvoice.CONTINGENCIES, amount:0}
  ];

   ngOnInit()  {    
    const projectEntity= {
      projectId:this.projectObject.id,
      isConsultant: true,
      consultantId:'',
      contractorId:null
    } 
    this.sessionService.setProjectEntity(projectEntity);
    this.dataSource = new MatTableDataSource(this.boqList);
    
    }

    constructor(private route: ActivatedRoute,private router: Router,private sessionService:SessionService,
      private cdr: ChangeDetectorRef, private commonService:CommonService
    ){
      this.projectObject= window.history.state;
    }

    ngAfterContentChecked() {
      this.cdr.detectChanges();
   }
    tp_amount(data:any){
      this.boqList.find((x:any)=>x.key==BOQInvoice.TRANSPORTATION_KEY).amount= data;
    }
    or_amount(data:any){
      this.boqList.find((x:any)=>x.key==BOQInvoice.OFFICE_RENT_KEY).amount= data;
    }
    of_amount(data:any){
      this.boqList.find((x:any)=>x.key==BOQInvoice.OFFICE_FURN_EPUIP_KEY).amount= data;
    }
    rs_amount(data:any){
      this.boqList.find((x:any)=>x.key==BOQInvoice.ROAD_SURVEY_EQUIP_KEY).amount= data;
    }
    rd_amount(data:any){
      this.boqList.find((x:any)=>x.key==BOQInvoice.REPORT_DOCUMENT_REPORTING_KEY).amount= data;
    }
    os_amount(data:any){
      this.boqList.find((x:any)=>x.key==BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM_KEY).amount= data;
    }
    dt_amount(data:any){
      this.boqList.find((x:any)=>x.key==BOQInvoice.DUTY_TRAVEL_SITE_KEY).amount= data;
    }
    cont_amount(data:any){
      this.boqList.find((x:any)=>x.key==BOQInvoice.CONTINGENCIES_KEY).amount= data;
    }
    staff_amount(data:any){
      if(data){
        if(data.key != StaffType.SUPPORT_STAFF)
          this.boqList.find((x:any)=>x.key==BOQInvoice.LOCALSTAFF_KEY).amount= data.totalAmount;
        else
          this.boqList.find((x:any)=>x.key==BOQInvoice.SUPPORTSTAF_KEY).amount= data.totalAmount;
      }    
    }

  getSubTotalAmount(){
    let total= this.boqList.map(t => t.amount).reduce((acc, value) => acc + value, 0);    
    return total;
  }
  getgstAmount(){
    let total= this.commonService.roundValue((this.boqList.map(t => t.amount).reduce((acc, value) => acc + value, 0))*this.tax/100);    
    return total;
  }
  getTotalAmount(){
    return this.getSubTotalAmount()+ this.getgstAmount();
  }
}
