import { Component, ViewChild, inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { finalize, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BankGuaranteeInterfaceService } from '@app/shared/services/external/bank-guarantee-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-explore-bank-guarantee',
  standalone: false,
  templateUrl: './explore-bank-guarantee.component.html',
  styleUrl: './explore-bank-guarantee.component.scss'
})
export class ExploreBankGuaranteeComponent {
  bgList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','bankname', 'guranteename', 'amount','releasedate', 'startdate','expirydate','remarks','file'];
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
      this.bankGuaranteeService.getBankGuaranteeListByProjectIdByOrgId({}, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((insResponse: any) => {
          if (insResponse && insResponse.success) {
            this.bgList = insResponse.data;
            this.dataSource = new MatTableDataSource(this.bgList);               
            this.updateTable(this.bgList);                  
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



