import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { finalize, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CosInterfaceService } from '@app/shared/services/external/cos-interface.service';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { ManageContactComponent } from '../manage-contact/manage-contact.component';
import { ContactInterfaceService } from '@app/shared/services/external/contact-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { untilDestroyed } from '@app/core/until-destroyed';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  contactList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','contacttype', 'name',  'designationname','contactno','email','branchname','address','action'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  readonly dialog = inject(MatDialog);
  private subscription: Subscription = new Subscription();

   private defaultdialogoptions:  MatDialogConfig = {      
        disableClose: false,
        data: {},
      };

  constructor(private sessionService : SessionService,private contactService: ContactInterfaceService,
      private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService:NotifyBarService){     
       this.dataSource = new MatTableDataSource(this.contactList);
    }

    ngOnInit()  {
      this.subscription = this.sessionService.projectEntitySubject$.pipe(untilDestroyed(this)).subscribe((response:any)=>{
        let contactURL=this.contactService.getContactListByProjectIdAndOrgId({}, '');
        if(response && response.projectId) {
          contactURL=this.contactService.getContactListByProjectIdAndOrgId({ id: response.projectId }, '')
        }
        contactURL.pipe(finalize(() => this.isLoading = false))
          .subscribe((response: any) => {
            if (response && response.success) {
              this.contactList = response.data;
              this.dataSource = new MatTableDataSource(this.contactList);               
              this.updateTable(this.contactList);             
            }
        });
      });
  }

  ngOnDestroy(): void {
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
    import() {
     const config = this.defaultdialogoptions;
          config.minWidth='75vw';
            config.data = {
              pageGuid: this.route.snapshot.data['pageGuid'],
              type: this.route.snapshot.data['type'], 
              template_type: TemplateType.CONTACT   
            };
              this.dialog.open(UploadFileComponent,config);
    }
    export() {
      
    }
    
    add(){
        const config = this.defaultdialogoptions;
        config.data = {
          pageGuid: this.route.snapshot.data['pageGuid'],
          type: this.route.snapshot.data['type'],    
        };
        config.minWidth='60vw';
        const dialogRef = this.dialog.open(ManageContactComponent, config);
        dialogRef.afterClosed().subscribe((data:any) => {
          if (data && data.valid) {
            this.notifyBarService.showsnackbar('The Contact created successfully.');
            this.addRowData(data.value);
          }
          else {
            //this.router.navigate(['../'], { relativeTo: this.route });
          }
        });
  }
  edit_contact(row:any){
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: 'edit',  
      element:row  
    };
    config.minWidth='60vw';
    const dialogRef = this.dialog.open(ManageContactComponent, config);
    dialogRef.afterClosed().subscribe((data:any) => {
      if (data && data.valid) {
        this.notifyBarService.showsnackbar('The Contact updated successfully.');
        this.updateRowData(data.value);
      }
      else {
        //this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }
  delete_contact(row:any){
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: 'delete', 
      element:row   
    };
    config.minWidth='45vw';
    const dialogRef = this.dialog.open(ManageContactComponent, config);
    dialogRef.afterClosed().subscribe((data:any) => {
      if (data && data.valid) {
        this.notifyBarService.showsnackbar('The Contact removed successfully.');
        this.deleteRow(data.value); 
      }
      else {
        //this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }
  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element){
    element.id = data.id;
    element.projectid=data.projectid,
    element.typeid=data.typeid,
    element.type=data.type,
    element.branchid =data.branchid,
    element.branch =data.branch,
    element.designationid=data.designationid,
    element.designation=data.designation,
    element.name=data.name,
    element.phoneno=data.phoneno,
    element.email=data.email,
    element.address=data.address,
    element.alternatephoneno=data.alternatephoneno,
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(data: any) {
    const data1:any = {
      id: data.id,
      projectid:data.projectid,
      typeid:data.typeid,
      type:data.type,
      branchid :data.branchid,
      branch :data.branch,
      designationid:data.designationid,
      designation:data.designation,
      name:data.name,
      phoneno:data.phoneno,
      email:data.email,
      address:data.address,
      alternatephoneno:data.alternatephoneno,
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

