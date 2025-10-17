import { ChangeDetectorRef, Component,Inject,Optional,ViewChild,inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-manage-project-invoice-list',
  standalone: false,
  templateUrl: './manage-project-invoice-list.component.html',
  styleUrl: './manage-project-invoice-list.component.scss'
})
export class ManageProjectInvoiceListComponent {
  public data: any;
invoiceList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','invno','month','year', 'view','releaseview','action'];
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

 constructor(@Inject(MAT_DIALOG_DATA) data: any,
       @Optional() private dialogRef: MatDialogRef<ManageProjectInvoiceListComponent>,private paymentService:PaymentService,private helperService:HelperService,
  private stateDataService:StateDataService, private notifyBarService:NotifyBarService,
  private commonService:CommonService, private router:Router, private sessionService:SessionService,
  private cdr:ChangeDetectorRef
 ){
  this.data = data || {};
  this.dataSource = new MatTableDataSource(this.invoiceList);
 }

 ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data) => {   
    if(data.event == 'invdelete' && data.valid && data.value){
      this.deleteRow(data.value.id);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
  });
  if(this.data && this.data.element){
    this.paymentService.getInvoiceListByOrgId({projectid: this.data.element.id }, '')
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  getMonthAndYear(date:any){
    return this.commonService.getMonthandYear(date);
  }
  details(data:any){
    this.dialogRef.close({ valid: true ,redirect:true});
    this.sessionService.setInvoiceEntity({invoiceId:data.id, projectId:data.projectid,invoiceData:data});
    this.router.navigate(['/consultancy-invoice']);
  } 
  releasedetails(data:any){
    this.dialogRef.close({ valid: true ,redirect:true});
    this.sessionService.setInvoiceEntity({invoiceId:data.id, projectId:data.projectid,invoiceData:data});
    this.router.navigate(['/consultancy-release-invoice']);
  }
}


