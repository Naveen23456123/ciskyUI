import {AfterViewInit,EventEmitter, Input, Output, Component, ViewChild, inject, SimpleChanges} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { finalize, Subscription, take } from 'rxjs';
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
  today= new Date();
  @Input() filters:any={};
  financeCount:any={total:0,expired:0};
  private subscription: Subscription = new Subscription();
  readonly dialog = inject(MatDialog);
  @Output() OnControlFilter:EventEmitter<any> = new EventEmitter();
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
    this.OnControlFilter.emit({value:{
      startdate:true,
      isproject:true,
      iscompany:true,
      enddate:true
    }});  
  }
  ngOnChanges(changes: SimpleChanges) {   
    if (changes['filters']) {
      this.isLoading=true;   
      const payload = {
        ...changes['filters'].currentValue,
        startdate: changes['filters'].currentValue.startdate || null,
        enddate: changes['filters'].currentValue.enddate || null
      };   
      this.subscription = this.insuranceService.getInsuranceListByProjectIdByOrgId(payload, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((insResponse: any) => {
        if (insResponse && insResponse.success) {
          this.insList = insResponse.data;
          this.dataSource = new MatTableDataSource(this.insList);               
          this.updateTable(this.insList);      
          this.financeCount.total = this.insList.reduce((sum, record) => {
            return sum + (Number(record.amount) || 0);
          }, 0);
        
          this.financeCount.expired = this.insList.reduce((sum, record) => {           
            return new Date(record.enddate) < this.today ? sum + (Number(record.amount) || 0) : sum;
          }, 0); 
        }
      });
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
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



