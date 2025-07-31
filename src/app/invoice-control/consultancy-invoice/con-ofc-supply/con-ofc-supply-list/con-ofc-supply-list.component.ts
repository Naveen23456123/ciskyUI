import { Component,EventEmitter,Output,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';;
import { InvoiceService } from '@app/invoice-control/invoice.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-con-ofc-supply-list',
  standalone: false,
  templateUrl: './con-ofc-supply-list.component.html',
  styleUrl: './con-ofc-supply-list.component.scss'
})
export class ConOfcSupplyListComponent {

  data:any[]=[];
  isLoading = true;

  dataColumn: string[] =['serial','desc','contract_month','rate','totalamt','prev_month','prev_amt','curr_month','curr_amt','comlt_month','comlt_amt','rem_month','rem_amt','action'];
  footerColumns: string[] = ['serial', 'amount','action'];
  dataSource!: MatTableDataSource<any[]>;
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
    this.dataSource = new MatTableDataSource(this.data);
   }
  
   ngOnInit()  {
    this.stateDataService.stateDataSubject.subscribe((data) => {   
      if (data.event == 'conosedit'  && data.valid && data.value) {      
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'conosadd' && data.valid && data.value) {
        this.addBulkData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if(data.event == 'conosdelete' && data.valid && data.value){
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
      this.getTotalAmount();
    });

    this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((invEntity:any)=>{
      if(invEntity && invEntity.invoiceId){
        this.invoiceService.getConsultantOfficeSupplyListByProjectId({ id:invEntity.invoiceId,projectid:invEntity.projectId }, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((response: any) => {
          if (response && response.success) {
            let supplyData = response.data.map((data:any)=>({
              id: data.id,
              description :data.description,
              rate:data.rate,
              months:data.months,
              previousbillmonths: data.previousbillmonths,
              currentbillmonths: data.currentbillmonths,
              invoiceid:data.invoiceid,
              contractamount:this.getattributes(data).contractamount,
              previousbill:this.getattributes(data).previousbill,
              currentbill:this.getattributes(data).currentbill,
              commulativemonth:this.getattributes(data).commulativemonth,
              commulativeamount:this.getattributes(data).commulativeamount,
              remainingmonth:this.getattributes(data).remainingmonth,
              remainingamount:this.getattributes(data).remainingamount
            }));            
           this.data = supplyData;
           this.dataSource = new MatTableDataSource(this.data);
           this.getTotalAmount();              
         }
        });
      }
    });
  } 

  getattributes(data:any){
    return {
      contractamount:data.months*data.rate,
      previousbill:data.previousbillmonths*data.rate,
      currentbill:data.currentbillmonths*data.rate,
      commulativemonth:data.previousbillmonths+data.currentbillmonths,
      commulativeamount:(data.previousbillmonths+data.currentbillmonths)*data.rate,
      remainingmonth:(data.months)-(data.previousbillmonths+data.currentbillmonths),
      remainingamount:((data.months)*data.rate)-((data.previousbillmonths+data.currentbillmonths)*data.rate)
    }
  }

    updateRowData(data: any) {
      const element:any = this.dataSource.data.find((x:any) => x.invoiceid == data.id);
      if(element){
      element.currentbillmonths= data.currentbillmonths;  
      }
      this.bindBilling(element);
      this.dataSource._updateChangeSubscription();
    }
    addRowData(data: any) {
      const data1:any = {
        id: data.id,
        description :data.description,
        rate:data.rate,
        months:data.months,
        currentbillmonths: data.currentbillmonths,
        previousbillmonths: data.previousbillmonths,
        invoiceid:data.invoiceid, 
      }      
      this.bindBilling(data1);
      this.dataSource.data.unshift(data1);  
      this.dataSource._updateChangeSubscription();
    }
    deleteRow(data: any) {
      const index = this.dataSource.data.findIndex((x:any) => x.invoiceid == data);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }

    bindBilling(data:any){
      data.contractamount=data.months*data.rate,
      data.previousbill=data.previousbillmonths*data.rate,
      data.currentbill=data.currentbillmonths*data.rate,
      data.commulativemonth=data.previousbillmonths+data.currentbillmonths,
      data.commulativeamount=(data.previousbillmonths+data.currentbillmonths)*data.rate,
      data.remainingmonth=(data.months)-(data.previousbillmonths+data.currentbillmonths),
      data.remainingamount=((data.months)*data.rate)-((data.previousbillmonths+data.currentbillmonths)*data.rate)
    }
    addBulkData(data:any){
      data.forEach((element:any) => {
        this.addRowData(element);
      });
   }
   getTotalAmount() : any|null {  
    if(this.dataSource && this.dataSource.data){
    this.amount ={
        total:this.dataSource.data.map((t:any) => t.contractamount).reduce((acc, value) => acc + value, 0),
        previous:this.dataSource.data.map((t:any) => t.previousbill).reduce((acc, value) => acc + value, 0),
        current:this.dataSource.data.map((t:any) => t.currentbill).reduce((acc, value) => acc + value, 0),
        commulative:this.dataSource.data.map((t:any) => t.commulativeamount).reduce((acc, value) => acc + value, 0),
        remaining:this.dataSource.data.map((t:any) => t.remainingamount).reduce((acc, value) => acc + value, 0)
      }
    }
    this.onAmountChange.emit(this.amount);
    return this.amount;
  }
  }
  
  




