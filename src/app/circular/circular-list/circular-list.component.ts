import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryControlService } from '@app/inventory-control/inventory-control.service';
import { CircularInterfaceService } from '@app/shared/services/external/circular-interface.service';
import { HelperService } from '@app/shared/services/helper.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-circular-list',
  standalone: false,
  templateUrl: './circular-list.component.html',
  styleUrl: './circular-list.component.scss'
})
export class CircularListComponent {
  circularList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','title','publishdate','description','file','action','delete'];
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

 constructor(private circularService:CircularInterfaceService,private helperService:HelperService){
  this.dataSource = new MatTableDataSource(this.circularList);
 }

 ngOnInit()  {
  this.isLoading=true;
    this.circularService.getCircularListByProjectIdByOrgId({ organizationId: this.activeOrgId }, '')
           .pipe(finalize(() => this.isLoading = false))
           .subscribe((data: any) => {
             if (data) {
              this.circularList = data;
              this.dataSource = new MatTableDataSource(this.circularList);
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

}
