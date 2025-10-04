import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PdfViewerComponent } from '@app/shared/components/pdf-viewer/pdf-viewer.component';
import { MiscInterfaceService } from '@app/shared/services/external/misc-interface.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-misc-list',
  standalone: false,
  templateUrl: './misc-list.component.html',
  styleUrl: './misc-list.component.scss'
})
export class MiscListComponent {
miscList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','project','title','publishdate','description','file','action'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
 @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!:number;
  isSearchLoading=false;
  subscription:Subscription = new Subscription();
  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };

 constructor(private miscService:MiscInterfaceService,private helperService:HelperService,
  private notifyBarService:NotifyBarService, private stateDataService:StateDataService
 ){
  this.dataSource = new MatTableDataSource(this.miscList);
 }

 ngOnInit()  {
  this.isLoading=true;
  this.subscription= this.stateDataService.stateDataSubject.subscribe((data:any) => {   
      if (data.event == 'miscedit'  && data.valid && data.value) {      
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'miscadd' && data.valid && data.value) {
        this.addRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if(data.event == 'miscdelete' && data.valid && data.value){
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
    });
   this.filterMisc();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private updateTable(info: any) {
    this.miscList = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);   
    this.pageSize= this.helperService.getPageSize();
    this.resultsLength= this.miscList.length;   
  }

  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
      if(element){
        element.id=data.id;
        element.name= data.name;
        element.projectid= data.projectid;
        element.monthyear= data.monthyear;
        element.project= data.project;
        element.amount= data.amount;
        if(data.attachmentaddress){
          element.attachmentaddress=data.attachmentaddress
        }
        this.dataSource._updateChangeSubscription();
      }
  }
  addRowData(data: any) {
    const data1:any = {
      id:data.id,
      name:data.name,
      projectid:data.projectid,
       monthyear:data.monthyear,
       project:data.project,
       amount:data.amount,
      attachmentaddress: data.attachmentaddress,
    }
    this.miscList.unshift(data1);
    this.updateTable(this.miscList);
  }

  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  filterChange(data:any){
    if(data && data.value){ 
      this.dataSource.filter = data.value.trim().toLowerCase()
    }
    else{
      this.dataSource.filter = '';
    }
  }
  searchObj:any={
    projectid:'',
  };
  projectChange(data:any){ 
    this.searchObj.projectid= data.value ?? '';
    this.filterMisc();
  } 
  clear(){
    this.searchObj={
     projectid:''
    };
    this.filterMisc();
  }
  anyChange(data:any){
    if(data && data.value){ 
      this.dataSource.filter = data.value.trim().toLowerCase()
    }
    else{
      this.dataSource.filter = '';
    }
  } 

  filterMisc(){
    this.isSearchLoading=true;
    this.miscService.getMiscellaneousListByOrgId(this.searchObj, '')
    .pipe(finalize(() =>{ this.isLoading = false; this.isSearchLoading=false;}))
    .subscribe((response: any) => {
      if (response && response.success) {
        this.miscList = response.data;             
        this.updateTable(this.miscList);
      }
  }); 
  }
  viewPdf(data:any){
    const config = this.defaultdialogoptions;
    config.minWidth='80vw';
    config.data = {
      element:data
    };
    this.dialog.open(PdfViewerComponent,config);
  }
}

