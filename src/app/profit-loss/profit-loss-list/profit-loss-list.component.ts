import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from '@app/core/until-destroyed';
import { PaymentService } from '@app/payments/payment.service';
import { HelperService } from '@app/shared/services/helper.service';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-profit-loss-list',
  standalone: false,
  templateUrl: './profit-loss-list.component.html',
  styleUrl: './profit-loss-list.component.scss'
})
export class ProfitLossListComponent {
  itemsList:any[]= [];
    isLoading = true;
    displayedColumns: string[] = ['serial','projectid','name', 'view','action'];
    dataSource!: MatTableDataSource<any[]>;
    activeOrgId='123';
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    pagination: any;
    pageSize!: number;
    private subscription:Subscription = new Subscription();
  
    readonly dialog = inject(MatDialog);
    
    private defaultdialogoptions:  MatDialogConfig = {
      minWidth: '900px', 
      disableClose: false,
      data: {},
    };
  
   constructor(private paymentService:PaymentService,private helperService:HelperService){
    this.dataSource = new MatTableDataSource(this.itemsList);
   }
  
   ngOnInit()  {
    this.isLoading=true;
    this.subscription=  this.paymentService.getAllProjectPartialDetailsByOrdIg({ organizationId: this.activeOrgId }, '')
             .pipe(untilDestroyed(this), finalize(() => this.isLoading = false))
             .subscribe((response: any) => {
              if (response && response.success) {
                this.itemsList = response.data;
                this.dataSource = new MatTableDataSource(this.itemsList);
                this.pageSize= this.helperService.getPageSize();
               }
        });
    }

ngOnDestroy(){
   this.subscription.unsubscribe();
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
}
