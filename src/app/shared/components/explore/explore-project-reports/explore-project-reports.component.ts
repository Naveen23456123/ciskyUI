import { Component,EventEmitter, Input, Output, SimpleChanges, ViewChild, inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { finalize, Subscription, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BankGuaranteeInterfaceService } from '@app/shared/services/external/bank-guarantee-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { ProjectReportInterfaceService } from '@app/shared/services/external/project-report-interface.service';


@Component({
  selector: 'app-explore-project-reports',
  standalone: false,
  templateUrl: './explore-project-reports.component.html',
  styleUrl: './explore-project-reports.component.scss'
})
export class ExploreProjectReportsComponent {
 reportList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','type', 'name', 'no','letterno', 'date','file'];
  dataSource!: MatTableDataSource<any[]>;
 @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!:number;
  @Input() filters:any={};
  financeCount:any={total:0,expired:0};
  readonly dialog = inject(MatDialog);
  today = new Date();
  private subscription: Subscription = new Subscription();
  @Output() OnControlFilter:EventEmitter<any> = new EventEmitter();
   private defaultdialogoptions:  MatDialogConfig = {    
        disableClose: false,
        data: {},
      };

  constructor(private sessionService : SessionService,private reportService:ProjectReportInterfaceService,
      private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService:NotifyBarService){     
       this.dataSource = new MatTableDataSource(this.reportList);
    }

  ngOnInit()  {  
    this.OnControlFilter.emit({value:{
      isproject:true,
      iscompany:true,
      date:true
    }}); 
  }

  ngOnChanges(changes: SimpleChanges) {   
    if (changes['filters']) {
      this.isLoading=true;    
      const payload = {
        ...changes['filters'].currentValue,
        date: changes['filters'].currentValue.date || null
      }; 
      this.financeCount={total:0,expired:0};
      this.subscription = this.reportService.getPReportAllList(payload, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
        if (response && response.success) {
          this.reportList = response.data;
          this.dataSource = new MatTableDataSource(this.reportList);               
          this.updateTable(this.reportList); 
          this.financeCount.total = this.reportList.reduce((sum, record) => {
            return sum + (Number(record.amount) || 0);
          }, 0);
        
          this.financeCount.expired = this.reportList.reduce((sum, record) => {           
            return new Date(record.guaranteeexpirydate) < this.today ? sum + (Number(record.amount) || 0) : sum;
          }, 0);                 
        }
      });
    }
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  ngAfterViewInit() {
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
    this.reportList = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.resultsLength= this.reportList.length;   
  }
  openDoc(row:any){
    window.open(row.docaddress, "_blank");
  }    
}




