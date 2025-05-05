import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { finalize } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MilestoneInterfaceService } from '@app/shared/services/external/milestone-interface.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { DialogOperation } from '@app/shared/models/constant.config';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { ViewLetterDetailsComponent } from '../../letters/view-letter-details/view-letter-details.component';
import { CommonService } from '@app/shared/services/common.service';

@Component({
  selector: 'app-explore-milestone',
  standalone: false,
  templateUrl: './explore-milestone.component.html',
  styleUrl: './explore-milestone.component.scss'
})
export class ExploreMilestoneComponent {
  milestones:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','name', 'milestonedate', 'day','status','actual','reschd','letters'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {       
        disableClose: false,
        data: {},
      };

  constructor(private sessionService : SessionService,private milestoneService:MilestoneInterfaceService,
      private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService:NotifyBarService, private commonService:CommonService){     
       this.dataSource = new MatTableDataSource(this.milestones);
    }

    ngOnInit()  {
      this.milestoneService.getAllMilestonesDetailsByOrdIdProjectId({ }, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
        if (response && response.success) {
         this.milestones = response.data;
         this.dataSource = new MatTableDataSource(this.milestones);               
         this.updateTable(this.milestones);
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
              config.minWidth='75vw';
                config.data = {
                  pageGuid: this.route.snapshot.data['pageGuid'],
                  type: this.route.snapshot.data['type'], 
                  template_type: TemplateType.MILESTONE   
                };
      this.dialog.open(UploadFileComponent,config);
    }
    export() {
      
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
  getDays(sDate:any,eDate:any){
    return this.commonService.getDaysDifference(sDate,eDate);
  }
}

