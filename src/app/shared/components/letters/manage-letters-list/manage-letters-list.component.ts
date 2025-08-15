import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { finalize, Subscription, take } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AttachLetterComponent } from '../attach-letter/attach-letter.component';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { DialogOperation, LetterEntity, LetterType } from '@app/shared/models/constant.config';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { untilDestroyed } from '@app/core/until-destroyed';
import { ViewLetterDetailsComponent } from '../view-letter-details/view-letter-details.component';
import { GenerateCsvService } from '@app/shared/services/generate-csv.service';


@Component({
  selector: 'app-letters-list',
  standalone: false,
  templateUrl: './manage-letters-list.component.html',
  styleUrl: './manage-letters-list.component.scss'
})
export class ManageLettersListComponent {
  lettersList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','letterno', 'lettertype','subject',  'letterdate','status','action'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  projectEntity:any;
  title='';
  isConsultantLetter:boolean=true;
  readonly dialog = inject(MatDialog);
  private subscription: Subscription = new Subscription();

   private defaultdialogoptions:  MatDialogConfig = {       
        disableClose: false,
        data: {},
      };

  constructor(private sessionService : SessionService,private letterService:LetterInterfaceService,
      private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService:NotifyBarService, private csvService:GenerateCsvService){     
       this.dataSource = new MatTableDataSource(this.lettersList);
    }

  ngOnInit()  {
    this.subscription= this.sessionService.projectEntitySubject$.pipe(untilDestroyed(this)).subscribe((entityData)=>{ 
       if(entityData) {  
        this.isConsultantLetter= entityData.isConsultant;
        this.title = this.isConsultantLetter ? 'Consultant ' : 'Contractor'; 
          this.letterService.getLettersByProjectIdAndContractorId({ 
            projectId: entityData.projectId,
            contractorId: entityData.isConsultant? '': entityData.contractorId??'' 
          }, '')
          .pipe(finalize(() => this.isLoading = false))
          .subscribe((response: any) => {
            if (response && response.success) {
             this.lettersList = response.data;
             this.dataSource = new MatTableDataSource(this.lettersList);               
             this.updateTable(this.lettersList);
             this.isLoading=true;
            }
          });
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
    import() {
    const config = this.defaultdialogoptions;
          config.minWidth='1200px';
          //config.minHeight='600px';
            config.data = {
              pageGuid: this.route.snapshot.data['pageGuid'],
              type: this.route.snapshot.data['type'], 
              template_type: TemplateType.CONTRACTORLETTER   
            };
              this.dialog.open(UploadFileComponent,config);
    
    }
  export(){
    if(this.lettersList && this.lettersList.length>0)
      this.csvService.downloadFile(this.lettersList,this.letterService.getCSVTemplateColumnList(),'Letters');
  }
    
  add_letter() {
    const config = this.defaultdialogoptions;
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: DialogOperation.ADD, 
        letter_entity:LetterEntity.CONTRACTOR
      };
      config.minWidth='1200px';
      const dialogRef = this.dialog.open(AttachLetterComponent, config);
      dialogRef.afterClosed().subscribe((data:any) => {
      if (data && data.valid) {
        this.notifyBarService.showsnackbar('The letter created successfully.');
        this.addRowData(data.value);
      }
      else {
        //this.router.navigate(['../'], { relativeTo: this.route });
        }
      });
  }
  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
      if(element){
        element.id=data.id,
        element.projectid=data.projectid,
        element.lettertypeid=data.lettertypeid,
        element.letternumber= data.letternumber,
        element.letterdate=data.letterdate,
        element.subject=data.subject,      
        element.status=data.status,  
        element.lettertype=data.lettertype,    
        element.letterfrom=data.letterfrom, 
        element.letterto=data.letterto,     
        element.remarks=data.remarks,
        element.associatedletterids=data.associatedletterids,
        element.replybyid=data.replybyid, 
        this.dataSource._updateChangeSubscription();
      }
  }
  addRowData(data: any) {    
    const data1:any = {
      id:data.id,
      projectid:data.projectid,
      letternumber: data.letternumber,
      letterdate:data.letterdate,
      subject:data.subject,
      letterfrom:data.letterfrom, 
      status:data.status,
      lettertype:data.lettertype,
      letterto:data.letterto,     
      remarks:data.remarks,
      associatedletterids:data.associatedletterids,
      replybyid:data.replybyid,
    }      
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription(); 
  }

  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  editLetter(data:any){
  this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.EDIT,
      element: data,
      letter_type:LetterType.allLetter,
      letter_entity:LetterEntity.CONTRACTOR
    };
    this.defaultdialogoptions.minWidth='1200px';
    const dialogRef = this.dialog.open(AttachLetterComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        this.notifyBarService.showsnackbar('The Letter updated successfully.');
        this.updateRowData(data.value);
      }
      else {
        //this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });
  }
  deleteLetter(data:any){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.DELETE,
      element: data,
      letter_type:LetterType.allLetter
    };
    this.defaultdialogoptions.minWidth='700px';
    const dialogRef = this.dialog.open(AttachLetterComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        this.notifyBarService.showsnackbar('The Letter Removed successfully.');
        this.deleteRow(data.value.id);
      }
      else {
        //this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });
  }
  viewletter(data:any){
    const config = this.defaultdialogoptions;
    config.minWidth='1200px';
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element:{id:data}
    };
    this.dialog.open(ViewLetterDetailsComponent,config);
  }
}

