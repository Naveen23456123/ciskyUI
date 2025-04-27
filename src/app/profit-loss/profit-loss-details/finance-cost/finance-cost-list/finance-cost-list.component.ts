import { Component,EventEmitter,Output,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';import { untilDestroyed } from '@app/core/until-destroyed';
import { DialogOperation, ProfitLossScope } from '@app/shared/models/constant.config';
import { ProfitLossInterfaceService } from '@app/shared/services/external/profit-loss-interface.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-finance-cost-list',
  standalone: false,
  templateUrl: './finance-cost-list.component.html',
  styleUrl: './finance-cost-list.component.scss'
})
export class FinanceCostListComponent {
  data:any[]=[];
  isLoading = true;

  dataColumn: string[] = ['serial','name','amount','action' ];
  footerColumns: string[] = ['serial', 'amount','action'];
  dataSource!: MatTableDataSource<any[]>;
  @Output() onAmountChange: EventEmitter<any> = new EventEmitter();
  @Output() onDataLoad: EventEmitter<any> = new EventEmitter();
  readonly dialog = inject(MatDialog);
  private subscription:Subscription = new Subscription();
    private defaultdialogoptions:  MatDialogConfig = {
      minWidth: '900px', 
      disableClose: false,
      data: {},
    };
  
   constructor(private profitLossService:ProfitLossInterfaceService,private helperService:HelperService,
    private stateDataService :StateDataService, private notifyBarService :NotifyBarService,
    private sessionService:SessionService
   ){
    this.dataSource = new MatTableDataSource(this.data);
   }
  
   ngOnInit()  {
    this.stateDataService.stateDataSubject.subscribe((data) => {   
      if (data.event == 'fcedit'  && data.valid && data.value) {      
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'fcadd' && data.valid && data.value) {
        this.addRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if(data.event == 'fcdelete' && data.valid && data.value){
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
    });
    this.subscription=  this.sessionService.profileLossScopeSubject$.pipe(take(1),untilDestroyed(this)).subscribe((responseData:any)=>{
      if(responseData.length>0){
        this.profitLossService.getProfitLossByScopeId({id:responseData.find((x:any)=> x.key== ProfitLossScope.FINANCE_COST)?.id }, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((response: any) => {
          if (response && response.success) {
           this.data = response.data;
           this.dataSource = new MatTableDataSource(this.data);
           this.onDataLoad.emit({type:DialogOperation.ADD,value:this.data});
           this.getTotalAmount();              
          }
        });
      }
    });
    this.isLoading = false;     
  } 

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

    updateRowData(data: any) {
      const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
      if(element){
      element.id = data.id;     
      element.name=data.name,
      element.amount =+data.amount,
      element.scopeid =data.scopeid
      this.dataSource._updateChangeSubscription();
      this.onDataLoad.emit({type:DialogOperation.EDIT,value:data});
      }
    }
    addRowData(data: any) {
      const data1:any = {
        id: data.id,
        name:data.name,
        amount :+data.amount,
        scopeid :data.scopeid
      }      
      this.dataSource.data.unshift(data1);  
      this.dataSource._updateChangeSubscription();
      this.onDataLoad.emit({type:DialogOperation.ADD,value:[data]});
    }
    deleteRow(data: any) {
      const index = this.dataSource.data.findIndex((x:any) => x.id == data);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
      this.onDataLoad.emit({type:DialogOperation.DELETE,value:data});
    }
    getTotalAmount() {
      let total= this.data.map(t => t.amount).reduce((acc, value) => acc + value, 0);
      this.onAmountChange.emit(total);
      return total;
    }
  }
  
  








