import { ChangeDetectorRef, Component,Input,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaymentService } from '@app/payments/payment.service';
import { CommonService } from '@app/shared/services/common.service';
import { InvoiceInterfaceService } from '@app/shared/services/external/invoice-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-supervision-invoice-list',
  standalone: false,
  templateUrl: './manage-supervision-invoice-list.component.html',
  styleUrl: './manage-supervision-invoice-list.component.scss'
})
export class ManageSupervisionInvoiceListComponent {
invoiceList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','projectid','name', 'view'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
 @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!:number;
  projectId='';
  readonly dialog = inject(MatDialog);
  @Input() sectorId:string='';
  @Input() subSectorId:string='';
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private projectService:ProjectInterfaceService,private helperService:HelperService,
  private stateDataService:StateDataService, private notifyBarService:NotifyBarService,
  private commonService:CommonService, private router:Router, private sessionService:SessionService,
  private invoiceService:InvoiceInterfaceService
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
 
  this.projectService.getAllProjectPartialDetailsByOrdIg({ sector: this.sectorId,subSector : this.subSectorId}, '')
    .pipe(finalize(() => this.isLoading = false))
    .subscribe((response: any) => {
      if (response && response.success) {
        this.invoiceList = response.data;
        this.updateTable(this.invoiceList);
      }
    });
  }

  ngAfterViewInit() {
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
    this.invoiceList = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);
    this.pageSize= this.helperService.getPageSize();    
    this.resultsLength= this.invoiceList.length;   
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  projectChange(data:any){ 
   if(data){
    this.projectId= data.value;
    this.invoiceService.getInvoiceListByOrgId({ projectid: data.value }, '')
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
