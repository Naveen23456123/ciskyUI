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
  selector: 'app-boq-duty-travel-list',
  standalone: false,
  templateUrl: './boq-duty-travel-list.component.html',
  styleUrl: './boq-duty-travel-list.component.scss'
})
export class BoqDutyTravelListComponent {

  data:any[]=[];
  isLoading = true;

  dataColumn: string[] = ['serial','trips','nooftrip','rate','amount','action' ];
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
      if (data.event == 'dtedit'  && data.valid && data.value) {      
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'dtadd' && data.valid && data.value) {
        this.addRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if(data.event == 'dtdelete' && data.valid && data.value){
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
    });
    this.sessionService.projectEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
      if(projectEntity && projectEntity.projectId){
        this.invoiceService.getBoqDutyTravelListByProjectId({id:projectEntity.projectId }, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((response: any) => {
          if (response && response.success) {
           this.data = response.data;
           this.dataSource = new MatTableDataSource(this.data);
           this.getTotalAmount();              
         }
        });
      }
    });

    } 
    updateRowData(data: any) {
      const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
      if(element){
      element.id = data.id;
      element.trips =data.trips,
      element.totalamount= data.totalamount,
      element.numberofminimumtrips=data.numberofminimumtrips,
      element.ratepertrip=data.ratepertrip
      this.dataSource._updateChangeSubscription();
      }
    }
    addRowData(data: any) {
      const data1:any = {
        id: data.id,
        trips :data.trips,
        totalamount: data.totalamount,
        numberofminimumtrips:data.numberofminimumtrips,
        ratepertrip:data.ratepertrip
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
  
  


