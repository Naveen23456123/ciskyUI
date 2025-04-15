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
          this.addRowData(data.value);
          this.notifyBarService.showsnackbar(data.msg);
          this.stateDataService.stateDataSubject.next({});
        } else if(data.event == 'conttpdelete' && data.valid && data.value){
          this.deleteRow(data.value.id);
          this.notifyBarService.showsnackbar(data.msg);
          this.stateDataService.stateDataSubject.next({});
        }
      });
      this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
        if(projectEntity && projectEntity.invoiceId){
          this.invoiceService.getConsultantTransportationListByProjectId({id:projectEntity.invoiceId }, '')
               .pipe(finalize(() => this.isLoading = false))
               .subscribe((response: any) => {
                 if (response && response.success) {
                  let transData = response.data.map((data:any)=>({
                    id: data.id,
                    description :data.description,
                    rate:data.rate,
                    constructionmonths:data.constructionmonths,
                    maintenancemonths:data.maintenancemonths,
                    previousbillmonths:data.previousbillmonths,
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
          totalmonths:data.constructionmonths+data.maintenancemonths,
          contractamount:(data.constructionmonths+data.maintenancemonths)*data.rate,
          previousbill:data.previousbillmonths*data.rate,
          currentbill:data.currentbillmonths*data.rate,
          commulativemonth:data.previousbillmonths+data.currentbillmonths,
          commulativeAmount:(data.previousbillmonths+data.currentbillmonths)*data.rate,
          remainingmonth:(data.constructionmonths+data.maintenancemonths)-(data.previousbillmonths+data.currentbillmonths),
          remainingamount:((data.constructionmonths+data.maintenancemonths)*data.rate)-((data.previousbillmonths+data.currentbillmonths)*data.rate)
        }
      }

      updateRowData(data: any) {
        const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
        if(element){
        element.id = data.id;
        element.description =data.description,
        element.rate=data.rate,
        element.constructionmonths=data.constructionmonths,
        element.maintenancemonths=data.maintenancemonths,
        element.previousbillmonths=data.previousbillmonths,
        element.currentbillmonths=data.currentbillmonths,
        element.totalmonths=this.getattributes(data).totalmonths,
        element.contractamount=this.getattributes(data).contractamount,
        element.previousbill=this.getattributes(data).previousbill,
        element.currentbill=this.getattributes(data).currentbill,
        element.commulativemonth=this.getattributes(data).commulativemonth,
        element.commulativeAmount=this.getattributes(data).commulativeAmount,
        element.remainingmonth=this.getattributes(data).remainingmonth,
        element.remainingamount=this.getattributes(data).remainingamount
        this.dataSource._updateChangeSubscription();
        }
      }
      addRowData(data: any) {
        //const selectedOption = this.professionaList.find(option => option.value === event.value);
        const data1:any = {
        id: data.id,
        description :data.description,
        rate:data.rate,
        constructionmonths:data.constructionmonths,
        maintenancemonths:data.maintenancemonths,
        previousbillmonths:data.previousbillmonths,
        currentbillmonths:data.currentbillmonths,
        totalmonths:data.constructionmonths+data.maintenancemonths,
        contractamount:(data.constructionmonths+data.maintenancemonths)*data.rate,
        previousbill:data.previousbillmonths*data.rate,
        currentbill:data.currentbillmonths*data.rate,
        commulativemonth:data.previousbillmonths+data.currentbillmonths,
        commulativeAmount:(data.previousbillmonths*+data.currentbillmonths)*data.rate,
        remainingmonth:(data.constructionmonths+data.maintenancemonths)-(data.previousbillmonths+data.currentbillmonths),
        remainingamount:((data.constructionmonths+data.maintenancemonths)*data.rate)-((data.previousbillmonths*+data.currentbillmonths)*data.rate)
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
        let total= this.tpData.map(t => t.totalamount).reduce((acc, value) => acc + value, 0);
        this.onAmountChange.emit(total);
        return total;
      }
  }
