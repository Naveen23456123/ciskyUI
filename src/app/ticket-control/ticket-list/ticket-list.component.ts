import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryControlService } from '@app/inventory-control/inventory-control.service';
import { PdfViewerComponent } from '@app/shared/components/pdf-viewer/pdf-viewer.component';
import { TicketInterfaceService } from '@app/shared/services/external/ticket-interface.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { SiteControlService } from '@app/site-control/site-control.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-ticket-list',
  standalone: false,
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent {
  ticketList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','projectname', 'source','destination','date','amount','view','action'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
 @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!:number;
  isSearching=false;
  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private ticketService:TicketInterfaceService,private helperService:HelperService,
  private stateDataService:StateDataService, private notifyBarService:NotifyBarService
 ){
  this.dataSource = new MatTableDataSource(this.ticketList);
 }

 ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data) => {   
    if (data.event == 'ticedit'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if (data.event == 'ticadd' && data.valid && data.value) {
      this.addRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'ticdelete' && data.valid && data.value){
      this.deleteRow(data.value.id);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
  });
    this.filterTicket();
  }

  ngAfterViewInit() {
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
    this.ticketList = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.pageSize= this.helperService.getPageSize();
    this.resultsLength= this.ticketList.length;   
  }
  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element){
    element.id = data.id;
    element.projectid =data.projectid,
    element.source=data.source,
    element.employeeids=data.employeeids,
    element.destination=data.destination,
    element.bookingdate=data.bookingdate,
    element.personname=data.personname,
    element.ticketnumber= data.ticketnumber,
    element.ticketamount=data.ticketamount,
    element.proofaddress=data.proofaddress,
    element.proof=data.proof,
    element.projectname= data.projectname
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(data: any) {
    const data1:any = {
      id:data.id,
      projectid :data.projectid,
      source:data.source,
      employeeids:data.employeeids,
      destination:data.destination,
      bookingdate:data.bookingdate,
      personname:data.personname,
      ticketnumber:data.ticketnumber,
      ticketamount:data.ticketamount,
      proofaddress:data.proofaddress,
      proof:data.proof,
      projectname:data.projectname
    }  
    this.ticketList.unshift(data1);
    this.updateTable(this.ticketList);
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  searchObj:any={
    projectid:'',   
    datetime:''
  };
  projectChange(data:any){ 
   this.searchObj.projectid= data.value ?? '';
   this.filterTicket();
  }
  clear(){
    this.searchObj={
     projectid:''
    };
    this.filterTicket();
  }
  anyChange(data:any){
    if(data && data.value){ 
      this.dataSource.filter = data.value.trim().toLowerCase()
    }
    else{
      this.dataSource.filter = '';
    }
  }
  filterTicket(){
  this.isSearching=true;
    this.ticketService.getTicketListByOrgId(this.searchObj, '')
      .pipe(finalize(() => {this.isLoading = false;this.isSearching=false}))
      .subscribe({next : (response: any) => {
        if (response && response.success) {
          this.ticketList = response.data;
          this.updateTable(this.ticketList);
        }
    }});
  }
  viewPdf(data:any){
    const config = this.defaultdialogoptions;
    config.minWidth='80vw';
    config.data = {
      element:data
    };
    this.dialog.open(PdfViewerComponent,config);
  }
}
