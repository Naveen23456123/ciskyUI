import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { finalize, take } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CosInterfaceService } from '@app/shared/services/external/cos-interface.service';
import { EotInterfaceService } from '@app/shared/services/external/eot-interface.service';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { LetterType } from '@app/shared/models/constant.config';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { AttachLetterComponent } from '@app/shared/components/letters/attach-letter/attach-letter.component';
import { UploadFileComponent } from '@app/shared/components/upload-file/upload-file.component';
import { StateDataService } from '@app/shared/services/state-data.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-letter-list',
  standalone: false,
  templateUrl: './letter-list.component.html',
  styleUrl: './letter-list.component.scss'
})
export class LetterListComponent {

  lettersList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','letterno','project', 'lettertype','subject','from','to',  'letterdate','status','details','action'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  projectEntity:any;
  isConsultantLetter:boolean=true;
  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '1000px', 
    disableClose: false,
    data: {},
  };
  
  constructor(private sessionService : SessionService,private letterService:LetterInterfaceService,
    private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private stateDataService:StateDataService, private notifyBarService: NotifyBarService){     
      this.dataSource = new MatTableDataSource(this.lettersList);
  }
  
  ngOnInit()  {
    this.stateDataService.stateDataSubject.subscribe((data:any) => {   
      if (data.event == 'letteredit'  && data.valid && data.value) {      
        this.updateRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'letteradd' && data.valid && data.value) {
        this.addRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if(data.event == 'letterdelete' && data.valid && data.value){
        this.deleteRow(data.value.id);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
    });

    this.letterService.getAllLetters({ }, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
        if (response && response.success) {
          this.lettersList = response.data;
          this.dataSource = new MatTableDataSource(this.lettersList);               
          this.updateTable(this.lettersList);                
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
  import() {
    const config = this.defaultdialogoptions;
    config.minWidth='1200px';
    //config.minHeight='600px';
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'], 
      template_type: TemplateType.ALLLETTER   
    };
    this.dialog.open(UploadFileComponent,config);
      
  }
  export() {
        
  }
      
  letter_attach() {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'], 
      letter_type : LetterType.allLetter   
    };
    const dialogRef = this.dialog.open(AttachLetterComponent, config);
    dialogRef.afterClosed().subscribe((data:any) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'letteradd', valid: true, msg: 'The milestone created successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
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
        element.lettertype=data.lettertype,
        element.letternumber= data.letternumber,
        element.letterdate=data.letterdate,
        element.subject=data.subject,
        element.status=data.status,
        element.letterfrom=data.letterfrom, 
        element.letterto=data.letterto,     
        element.remarks=data.remarks,
        element.associatedletterids=data.associatedletterids,
        this.dataSource._updateChangeSubscription();
      }
  }
  addRowData(data: any) {    
    const data1:any = {
      id:data.id,
      project:data.project,
      lettertype:data.lettertype,
      letternumber: data.letternumber,
      letterdate:data.letterdate,
      subject:data.subject,
      status:data.status,
      letterfrom:data.letterfrom, 
      letterto:data.letterto,     
      remarks:data.remarks,
      associatedletterids:data.associatedletterids,
    }      
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription(); 
  }

  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
}
  
  