import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceService } from '@app/invoice-control/invoice.service';
import { BOQInvoice } from '@app/shared/models/Invoice';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-release-invoice',
  standalone: false,
  templateUrl: './release-invoice.component.html',
  styleUrl: './release-invoice.component.scss'
})
export class ReleaseInvoiceComponent {
  isLoading=true;
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
  today= new Date();
  invoiceData:any;
  subTotalKey='Sub Total';
  billingKey=`Billing rates shall increase by @ ${this.fixbilling}% every 12 months to cover all item of
  contract as per Special conditions of Contract clause`;
  totalKey='Total';
  gstKey='GST @'+this.gst+' %';
  grandTotalKey="Grand Total";
  columnsList:any[]=[this.subTotalKey,this.billingKey,this.totalKey,this.gstKey,this.grandTotalKey];

  consultancyList:any[]=[
    {srno:1,key:BOQInvoice.LOCALSTAFF_KEY, value:BOQInvoice.LOCALSTAFF, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:2,key:BOQInvoice.SUPPORTSTAF_KEY, value:BOQInvoice.SUPPORTSTAF, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:3,key:BOQInvoice.TRANSPORTATION_KEY, value:BOQInvoice.TRANSPORTATION, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:4,key:BOQInvoice.DUTY_TRAVEL_SITE_KEY, value:BOQInvoice.DUTY_TRAVEL_SITE, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},    
    {srno:5,key:BOQInvoice.OFFICE_RENT_KEY, value:BOQInvoice.OFFICE_RENT, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:6,key:BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM_KEY, value:BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:7,key:BOQInvoice.OFFICE_FURN_EPUIP_KEY, value:BOQInvoice.OFFICE_FURN_EPUIP, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:8,key:BOQInvoice.REPORT_DOCUMENT_REPORTING_KEY, value:BOQInvoice.REPORT_DOCUMENT_REPORTING, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:9,key:BOQInvoice.ROAD_SURVEY_EQUIP_KEY, value:BOQInvoice.ROAD_SURVEY_EQUIP, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
    {srno:10,key:BOQInvoice.CONTINGENCIES_KEY, value:BOQInvoice.CONTINGENCIES, contract_amount:0 ,previous_amount:0 ,current_amount:0,commulative_amt:0,remaining_amt:0},
  ];
  tpList:any[]=[];

  ngOnInit()  {
    
    this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
      if(projectEntity && projectEntity.projectId){        
        this.invoiceData= projectEntity.invoiceData;
        this.invoiceService.getProjectScopeDurationById({id:projectEntity.projectId},'')
        .pipe(finalize(() => this.isLoading = false)).subscribe((response:any)=>{
           if(response && response.success){
            this.billing= this.billing*response.data.years;
           }
        }) 
        this.invoiceService.getProjectBoqAmountSummary({id:projectEntity.projectId},'')
        .pipe(finalize(() => this.isLoading = false)).subscribe((response:any)=>{
           if(response && response.success){
            console.log(response.data);
            response.data.forEach((d: any) => {
              const match = this.consultancyList.find(c => c.key === d.name);
                if (match) {
                  match.contract_amount = d.amount;
                }
              });
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
}
