import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BOQInvoice } from '@app/shared/models/Invoice';
import { SessionService } from '@app/shared/services/session.service';

@Component({
  selector: 'app-consultancy-invoice',
  standalone: false,
  templateUrl: './consultancy-invoice.component.html',
  styleUrl: './consultancy-invoice.component.scss'
})
export class ConsultancyInvoiceComponent {
  isLoading=false;
    displayedColumns: string[] = ['serial','value','contract_amount','comm_of_previous_month','this_period','commulated','remaining' ];
    //  ordataColumn: string[] =['serial','desc','months','rate','totalamt','prev_month','prev_amt','curr_month','curr_amt','comlt_month','comlt_amt','rem_month','rem_amt','action'];
    // osdataColumn: string[] =['serial','desc','contract_month','rate','totalamt','prev_month','prev_amt','curr_month','curr_amt','comlt_month','comlt_amt','rem_month','rem_amt','action'];
    // ofdataColumn: string[] =['serial','desc','contract_month','rate','totalamt','prev_month','prev_amt','curr_month','curr_amt','comlt_month','comlt_amt','rem_month','rem_amt','action'];
    // rddataColumn: string[] =['serial','desc','no_ofreport','copies_per_report','total_copy','rate_per_copy','total_amt','prev_month','prev_amt','curr_month','curr_amt','comlt_month','comlt_amt','rem_month','rem_amt','action'];
    // rsdataColumn: string[] =['serial','desc','km','rateperkm','survery_conducted','total_amt','prev_survery_conducted','prev_amt','curr_month','curr_amt','comlt_survery_conducted','comlt_amt','rem_survery_conducted','rem_amt','action'];
     contdataColumn: string[] = ['serial','month','actualmonth','curr_amount','action' ];

    dataSource!: MatTableDataSource<any[]>;
    // tpDataSource!: MatTableDataSource<any[]>;
    // dtDataSource!: MatTableDataSource<any[]>;
    // orDataSource!: MatTableDataSource<any[]>;
    // osDataSource!: MatTableDataSource<any[]>;
    // ofDataSource!: MatTableDataSource<any[]>;
    // rdDataSource!: MatTableDataSource<any[]>;
    // rsDataSource!: MatTableDataSource<any[]>;
     contDataSource!: MatTableDataSource<any[]>;

    readonly dialog = inject(MatDialog);
      private defaultdialogoptions:  MatDialogConfig = {     
          minWidth: '900px',
          disableClose: false,
          data: {},
        };

   consultancyList:any[]=[
      {srno:1,key:12, value:BOQInvoice.LOCALSTAFF, contract_amount:0 ,comm_of_previous_month:0 ,this_period:0},
      {srno:3,key:12, value:BOQInvoice.TRANSPORTATION, contract_amount:0 ,comm_of_previous_month:0 ,this_period:0},
      {srno:4,key:12, value:BOQInvoice.DUTY_TRAVEL_SITE, contract_amount:0 ,comm_of_previous_month:0 ,this_period:0},    
      {srno:5,key:12, value:BOQInvoice.OFFICE_RENT, contract_amount:0 ,comm_of_previous_month:0 ,this_period:0},
      {srno:6,key:12, value:BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM, contract_amount:0 ,comm_of_previous_month:0 ,this_period:0},
      {srno:7,key:12, value:BOQInvoice.OFFICE_FURN_EPUIP, contract_amount:0 ,comm_of_previous_month:0 ,this_period:0},
      {srno:8,key:12, value:BOQInvoice.REPORT_DOCUMENT_REPORTING, contract_amount:0 ,comm_of_previous_month:0 ,this_period:0},
      {srno:9,key:12, value:BOQInvoice.ROAD_SURVEY_EQUIP, contract_amount:0 ,comm_of_previous_month:0 ,this_period:0},
      {srno:10,key:12, value:BOQInvoice.CONTINGENCIES, contract_amount:0 ,comm_of_previous_month:0 ,this_period:0}
    ];
    tpList:any[]=[];

    ngOnInit()  {
        this.isLoading=false;
        this.dataSource = new MatTableDataSource(this.consultancyList);        
      }
    
    constructor(private route: ActivatedRoute,private router: Router,
      private sessionService:SessionService
    ){    
    }  

}
