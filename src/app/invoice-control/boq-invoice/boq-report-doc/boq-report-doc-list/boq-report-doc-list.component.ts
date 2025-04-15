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
  selector: 'app-boq-report-doc-list',
  standalone: false,
  templateUrl: './boq-report-doc-list.component.html',
  styleUrl: './boq-report-doc-list.component.scss'
})
export class BoqReportDocListComponent {

  data:any[]=[];
  isLoading = true;

  dataColumn: string[] = ['serial','desc','noofreport','noofcopy','totalcopy','ratepercopy','amount','action' ];
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
  
   ngOnInit()  {
    this.stateDataService.stateDataSubject.subscribe((data) => {   
      if (data.event == 'rdedit'  && data.valid && data.value) {      
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'rdadd' && data.valid && data.value) {
        this.addRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if(data.event == 'rddelete' && data.valid && data.value){
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
    });
    this.sessionService.projectEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
      if(projectEntity && projectEntity.projectId){
        this.invoiceService.getBoqReportDocListByProjectId({id:projectEntity.projectId }, '')
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
      element.projectid=data.projectid,
      element.totalamount= data.totalamount,
      element.numberofreport =data.numberofreport,
      element.numberofcopiesperreport=data.numberofcopiesperreport,
      element.ratepercopy=data.ratepercopy,
      element.description=data.description,
      this.dataSource._updateChangeSubscription();
      }
    }
    addRowData(data: any) {
      const data1:any = {
        id:data.id,
        projectid:data.projectid,
        totalamount: data.totalamount,
        numberofreport :data.numberofreport,
        numberofcopiesperreport:data.numberofcopiesperreport,
        ratepercopy:data.ratepercopy,
        description:data.description,
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
  
  




