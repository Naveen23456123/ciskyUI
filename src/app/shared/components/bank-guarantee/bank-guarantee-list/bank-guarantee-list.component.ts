import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { finalize, take } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { InsuranceInterfaceService } from '@app/shared/services/external/insurance-interface.service';
import { BankGuaranteeInterfaceService } from '@app/shared/services/external/bank-guarantee-interface.service';
import { ManageBankGuaranteeComponent } from '../manage-bank-guarantee/manage-bank-guarantee.component';
import { DialogOperation } from '@app/shared/models/constant.config';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-bank-guarantee-list',
  standalone: false,
  templateUrl: './bank-guarantee-list.component.html',
  styleUrl: './bank-guarantee-list.component.scss'
})
export class BankGuaranteeListComponent {
  bgList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','bankname', 'guranteename', 'amount','releasedate', 'startdate','expirydate','remarks','file','action'];
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

  constructor(private sessionService : SessionService,private bankGuaranteeService:BankGuaranteeInterfaceService,
      private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService:NotifyBarService){     
       this.dataSource = new MatTableDataSource(this.bgList);
    }

    ngOnInit()  {      
      this.sessionService.workingProjectSubject$.pipe(take(1)).subscribe((response:any)=>{
        if(response){
            this.bankGuaranteeService.getBankGuaranteeListByProjectIdByOrgId({ projectId: response.id }, '')
                .pipe(finalize(() => this.isLoading = false))
                .subscribe((insResponse: any) => {
                if (insResponse && insResponse.success) {
                  this.bgList = insResponse.data;
                  this.dataSource = new MatTableDataSource(this.bgList);               
                  this.updateTable(this.bgList);                  
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
              template_type: TemplateType.BANKGUARANTEE   
            };
              this.dialog.open(UploadFileComponent,config);
    }
    export() {
      
    }
    
    add(){
        const config = this.defaultdialogoptions;
        config.data = {
          pageGuid: this.route.snapshot.data['pageGuid'],
          type: DialogOperation.ADD,    
        };
        config.minWidth='55vw';
        const dialogRef = this.dialog.open(ManageBankGuaranteeComponent, config);
        dialogRef.afterClosed().subscribe((data:any) => {
          if (data && data.valid) {  
            this.notifyBarService.showsnackbar('The Bank Guarantee details created successfully.');
            this.addRowData(data.value);         
          }
          else {
            //this.router.navigate(['../'], { relativeTo: this.route });
          }
        });
      }
    edit_bg(row:any){
      this.defaultdialogoptions.data = {
           pageGuid: this.route.snapshot.data['pageGuid'],
           type: DialogOperation.EDIT,
           element: row
         }; 
         this.defaultdialogoptions.minWidth='55vw';    
         const dialogRef = this.dialog.open(ManageBankGuaranteeComponent, this.defaultdialogoptions);
         dialogRef.afterClosed().subscribe((data) => {       
           if (data.valid) {
            this.notifyBarService.showsnackbar('The Bank Guarantee details updated successfully.');
            this.updateRowData(data.value);
           }
           else {
           }
        });
    }

    delete_bg(row:any){
        this.defaultdialogoptions.data = {
          pageGuid: this.route.snapshot.data['pageGuid'],
          type: DialogOperation.DELETE,
          element: row
        };
        this.defaultdialogoptions.minWidth='45vw';    
        const dialogRef = this.dialog.open(ManageBankGuaranteeComponent, this.defaultdialogoptions);
        dialogRef.afterClosed().subscribe((data) => {
          if (data.valid) {
            this.notifyBarService.showsnackbar('The Bank Guarantee removed successfully.');
            this.deleteRow(data.value);
          }
          else {
          }
        });
      }
      updateRowData(data: any) {
        const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
        if(element){
          element.bankname= data.bankname,
          element.guaranteenumber =data.guaranteenumber,
          element.amount=data.amount,
          element.guaranteedate=data.guaranteedate,
          element.guaranteeexpirydate=data.guaranteeexpirydate,
          element.releasedate=data.releasedate,
          element.remark=data.remark,          
        this.dataSource._updateChangeSubscription();
        }
      }
    addRowData(data: any) {
        const data1:any = {
          id:data.id,
          projectid:data.projectid, 
          bankname: data.bankname,
          guaranteenumber :data.guaranteenumber,
          amount:data.amount,
          guaranteedate:data.guaranteedate,
          guaranteeexpirydate:data.guaranteeexpirydate,
          releasedate:data.releasedate,
          remark:data.remark,
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
}


