import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceService } from '@app/invoice-control/invoice.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-con-transportation-list',
  standalone: false,
  templateUrl: './con-transportation-list.component.html',
  styleUrl: './con-transportation-list.component.scss'
})
export class ConTransportationListComponent {
  tpData:any[]=[];
  professionaList:any[]=[];
  isLoading = true;
  tpdataColumn: string[] =['serial','desc','contract_rate','const','main','totalconstmain','cont_amt','prev_month','prev_amt','curr_month','curr_amt','comlt_month','comlt_amt','rem_month','rem_amt','action'];
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

  constructor(private invoiceService:InvoiceService,
  private stateDataService :StateDataService, private notifyBarService :NotifyBarService,
  private sessionService:SessionService
  ){
  this.dataSource = new MatTableDataSource(this.tpData);
  }

  ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data) => {   
    if (data.event == 'conttpedit'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if (data.event == 'conttpadd' && data.valid && data.value) {
      this.addBulkData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'conttpdelete' && data.valid && data.value){
      this.deleteRow(data.value.id);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
    this.getTotalAmount();     
  });
  this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
    if(projectEntity && projectEntity.invoiceId){
      this.invoiceService.getConsultantTransportationListByProjectId({id:projectEntity.invoiceId,projectid:projectEntity.projectId }, '')
            .pipe(finalize(() => this.isLoading = false))
            .subscribe((response: any) => {
              if (response && response.success) {
              let transData = response.data.map((data:any)=>({
                id: data.id,
                description :data.description,
                rate:data.rate,
                constructionperiod:data.constructionperiod,
                dlpoandmperiod:data.dlpoandmperiod,
                invoiceid:data.invoiceid,
                uptolastbill:data.uptolastbill,
                currentbillmonths:data.currentbillmonths,
                totalmonths:this.getattributes(data).totalmonths,
                contractamount:this.getattributes(data).contractamount,
                previousbill:this.getattributes(data).previousbill,
                currentbill:this.getattributes(data).currentbill,
                commulativemonth:this.getattributes(data).commulativemonth,
                commulativeAmount:this.getattributes(data).commulativeAmount,
                remainingmonth:this.getattributes(data).remainingmonth,
                remainingamount:this.getattributes(data).remainingamount
              }));
              this.tpData=transData;
              this.dataSource = new MatTableDataSource(this.tpData);
              this.getTotalAmount();              
            }
        });
      }
    });
  }
  
  getattributes(data:any){
    return {
      totalmonths:data.constructionperiod+data.dlpoandmperiod,
      contractamount:(data.constructionperiod+data.dlpoandmperiod)*data.rate,
      previousbill:data.uptolastbill*data.rate,
      currentbill:data.currentbillmonths*data.rate,
      commulativemonth:data.uptolastbill+data.currentbillmonths,
      commulativeAmount:(data.uptolastbill+data.currentbillmonths)*data.rate,
      remainingmonth:(data.constructionperiod+data.dlpoandmperiod)-(data.uptolastbill+data.currentbillmonths),
      remainingamount:((data.constructionperiod+data.dlpoandmperiod)*data.rate)-((data.uptolastbill+data.currentbillmonths)*data.rate)
    }
  }

  bindBilling(element:any){
    element.totalmonths=element.constructionperiod+element.dlpoandmperiod,
    element.contractamount=(element.constructionperiod+element.dlpoandmperiod)*element.rate,
    element.previousbill=element.uptolastbill*element.rate,
    element.currentbill=element.currentbillmonths*element.rate,
    element.commulativemonth=element.uptolastbill+element.currentbillmonths,
    element.commulativeAmount=(element.uptolastbill+element.currentbillmonths)*element.rate,
    element.remainingmonth=(element.constructionperiod+element.dlpoandmperiod)-(element.uptolastbill+element.currentbillmonths),
    element.remainingamount=((element.constructionperiod+element.dlpoandmperiod)*element.rate)-((element.uptolastbill+element.currentbillmonths)*element.rate) 
  }

  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.invoiceid == data.id);
    
    if(element){
    element.currentbillmonths=data.currentmonth 
    }
    this.bindBilling(element);
    this.dataSource._updateChangeSubscription();
  }
  addBulkData(data:any){
    data.forEach((element:any) => {
      this.addRowData(element);
    });
  }
  addRowData(data: any) {
    const data1:any = {
    id: data.boqid,
    description :data.description,
    rate:data.rate,
    invoiceid:data.invoiceid,
    constructionperiod:data.constructionperiod,
    dlpoandmperiod:data.dlpoandmperiod,
    uptolastbill:data.uptolastbill,
    currentbillmonths:data.currentbillmonths        
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

  getTotalAmount() : any|null {
    if(this.dataSource && this.dataSource.data){
    this.amount  ={
        total:this.dataSource.data.map((t:any) => t.contractamount).reduce((acc, value) => acc + value, 0),
        previous:this.dataSource.data.map((t:any) => t.previousbill).reduce((acc, value) => acc + value, 0),
        current:this.dataSource.data.map((t:any) => t.currentbill).reduce((acc, value) => acc + value, 0),
        commulative:this.dataSource.data.map((t:any) => t.commulativeAmount).reduce((acc, value) => acc + value, 0),
        remaining:this.dataSource.data.map((t:any) => t.remainingamount).reduce((acc, value) => acc + value, 0)
      }
    }
    this.onAmountChange.emit(this.amount);
    return this.amount;
  }
}
