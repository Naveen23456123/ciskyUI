import { ChangeDetectorRef, Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InventoryControlService } from '@app/inventory-control/inventory-control.service';
import { PaymentService } from '@app/payments/payment.service';
import { CommonService } from '@app/shared/services/common.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-invoice-list',
  standalone: false,
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent {
invoiceList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','projectid','name', 'view'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  projectId='';
  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private paymentService:PaymentService,private helperService:HelperService,
  private stateDataService:StateDataService, private notifyBarService:NotifyBarService,
  private commonService:CommonService, private router:Router, private sessionService:SessionService,
  private cdr:ChangeDetectorRef
 ){
  this.dataSource = new MatTableDataSource(this.invoiceList);
 }

 ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data) => {   
    if (data.event == 'invadd' && data.valid && data.value) {      
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'invdelete' && data.valid && data.value){
      this.deleteRow(data.value.id);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
  });
  this.paymentService.getAllProjectPartialDetailsByOrdIg({ organizationId: this.activeOrgId }, '')
           .pipe(finalize(() => this.isLoading = false))
           .subscribe((response: any) => {
            if (response && response.success) {
              this.invoiceList = response.data;
              this.dataSource = new MatTableDataSource(this.invoiceList);
              this.pageSize= this.helperService.getPageSize();
             }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  clear(){
    this.filterChange('');
  }
  filterChange(data:any){
    if(data && data.value){ 
      this.dataSource.filter = data.value.trim().toLowerCase()
    }
    else{
      this.dataSource.filter = '';
    }
  }

  private updateTable(info: any) {
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, 10);
    this.pageSize = this.helperService.getPageSize();
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  projectChange(data:any){ 
   if(data){
    this.projectId= data.value;
    this.paymentService.getInvoiceListByOrgId({ projectid: data.value }, '')
    .pipe(finalize(() => this.isLoading = false))
    .subscribe((response: any) => {
      if (response && response.success) {
       this.invoiceList = response.data;
       this.dataSource = new MatTableDataSource(this.invoiceList);
       this.pageSize= this.helperService.getPageSize();
      }
    });
   }
  }
  getMonthAndYear(date:any){
    return this.commonService.getMonthandYear(date);
  }
  details(data:any){
    this.sessionService.setInvoiceEntity({invoiceId:data.id, projectId:data.projectid});
    this.router.navigate(['/consultancy-invoice']);
  }
}

