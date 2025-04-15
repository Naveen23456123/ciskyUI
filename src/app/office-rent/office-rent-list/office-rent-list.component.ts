import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '@app/employee-control/employee.service';
import { HelperService } from '@app/shared/services/helper.service';
import { SiteControlService } from '@app/site-control/site-control.service';
import { finalize } from 'rxjs';
import { OfficeService } from '../office.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-office-rent-list',
  standalone: false,
  templateUrl: './office-rent-list.component.html',
  styleUrl: './office-rent-list.component.scss'
})
export class OfficeRentListComponent {
  rents:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','project','basicamount', 'agrdate', 'ownername','mobileno','documents','action'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;

  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private officeService:OfficeService,private helperService:HelperService,
  private stateDataService :StateDataService, private notifyBarService:NotifyBarService
 ){
  this.dataSource = new MatTableDataSource(this.rents);
 }

 ngOnInit()  {
  this.stateDataService.stateDataSubject.subscribe((data:any) => {   
    if (data.event == 'rentedit'  && data.valid && data.value) {      
      this.updateRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if (data.event == 'rentadd' && data.valid && data.value) {
      this.addRowData(data.value);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    } else if(data.event == 'rentdelete' && data.valid && data.value){
      this.deleteRow(data.value.id);
      this.notifyBarService.showsnackbar(data.msg);
      this.stateDataService.stateDataSubject.next({});
    }
  });
    this.officeService.getOfficeRentsByOrdIdProjectId({ organizationId: this.activeOrgId }, '')
           .pipe(finalize(() => this.isLoading = false))
           .subscribe((response: any) => {
             if (response && response.success) {
              this.rents = response.data;
              this.dataSource = new MatTableDataSource(this.rents);
              this.pageSize= this.helperService.getPageSize();
             }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private updateTable(info: any) {
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, 10);
    this.pageSize = this.helperService.getPageSize();
  }

  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
      if(element){
        element.id=data.id,
        element.projectid =data.projectid,
        element.basicamount=data.basicamount,
        element.tdspercentage=data.tdspercentage,
        element.agreementduration=data.agreementduration,
        element.agreementstartdate=data.agreementstartdate,
        element.agreementenddate=data.agreementenddate,
        element.ownername=data.ownername,
        element.bankname=data.bankname,
        element.accountholdername=data.accountholdername,
        element.accountnumber=data.accountnumber,
        element.ifsccode=data.ifsccode,
        element.panno=data.panno,
        element.gstno=data.gstno,
        element.phoneno=data.phoneno,
        element.address=data.address,
        element.documentaddress=data.documentaddress
        this.dataSource._updateChangeSubscription();
      }
  }
  addRowData(data: any) {    
    const data1:any = {
      id: data.id,
      projectid :data.projectid,
      basicamount:data.basicamount,
      tdspercentage:data.tdspercentage,
      agreementduration:data.agreementduration,
      agreementstartdate:data.agreementstartdate,
      agreementenddate:data.agreementenddate,
      ownername:data.ownername,
      bankname:data.bankname,
      accountholdername:data.accountholdername,
      accountnumber:data.accountnumber,
      ifsccode:data.ifsccode,
      panno:data.panno,
      gstno:data.gstno,
      phoneno:data.phoneno,
      address:data.address,
      documentaddress:data.documentaddress 
    }      
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription(); 
  }

  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
}

