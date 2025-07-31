import {AfterViewInit, Component, Inject, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { finalize, Subscription, take } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManageCosComponent } from '../manage-cos/manage-cos.component';
import { CosInterfaceService } from '@app/shared/services/external/cos-interface.service';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { DialogOperation } from '@app/shared/models/constant.config';
import { untilDestroyed } from '@app/core/until-destroyed';
import { ViewLetterDetailsComponent } from '../../letters/view-letter-details/view-letter-details.component';

@Component({
  selector: 'app-cos-info-summary',
  standalone: false,
  templateUrl: './cos-info-summary.component.html',
  styleUrl: './cos-info-summary.component.scss'
})
export class CosInfoSummaryComponent {
  cosList:any[]= [];
  public data: any;
  isLoading = true;
  displayedColumns: string[] = ['serial','coscode', 'initiatedate','amount',  'approveddate','cosstatus','letters'];
  dataSource!: MatTableDataSource<any[]>;

  readonly dialog = inject(MatDialog);
  private subscription: Subscription = new Subscription();

   private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '700px', 
    disableClose: false,
    data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,private sessionService : SessionService,private cosService:CosInterfaceService,
    private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService : NotifyBarService) { 
      this.data = data || {};       
    this.dataSource = new MatTableDataSource(this.cosList);
  }

  ngOnInit()  {  
    if(this.data.element){
      this.subscription = this.cosService.getCOSSummary(this.data.element, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
        if (response && response.success) {
          this.cosList = response.data;
          this.dataSource = new MatTableDataSource(this.cosList);               
          this.updateTable(this.cosList);          
        }
      });
    }
  }  
  

  ngOnDestroy(): void {
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
    config.minWidth='75vw';
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element:{id:data}
    };
    this.dialog.open(ViewLetterDetailsComponent,config);
  }
}


