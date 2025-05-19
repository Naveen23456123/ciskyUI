import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StaffType } from '@app/shared/models/constant.config';
import { BOQInvoice } from '@app/shared/models/Invoice';
import { InvoiceService } from '../invoice.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-consultancy-invoice',
  standalone: false,
  templateUrl: './consultancy-invoice.component.html',
  styleUrl: './consultancy-invoice.component.scss'
})
export class ConsultancyInvoiceComponent {
  isLoading=false;
  displayedColumns: string[] = ['serial','value','contract_amount','previous_amount','current_amount','commulated','remaining' ];
  contdataColumn: string[] = ['serial','month','actualmonth','curr_amount','action' ];

  dataSource!: MatTableDataSource<any[]>;
    contDataSource!: MatTableDataSource<any[]>;
  readonly dialog = inject(MatDialog);
  private defaultdialogoptions:  MatDialogConfig = {     
    minWidth: '900px',
    disableClose: false,
    data: {},
  };
  bidDueDate!:any;
  billing:number=5;
  fixbilling= this.billing;
  gst=18;
  subTotalKey='Sub Total';
  billingKey=`Billing rates shall increase by @ ${this.fixbilling}% every 12 months to cover all item of
  contract as per Special conditions of Contract clause`;
  totalKey='Total';
  gstKey='GST @'+this.gst+' %';
  grandTotalKey="Grand Total";
  columnsList:any[]=[this.subTotalKey,this.billingKey,this.totalKey,this.gstKey,this.grandTotalKey];

  consultancyList:any[]=[
    {srno:1, value:BOQInvoice.LOCALSTAFF, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:2, value:BOQInvoice.SUPPORTSTAF, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:3, value:BOQInvoice.TRANSPORTATION, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:4, value:BOQInvoice.DUTY_TRAVEL_SITE, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},    
    {srno:5, value:BOQInvoice.OFFICE_RENT, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:6, value:BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:7, value:BOQInvoice.OFFICE_FURN_EPUIP, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:8, value:BOQInvoice.REPORT_DOCUMENT_REPORTING, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:9, value:BOQInvoice.ROAD_SURVEY_EQUIP, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:10, value:BOQInvoice.CONTINGENCIES, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
  ];
  tpList:any[]=[];

  ngOnInit()  {
    
    this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
      if(projectEntity && projectEntity.projectId){
        this.invoiceService.getProjectScopeDurationById({id:projectEntity.projectId},'')
        .pipe(finalize(() => this.isLoading = false)).subscribe((response:any)=>{
           if(response && response.success){
            this.billing= this.billing*response.data.years;
            //this.billingKey.replace('{0}',this.bidDueDate);
           // this.bidDueDate= response.data.bidduedate;
            
           }
        })
      }
    });
    this.dataSource = new MatTableDataSource(this.consultancyList);
    this.cdr.detectChanges();        
  }
  
  constructor( private cdr:ChangeDetectorRef, private invoiceService:InvoiceService, private sessionService:SessionService){    
  }  
  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }
  stf_amt(event:any){
    if(event) {
      this.bindLocalStaffAmount(event);
      this.bindAmount(BOQInvoice.SUPPORTSTAF,event.ss); 
    }  
    
  }
  dt_amt(event:any){
    this.bindAmount(BOQInvoice.DUTY_TRAVEL_SITE,event);     
  }
  os_amt(event:any){
    this.bindAmount(BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM,event);  
  }
  or_amt(event:any){
    this.bindAmount(BOQInvoice.OFFICE_RENT,event);   
  }
  of_amt(event:any){
    this.bindAmount(BOQInvoice.OFFICE_FURN_EPUIP,event);  
  }
  rd_amt(event:any){
    this.bindAmount(BOQInvoice.REPORT_DOCUMENT_REPORTING,event);  
  }
  rs_amt(event:any){
    this.bindAmount(BOQInvoice.ROAD_SURVEY_EQUIP,event);  
  }
  tp_amt(event:any){
    this.bindAmount(BOQInvoice.TRANSPORTATION,event); 
  }
  bindAmount(valueKey:any,event:any){
    const element:any = this.dataSource.data.find((x:any) => x.value==valueKey);    
    if(element && event){
      element.contract_amount=event.total;
      element.previous_amount=event.previous;
      element.current_amount=event.current;
      element.commulative_amt=event.commulative;
      element.remaining_amt=event.remaining;
    }
    this.dataSource._updateChangeSubscription();    
    this.addBillingDetails();
  }
  bindLocalStaffAmount(event:any){
    const element:any = this.dataSource.data.find((x:any) => x.value==BOQInvoice.LOCALSTAFF);    
    if(element && event){
      element.contract_amount=event.kp.total+event.sps.total;
      element.previous_amount=event.kp.previous+event.sps.previous;
      element.current_amount=event.kp.current+event.sps.current;
      element.commulative_amt=event.kp.commulative+event.sps.commulative;
      element.remaining_amt=event.kp.remaining+event.sps.remaining;
    }
    this.dataSource._updateChangeSubscription();    
    this.addBillingDetails();
  }
  getAmountTotal(){
    let filteredData= this.dataSource.data.filter((row: any) => !this.columnsList.includes(row.value))
    return {
      contract_amount:filteredData.map((t:any) => t.contract_amount).reduce((acc, value) => acc + value, 0),
      previous_amount:filteredData.map((t:any) => t.previous_amount).reduce((acc, value) => acc + value, 0),
      current_amount:filteredData.map((t:any) => t.current_amount).reduce((acc, value) => acc + value, 0),
      commulative_amt:filteredData.map((t:any) => t.commulative_amt).reduce((acc, value) => acc + value, 0),
      remaining_amt:filteredData.map((t:any) => t.remaining_amt).reduce((acc, value) => acc + value, 0),
    };
  }
  addBillingDetails(){
    let subTotal:any = this.dataSource.data.find((x:any)=>x.value==this.subTotalKey);   
    if(subTotal){
      const index = this.dataSource.data.findIndex((x:any) => x.value == this.subTotalKey);
      this.dataSource.data.splice(index, 1);
    } 
    subTotal= {
      srno:'', 
      value:this.subTotalKey,
      contract_amount:this.getAmountTotal().contract_amount ,
      previous_amount:this.getAmountTotal().previous_amount ,
      current_amount:this.getAmountTotal().current_amount,
      commulative_amt:this.getAmountTotal().commulative_amt,
      remaining_amt:this.getAmountTotal().remaining_amt,
      footer:true
    };    
    let billing:any = this.dataSource.data.find((x:any)=>x.value==this.billingKey);   
    if(billing){
      const index = this.dataSource.data.findIndex((x:any) => x.value == this.billingKey);
      this.dataSource.data.splice(index, 1);
    } 
    billing= {
      srno:'', 
      value:this.billingKey,
      contract_amount: 0,
      previous_amount:this.applyBilling(subTotal.previous_amount) ,
      current_amount:this.applyBilling(subTotal.current_amount),
      commulative_amt:this.applyBilling(subTotal.commulative_amt),
      remaining_amt:this.applyBilling(subTotal.remaining_amt),
      footer:true
    };
    
    let total:any = this.dataSource.data.find((x:any)=>x.value==this.totalKey);   
    if(total){
      const index = this.dataSource.data.findIndex((x:any) => x.value == this.totalKey);
      this.dataSource.data.splice(index, 1);
    } 
    total= {
      srno:'', 
      value:this.totalKey,
      contract_amount: 0,
      previous_amount:subTotal.previous_amount+billing.previous_amount ,
      current_amount:subTotal.current_amount+billing.current_amount,
      commulative_amt:subTotal.commulative_amt+billing.commulative_amt,
      remaining_amt:subTotal.remaining_amt+billing.remaining_amt,
      footer:true
    };
    
    let gst:any = this.dataSource.data.find((x:any)=>x.value==this.gstKey);   
    if(gst){
      const index = this.dataSource.data.findIndex((x:any) => x.value == this.gstKey);
      this.dataSource.data.splice(index, 1);
    } 
    gst= {
      srno:'', 
      value:this.gstKey,
      contract_amount:this.applyGst(this.getAmountTotal().contract_amount),
      previous_amount:this.applyGst(total.previous_amount),
      current_amount:this.applyGst(total.current_amount),
      commulative_amt:this.applyGst(total.commulative_amt),
      remaining_amt:this.applyGst(total.remaining_amt),
      footer:true
    };
    
    let grandTotal:any = this.dataSource.data.find((x:any)=>x.value==this.grandTotalKey);   
    if(grandTotal){
      const index = this.dataSource.data.findIndex((x:any) => x.value == this.grandTotalKey);
      this.dataSource.data.splice(index, 1);
    }
    grandTotal= {
      srno:'', 
      value:this.grandTotalKey,
      contract_amount:this.getAmountTotal().contract_amount +gst.contract_amount,
      previous_amount:total.previous_amount +gst.previous_amount,
      current_amount:total.current_amount+gst.current_amount,
      commulative_amt:total.commulative_amt+gst.commulative_amt,
      remaining_amt:total.remaining_amt+gst.remaining_amt,
      footer:true
    };
    this.dataSource.data = [...this.dataSource.data, subTotal];
    this.dataSource.data = [...this.dataSource.data, billing];
    this.dataSource.data = [...this.dataSource.data, total];
    this.dataSource.data = [...this.dataSource.data, gst];
    this.dataSource.data = [...this.dataSource.data, grandTotal];
    this.dataSource._updateChangeSubscription();
  
  }
  applyBilling(amount:number){
    return amount*this.billing/100;
  }
  applyGst(amount:number){
    return amount*this.gst/100;
  }
}

