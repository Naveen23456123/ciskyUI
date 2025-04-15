import { Component,EventEmitter,Output,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';;
import { InvoiceService } from '@app/invoice-control/invoice.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize,take } from 'rxjs';

@Component({
  selector: 'app-con-report-doc-list',
  standalone: false,
  templateUrl: './con-report-doc-list.component.html',
  styleUrl: './con-report-doc-list.component.scss'
})
export class ConReportDocListComponent {
  data:any[]=[];
  isLoading = true;

  dataColumn: string[] =['serial','desc','no_ofreport','copies_per_report','total_copy','rate_per_copy','total_amt','prev_month','prev_amt','curr_month','curr_amt','comlt_month','comlt_amt','rem_month','rem_amt','action'];
  footerColumns: string[] = ['serial', 'amount','action'];
  dataSource!: MatTableDataSource<any[]>;
  @Output() onAmountChange: EventEmitter<any> = new EventEmitter(); 
  readonly dialog = inject(MatDialog);
    
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
  
   ngOnInit() {
    this.stateDataService.stateDataSubject.subscribe((data) => {   
      if (data.event == 'conrdedit'  && data.valid && data.value) {      
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'conrdadd' && data.valid && data.value) {
        this.addRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if(data.event == 'conrddelete' && data.valid && data.value){
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
    });

    this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((invEntity:any)=>{
      if(invEntity && invEntity.invoiceId) {
        this.invoiceService.getConsultantReportDocListByProjectId({id:invEntity.invoiceId }, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((response: any) => {
          if (response && response.success) {
            let rdData = response.data.map((data:any)=>({
              id: data.id,
              description :data.description,
              numberofreport:data.numberofreport,
              numberofcopiesperreport:data.numberofcopiesperreport,
              ratepercopy:data.ratepercopy,
              previousbillmonths:data.previousbillmonths,
              currentbillmonths:data.currentbillmonths,
              contractamount:this.getattributes(data).contractamount,
              previousbill:this.getattributes(data).previousbill,
              currentbill:this.getattributes(data).currentbill,
              commulativemonth:this.getattributes(data).commulativemonth,
              commulativeamount:this.getattributes(data).commulativeamount,
              remainingmonth:this.getattributes(data).remainingmonth,
              remainingamount:this.getattributes(data).remainingamount
            }));      
           this.data = rdData;
           this.dataSource = new MatTableDataSource(this.data);
           this.getTotalAmount();              
         }
       });
      }
    }); 
  } 

  getattributes(data:any){
    return {
      contractamount:data.numberofreport*data.numberofcopiesperreport*data.ratepercopy,
      previousbill:data.previousbillmonths*data.ratepercopy,
      currentbill:data.currentbillmonths*data.ratepercopy,
      commulativemonth:data.previousbillmonths+data.currentbillmonths,
      commulativeamount:(data.previousbillmonths+data.currentbillmonths)*data.ratepercopy,
      remainingmonth:(data.numberofreport*data.numberofcopiesperreport)-(data.previousbillmonths+data.currentbillmonths),
      remainingamount:((data.numberofreport*data.numberofcopiesperreport)*data.ratepercopy)-((data.previousbillmonths+data.currentbillmonths)*data.ratepercopy)
    }
  }

    updateRowData(data: any) {
      const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
      if(element){
      element.id = data.id;
      element.description =data.description,
      element.numberofreport=data.numberofreport,
      element.numberofcopiesperreport=data.numberofcopiesperreport,
      element.ratepercopy=data.ratepercopy,
      element.previousbillmonths=data.previousbillmonths,
      element.currentbillmonths=data.currentbillmonths,
      element.contractamount=this.getattributes(data).contractamount,
      element.previousbill=this.getattributes(data).previousbill,
      element.currentbill=this.getattributes(data).currentbill,
      element.commulativemonth=this.getattributes(data).commulativemonth,
      element.commulativeamount=this.getattributes(data).commulativeamount,
      element.remainingmonth=this.getattributes(data).remainingmonth,
      element.remainingamount=this.getattributes(data).remainingamount      
      this.dataSource._updateChangeSubscription();
      }
    }

    addRowData(data: any) {
      const data1:any = {
        id:data.id,
        description :data.description,
        numberofreport:data.numberofreport,
        numberofcopiesperreport:data.numberofcopiesperreport,
        ratepercopy:data.ratepercopy,
        previousbillmonths:data.previousbillmonths,
        currentbillmonths:data.currentbillmonths,
        contractamount:this.getattributes(data).contractamount,
        previousbill:this.getattributes(data).previousbill,
        currentbill:this.getattributes(data).currentbill,
        commulativemonth:this.getattributes(data).commulativemonth,
        commulativeamount:this.getattributes(data).commulativeamount,
        remainingmonth:this.getattributes(data).remainingmonth,
        remainingamount:this.getattributes(data).remainingamount
      }      
      this.dataSource.data.unshift(data1);  
      this.dataSource._updateChangeSubscription();
    }
    deleteRow(data: any) {
      const index = this.dataSource.data.findIndex((x:any) => x.id == data);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }

    getTotalAmount() {
      let total= this.data.map(t => t.totalamount).reduce((acc, value) => acc + value, 0);
      this.onAmountChange.emit(total);
      return total;
    }

  }
  
  





