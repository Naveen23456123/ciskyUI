import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceService } from '@app/invoice-control/invoice.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-con-contingency-list',
  standalone: false,
  templateUrl: './con-contingency-list.component.html',
  styleUrl: './con-contingency-list.component.scss'
})
export class ConContingencyListComponent {
  dataColumn: string[] = ['serial','desc','previous','current','commu','remaining','action' ];

  dataSource!: MatTableDataSource<any[]>;
  data:any[]=[];
  isLoading = true;

  // dataColumn: string[] =['serial','desc','contract_rate','trip','totalamt','prev_month','prev_amt','curr_month','curr_amt','comlt_month','comlt_amt','rem_month','rem_amt','action'];
  footerColumns: string[] = ['serial', 'amount','action'];
  //dataSource!: MatTableDataSource<any[]>;
  @Output() onAmountChange: EventEmitter<any> = new EventEmitter(); 
  readonly dialog = inject(MatDialog);
  amount:any|null;

    private defaultdialogoptions:  MatDialogConfig = {
      minWidth: '900px', 
      disableClose: false,
      data: {},
    };
  
   constructor(private invoiceService:InvoiceService,private helperService:HelperService,
    private stateDataService :StateDataService, private notifyBarService :NotifyBarService,
    private sessionService:SessionService
   ){
    
   }
  
   ngOnInit()  {
    this.stateDataService.stateDataSubject.subscribe((data) => {   
      if (data.event == 'concontedit'  && data.valid && data.value) {      
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'concontadd' && data.valid && data.value) {
        this.addBulkData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if(data.event == 'concontdelete' && data.valid && data.value){
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
      this.getTotalAmount();  
    });
    this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((invEntity:any)=>{
      if(invEntity && invEntity.invoiceId){
        this.invoiceService.getConsultantContingencyListByProjectId({id:invEntity.invoiceId,projectid:invEntity.projectId }, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((response: any) => {
          if (response && response.success) {
            let dtData = response.data.map((data:any)=>({
              id: data.id,
              description : data.description,
              amount: data.rate,
              totalamount:data.totalamount,
              invoiceid:data.invoiceid,
              previousbillamount: data.previousbillamount,
              currentbillamount: data.currentbillamount
            }));
           this.data = dtData;
           this.dataSource = new MatTableDataSource(this.data);
           this.getTotalAmount();              
         }
        });
      }
    });    
  } 


  updateRowData(data: any) {
    if(this.dataSource.data){
      const element:any = this.dataSource.data.find((x:any) => x.invoiceid == data.id);
      if(element){
      element.currentbillamount=data.currentbillamount;
      }
      this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(data: any) {
    const data1:any = {
      id: data.id,
      description : data.description,
      unit:data.unit,
      currentbillamount: data.currentbillamount,
      previousbillamount: data.previousbillamount,
      invoiceid:data.invoiceid,
      totalamount:data.totalamount,
    }
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription();   
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.invoiceid == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  addBulkData(data:any){
    
    data.forEach((element:any) => {
      this.addRowData(element);
    });
  }  
  getTotalAmount() : any|null {
    if(this.dataSource && this.dataSource.data){
    this.amount ={
        total:this.dataSource.data.map((t:any) => t.totalamount).reduce((acc, value) => acc + value, 0),
        previous:this.dataSource.data.map((t:any) => t.previousbillamount).reduce((acc, value) => acc + value, 0),
        current:this.dataSource.data.map((t:any) => t.currentbillamount).reduce((acc, value) => acc + value, 0),
        commulative:this.dataSource.data.map((t:any) => t.currentbillamount+t.previousbillamount).reduce((acc, value) => acc + value, 0),
        remaining:this.dataSource.data.map((t:any) => t.totalamount-(t.currentbillamount+t.previousbillamount)).reduce((acc, value) => acc + value, 0)
      }
    }
    this.onAmountChange.emit(this.amount);
    return this.amount;
  }
  
}  

