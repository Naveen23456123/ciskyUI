import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { finalize, take } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CosInterfaceService } from '@app/shared/services/external/cos-interface.service';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { ManageInsuranceComponent } from '../manage-insurance/manage-insurance.component';
import { InsuranceInterfaceService } from '@app/shared/services/external/insurance-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { DialogOperation } from '@app/shared/models/constant.config';
import { ManageInsuranceUploadComponent } from '../manage-insurance-upload/manage-insurance-upload.component';
import { GenerateCsvService } from '@app/shared/services/generate-csv.service';
import { PdfViewerComponent } from '../../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-insurance-list',
  standalone: false,
  templateUrl: './insurance-list.component.html',
  styleUrl: './insurance-list.component.scss'
})
export class InsuranceListComponent {
  insList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','policyno', 'name',  'amount','startdate','enddate','file','action'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {
        disableClose: false,
        data: {},
      };

  constructor(private sessionService : SessionService,private insuranceService:InsuranceInterfaceService,
    private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService:NotifyBarService,private csvService:GenerateCsvService){     
      this.dataSource = new MatTableDataSource(this.insList);
  }

  ngOnInit()  {     
    this.sessionService.workingProjectSubject$.pipe(take(1)).subscribe((response:any)=>{
      if(response){
        this.insuranceService.getInsuranceListByProjectIdByOrgId({ projectId: response.id }, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((insResponse: any) => {
          if (insResponse && insResponse.success) {
            this.insList = insResponse.data;
            this.dataSource = new MatTableDataSource(this.insList);               
            this.updateTable(this.insList);
          
          }
        });
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
  import() {
    const config = this.defaultdialogoptions;
    config.minWidth='75vw';
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: this.route.snapshot.data['type'],
        template_type: TemplateType.INSURANCE 
    };
    let dialogRef= this.dialog.open(ManageInsuranceUploadComponent,config);
    dialogRef.afterClosed().subscribe((data) => { 
      if (data && data.valid) {
        this.addBulkIns(data.value);
        this.notifyBarService.showsnackbar('The Insurance(s) created successfully.');
      }
    });
  }
    addBulkIns(data:any){
    data.forEach((element:any) => {
      this.addRowData(element);
    });
  }
  export() {
    if(this.insList && this.insList.length>0)
      this.csvService.downloadFile(this.insList,this.insuranceService.getCsvTemplateColumnList(),'Insurances');
  }
  
  add() {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.ADD,    
    };
    config.minWidth='65vw';    
    const dialogRef = this.dialog.open(ManageInsuranceComponent, config);
    dialogRef.afterClosed().subscribe((data:any) => {
      if (data && data.valid) {
        this.notifyBarService.showsnackbar('The Insurance details created successfully.');
        this.addRowData(data.value);
      }
      else {            
      }
    });
  }
  edit_ins(row:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.EDIT,
      element: row
    };  
    this.defaultdialogoptions.minWidth='65vw';    
    const dialogRef = this.dialog.open(ManageInsuranceComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {       
      if (data.valid) {
      this.notifyBarService.showsnackbar('The Insurance details updated successfully.');
      this.updateRowData(data.value);
      }
      else {
      }
    });
  }

  delete_ins(row:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.DELETE,
      element: row
    };
    this.defaultdialogoptions.minWidth='45vw';
    const dialogRef = this.dialog.open(ManageInsuranceComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        this.notifyBarService.showsnackbar('The Insurance removed successfully.');
        this.deleteRow(data.value);
      }
      else {
      }
    });
  }
  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element){
      element.projectid =data.projectid,
      element.insurancename =data.insurancename,
      element.policynumber=data.insurancename,
      element.companyname=data.companyname,
      element.amount=data.amount,
      element.policynumber=data.policynumber,
      element.startdate=data.startdate,
      element.enddate=data.enddate,
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(data: any) {
    const data1:any = {
      id: data.id,
      projectid :data.projectid,
      insurancename:data.insurancename,
      companyname:data.companyname,
      amount:data.amount,
      policynumber:data.policynumber,
      startdate:data.startdate,
      enddate:data.enddate,
      docaddress:data.docaddress
    }    
    
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription();
  }

  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  openDoc(row:any){
    window.open(row.docaddress, "_blank");
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


