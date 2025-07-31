import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentService } from '@app/payments/payment.service';
import { HelperService } from '@app/shared/services/helper.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-boq-list',
  standalone: false,
  templateUrl: './boq-list.component.html',
  styleUrl: './boq-list.component.scss'
})
export class BoqListComponent {
  itemsList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','projectid','name', 'view'];
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

 constructor(private paymentService:PaymentService,private helperService:HelperService){
  this.dataSource = new MatTableDataSource(this.itemsList);
 }

 ngOnInit()  {
  this.isLoading=true;
    this.paymentService.getAllProjectPartialDetailsByOrdIg({ organizationId: this.activeOrgId }, '')
           .pipe(finalize(() => this.isLoading = false))
           .subscribe((response: any) => {
            if (response && response.success) {
              this.itemsList = response.data;
              this.dataSource = new MatTableDataSource(this.itemsList);
              this.pageSize= this.helperService.getPageSize();
             }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, 10);
    this.pageSize = this.helperService.getPageSize();
  }

}

