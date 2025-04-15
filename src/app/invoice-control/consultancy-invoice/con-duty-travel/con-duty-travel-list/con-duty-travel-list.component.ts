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
  selector: 'app-con-duty-travel-list',
  standalone: false,
  templateUrl: './con-duty-travel-list.component.html',
  styleUrl: './con-duty-travel-list.component.scss'
})
export class ConDutyTravelListComponent {
data:any[]=[];
  isLoading = true;

  dataColumn: string[] =['serial','desc','contract_rate','trip','totalamt','prev_month','prev_amt','curr_month','curr_amt','comlt_month','comlt_amt','rem_month','rem_amt','action'];
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
    
   }
  
   ngOnInit()  {
    this.stateDataService.stateDataSubject.subscribe((data) => {   
      if (data.event == 'condtedit'  && data.valid && data.value) {      
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'condtadd' && data.valid && data.value) {
        this.addRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if(data.event == 'condtdelete' && data.valid && data.value){
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
    });
    this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((invEntity:any)=>{
      if(invEntity && invEntity.invoiceId){
        this.invoiceService.getConsultantDutyTravelListByProjectId({id:invEntity.invoiceId }, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((response: any) => {
          if (response && response.success) {
            let dtData = response.data.map((data:any)=>({
              id: data.id,
              description : data.description,
              rate: data.rate,
              trips: data.trips,
              previousbilltrips: data.previousbilltrips,
              currentbilltrips: data.currentbilltrips,
              contractamount:this.getattributes(data).contractamount,
              previousbill:this.getattributes(data).previousbill,
              currentbill:this.getattributes(data).currentbill,
              commulativetrips:this.getattributes(data).commulativetrips,
              commulativeamount:this.getattributes(data).commulativeamount,
              remainingtrip:this.getattributes(data).remainingtrip,
              remainingamount:this.getattributes(data).remainingamount
            }));
           this.data = dtData;
           this.dataSource = new MatTableDataSource(this.data);
           this.getTotalAmount();              
         }
        });
      }
    });    
  } 

  getattributes(data:any){
    return {
      contractamount:(data.trips)*data.rate,
      previousbill:data.previousbilltrips*data.rate,
      currentbill:data.currentbilltrips*data.rate,
      commulativetrips:data.previousbilltrips+data.currentbilltrips,
      commulativeamount:(data.previousbilltrips+data.currentbilltrips)*data.rate,
      remainingtrip:(data.trips)-(data.previousbilltrips+data.currentbilltrips),
      remainingamount:((data.trips)*data.rate)-((data.previousbilltrips+data.currentbilltrips)*data.rate)
    }
  }

    updateRowData(data: any) {
      const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
      if(element){
      element.id = data.id;
      element.description = data.description,
      element.rate=data.rate,
      element.trips= data.trips,
      element.previousbilltrips= data.previousbilltrips,
      element.currentbilltrips=data.currentbilltrips,
      element.contractamount=this.getattributes(data).contractamount,
      element.previousbill=this.getattributes(data).previousbill,
      element.currentbill=this.getattributes(data).currentbill,
      element.commulativetrips=this.getattributes(data).commulativetrips,
      element.commulativeamount=this.getattributes(data).commulativeamount,
      element.remainingtrip=this.getattributes(data).remainingtrip,
      element.remainingamount=this.getattributes(data).remainingamount     
      this.dataSource._updateChangeSubscription();
      }
    }
    addRowData(data: any) {
      const data1:any = {
        id: data.id,
        description : data.description,
        rate: data.rate,
        trips: data.trips,
        previousbilltrips: data.previousbilltrips,
        currentbilltrips: data.currentbilltrips,
        contractamount:this.getattributes(data).contractamount,
        previousbill:this.getattributes(data).previousbill,
        currentbill:this.getattributes(data).currentbill,
        commulativetrips:this.getattributes(data).commulativetrips,
        commulativeamount:this.getattributes(data).commulativeamount,
        remainingtrip:this.getattributes(data).remainingtrip,
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
  
  



