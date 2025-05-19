import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { InventoryControlService } from '@app/inventory-control/inventory-control.service';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { HelperService } from '@app/shared/services/helper.service';
import { SiteControlService } from '@app/site-control/site-control.service';
import { finalize, Subscription } from 'rxjs';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { ManageInsuranceComponent } from '../../insurance/manage-insurance/manage-insurance.component';
import { ManageSiteInventoryComponent } from '../manage-site-inventory/manage-site-inventory.component';
import { DialogOperation } from '@app/shared/models/constant.config';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { untilDestroyed } from '@app/core/until-destroyed';
import { ManageUploadInventoryComponent } from '../manage-upload-inventory/manage-upload-inventory.component';

@Component({
  selector: 'app-manage-inventory-list',
  standalone: false,
  templateUrl: './manage-inventory-list.component.html',
  styleUrl: './manage-inventory-list.component.scss'
})
export class ManageInventoryListComponent {
inventories:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','projectshortname', 'name', 'employeename','description','quantity','rateperitem','purchasedate','action'];
  dataSource!: MatTableDataSource<any[]>;
  activeOrgId='123';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  isProject=false;
  isSearching=false;
  private subscription: Subscription = new Subscription();

  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    disableClose: false,
    data: {},
  };

 constructor(private inventoryService:InventoryControlService,private helperService:HelperService,
  private route: ActivatedRoute, private notifyBarService:NotifyBarService,
  private sessionService:SessionService
 ){
  this.dataSource = new MatTableDataSource(this.inventories);
 }

 ngOnInit()  {
    this.subscription = this.sessionService.projectEntitySubject$.pipe(untilDestroyed(this)).subscribe((response:any)=>{
      let invobj={};     
      if(response && response.projectId) {
        invobj= { pid: response.projectId };
        this.isProject=true;
      }
      this.getInventoryData(invobj);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ngAfterViewInit() {
    if(this.isProject){
      this.displayedColumns=this.displayedColumns.filter(fruit => fruit !== "projectshortname")
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  projectChnage(data:any){
   let invObj={};
   invObj= data.value==''? '': {pid:data.value};
   this.getInventoryData(invObj);
  }

  filterChange(data:any){
    if(data && data.value){ 
      this.dataSource.filter = data.value.trim().toLowerCase()
    }
    else{
      this.dataSource.filter = '';
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  private updateTable(info: any) {
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, 10);
    this.pageSize = this.helperService.getPageSize();
  }

  import(){
    const config = this.defaultdialogoptions;
      config.minWidth='75vw';
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: this.route.snapshot.data['type'], 
        template_type: TemplateType.INVENTORY   
      };
      const dialogRef = this.dialog.open(ManageUploadInventoryComponent,config);
    dialogRef.afterClosed().subscribe((data) => { 
      if (data && data.valid) {
        this.addBulkInventory(data.value);
        this.notifyBarService.showsnackbar('The Inventory created successfully.');
      }
    });
  }
  addBulkInventory(data:any){
    data.forEach((element:any) => {
      this.addRowData(element);
    });
  }
  export(){
  
  }
  getInventoryData(obj:any){
    this.isSearching=true;
    this.inventoryService.getSiteInventoryListByOrgId(obj, '').pipe(finalize(() => {this.isLoading = false; this.isSearching=false;}))
        .subscribe((response: any) => {
          if (response && response.success) {
          this.inventories = response.data;
          this.dataSource = new MatTableDataSource(this.inventories);
          this.pageSize= this.helperService.getPageSize();
          }
        });
  }
  add_inv(){
    const config = this.defaultdialogoptions;
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: DialogOperation.ADD
      };
      config.minWidth='65vw';
    const dialogRef = this.dialog.open(ManageSiteInventoryComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        this.notifyBarService.showsnackbar('The Inventory created successfully.');
        this.addRowData(data.value);
      }
      else {
      }
    });
  }
    
  edit_inv(row:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.EDIT,
      element: row
    };
    this.defaultdialogoptions.minWidth='65vw';
    const dialogRef = this.dialog.open(ManageSiteInventoryComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        this.notifyBarService.showsnackbar('The Inventory updated successfully.');
        this.updateRowData(data.value);
      }
      else {
      }
    });
  }
  delete_inv(row:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.DELETE,
      element: row
    };
    this.defaultdialogoptions.minWidth='45vw';
    const dialogRef = this.dialog.open(ManageSiteInventoryComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        this.notifyBarService.showsnackbar('The Inventory removed successfully.');
        this.deleteRow(data.value);
      }
      else {
      }
    });
  }
  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element){
    element.id = data.id;
    element.projectid= data.projectid,
    element.itemid=data.itemid,
    element.employeeid =data.employeeid,
    element.description=data.description,
    element.quantity=data.quantity,
    element.costperitem=data.costperitem,
    element.purchasedate=data.purchasedate,
    element.project=data.project,
    element.item=data.item,
    element.employee=data.employee
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(data: any) {
    const data1:any = {
      id:data.id, 
      projectid: data.projectid,
      itemid:data.itemid,
      employeeid :data.employeeid,
      description:data.description,
      quantity:data.quantity,
      costperitem:data.costperitem,
      purchasedate:data.purchasedate,
      project:data.project,
      item:data.item,
      employee:data.employee
    }      
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription();
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data.id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
}

