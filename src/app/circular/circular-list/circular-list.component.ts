import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryControlService } from '@app/inventory-control/inventory-control.service';
import { CircularInterfaceService } from '@app/shared/services/external/circular-interface.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-circular-list',
  standalone: false,
  templateUrl: './circular-list.component.html',
  styleUrl: './circular-list.component.scss'
})
export class CircularListComponent {
  circularList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','title','publishdate','description','file','action'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
 @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!:number;
  subscription:Subscription = new Subscription();
  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private circularService:CircularInterfaceService,private helperService:HelperService,
  private notifyBarService:NotifyBarService, private stateDataService:StateDataService
 ){
  this.dataSource = new MatTableDataSource(this.circularList);
 }

 ngOnInit()  {
  this.isLoading=true;
  this.subscription= this.stateDataService.stateDataSubject.subscribe((data:any) => {   
      if (data.event == 'circedit'  && data.valid && data.value) {      
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'circadd' && data.valid && data.value) {
        this.addRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if(data.event == 'circdelete' && data.valid && data.value){
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
    });
    this.circularService.getCircularListByOrgId({ organizationId: this.activeOrgId }, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
        if (response && response.success) {
        this.circularList =response.data;
        this.updateTable(this.circularList);
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private updateTable(info: any) {
    this.circularList = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.resultsLength= this.circularList.length;   
  }

  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
      if(element){
        element.id=data.id;
        element.title=data.title;
        element.type= data.type;
        element.date= data.date;
        element.description=data.description;
        if(data.attachmentaddress){
          console.log(data.attachmentaddress);
          element.attachmentaddress=data.attachmentaddress
        }
        this.dataSource._updateChangeSubscription();
      }
  }
  addRowData(data: any) {
    const data1:any = {
      id:data.id,
      title:data.title,
      type:data.type,
       date:data.date,
      attachmentaddress: data.attachmentaddress,
      description:data.description,
    }      
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription(); 
  }

  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
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
}
