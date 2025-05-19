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
  selector: 'app-con-road-survey-list',
  standalone: false,
  templateUrl: './con-road-survey-list.component.html',
  styleUrl: './con-road-survey-list.component.scss'
})
export class ConRoadSurveyListComponent {
  data:any[]=[];
  isLoading = true;

  dataColumn: string[] =['serial','desc','km','rateperkm','survery_conducted','total_amt','prev_km','prev_amt','curr_km','curr_amt','comlt_km','comlt_amt','rem_km','rem_amt','action'];
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
      if (data.event == 'conrsedit'  && data.valid && data.value) {      
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'conrsadd' && data.valid && data.value) {
        this.addBulkData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if(data.event == 'conrsdelete' && data.valid && data.value){
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
      this.getTotalAmount();
    });
    this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((invEntity:any)=>{
      if(invEntity && invEntity.invoiceId){
        this.invoiceService.getConsultantRoadSurveyListByProjectId({id:invEntity.invoiceId ,projectid:invEntity.projectId }, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((response: any) => {
          if (response && response.success) {
            let rsData = response.data.map((data:any)=>({
              id: data.id,
              description :data.description,
              km:data.km,
              rate:data.rate,
              numberofsurveys:data.numberofsurveys,
              previousbillkm:data.previousbillkm,
              currentbillkm:data.currentbillkm,
              invoiceid:data.invoiceid,
              contractamount:this.getattributes(data).contractamount,
              previousbill:this.getattributes(data).previousbill,
              currentbill:this.getattributes(data).currentbill,
              commulativekm:this.getattributes(data).commulativekm,
              commulativeamount:this.getattributes(data).commulativeamount,
              remainingkm:this.getattributes(data).remainingkm,
              remainingamount:this.getattributes(data).remainingamount
            }));
           this.data = rsData;
           this.dataSource = new MatTableDataSource(this.data);
           this.getTotalAmount();              
          }
        });
      }
    });     
  } 

  getattributes(data:any){
    return {
      contractamount:data.km*data.numberofsurveys*data.rate,
      previousbill:data.previousbillkm*data.rate,
      currentbill:data.currentbillkm*data.rate,
      commulativekm:data.previousbillkm+data.currentbillkm,
      commulativeamount:(data.previousbillkm+data.currentbillkm)*data.rate,
      remainingkm:data.km-(data.previousbillkm+data.currentbillkm),
      remainingamount:(data.km*data.numberofsurveys*data.rate)-((data.previousbillkm+data.currentbillkm)*data.rate)
    }
  }

    updateRowData(data: any) {
      const element:any = this.dataSource.data.find((x:any) => x.invoiceid == data.id);
      if(element){
      element.currentbillkm=data.currentbillkm
      }
      this.bindBilling(element);
      this.dataSource._updateChangeSubscription();
    }
    addRowData(data: any) {
      const data1:any = {
        id: data.id,
        description :data.description,
        km:data.km,
        rate:data.rate,
        numberofsurveys:data.numberofsurveys,
        previousbillkm:data.previousbillkm,
        currentbillkm:data.currentbillkm,
        invoiceid:data.invoiceid
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
      data.contractamount=data.km*data.numberofsurveys*data.rate,
      data.previousbill=data.previousbillkm*data.rate,
      data.currentbill=data.currentbillkm*data.rate,
      data.commulativekm=data.previousbillkm+data.currentbillkm,
      data.commulativeamount=(data.previousbillkm+data.currentbillkm)*data.rate,
      data.remainingkm=data.km-(data.previousbillkm+data.currentbillkm),
      data.remainingamount=(data.km*data.numberofsurveys*data.rate)-((data.previousbillkm+data.currentbillkm)*data.rate)
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
  
  




