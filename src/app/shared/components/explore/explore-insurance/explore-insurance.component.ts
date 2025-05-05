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
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { DialogOperation } from '@app/shared/models/constant.config';

@Component({
  selector: 'app-explore-insurance',
  standalone: false,
  templateUrl: './explore-insurance.component.html',
  styleUrl: './explore-insurance.component.scss'
})
export class ExploreInsuranceComponent {
  insList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','policyno', 'name',  'amount','startdate','enddate','file'];
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
    private notifyBarService:NotifyBarService){     
       this.dataSource = new MatTableDataSource(this.insList);
    }

    ngOnInit()  {     
      this.insuranceService.getInsuranceListByProjectIdByOrgId({ }, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((insResponse: any) => {
        if (insResponse && insResponse.success) {
         this.insList = insResponse.data;
         this.dataSource = new MatTableDataSource(this.insList);               
         this.updateTable(this.insList);
        
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

    openDoc(row:any){
      window.open(row.docaddress, "_blank");
    }
}



