import {AfterViewInit, Component, Inject, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { finalize, Subscription, take } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AttachLetterComponent } from '../attach-letter/attach-letter.component';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { DialogOperation, LetterEntity, LetterType } from '@app/shared/models/constant.config';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { untilDestroyed } from '@app/core/until-destroyed';
import { ViewLetterDetailsComponent } from '../view-letter-details/view-letter-details.component';

@Component({
  selector: 'app-letter-info-summary',
  standalone: false,
  templateUrl: './letter-info-summary.component.html',
  styleUrl: './letter-info-summary.component.scss'
})
export class LetterInfoSummaryComponent {
  public data: any;
  lettersList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','letterno', 'lettertype','subject',  'letterdate','status','action'];
  dataSource!: MatTableDataSource<any[]>;
  ownerName='';
  lettertype='';
  title='';
  isConsultantLetter:boolean=true;
  readonly dialog = inject(MatDialog);
  private subscription: Subscription = new Subscription();

   private defaultdialogoptions:  MatDialogConfig = {       
        disableClose: false,
        data: {},
      };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,private sessionService : SessionService,private letterService:LetterInterfaceService,
      private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService:NotifyBarService){    
      this.data = data || {};    
       this.dataSource = new MatTableDataSource(this.lettersList);
    }

  ngOnInit()  {
    if(this.data.element){   
      this.ownerName=this.data.element.ownername;
      this.lettertype=this.data.element.letterType;

      this.letterService.searchLetters({
        lettertypeid:this.data.element.lettertypeid,
        relatedtoid:this.data.element.relatedtoid
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

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
  
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


