import { Component,Input,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentService } from '@app/payments/payment.service';
import { HelperService } from '@app/shared/services/helper.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-dpr-boq-list',
  standalone: false,
  templateUrl: './manage-dpr-boq-list.component.html',
  styleUrl: './manage-dpr-boq-list.component.scss'
})
export class ManageDprBoqListComponent {

 itemsList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','projectid','name', 'view'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
  @Input() sectorId:string='';
  @Input() subSectorId:string='';
 @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!:number;

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
    this.paymentService.getAllProjectPartialDetailsByOrdIg({ sector: this.sectorId,subSector : this.subSectorId}, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
      if (response && response.success) {
        this.itemsList = response.data;
        this.updateTable(this.itemsList);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  clear(){
    this.filterChange('');
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
    this.itemsList = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.resultsLength= this.itemsList.length;   
  }

}


