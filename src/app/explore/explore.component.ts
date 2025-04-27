import { Component ,inject,ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LetterService } from '@app/letter-control/letter.service';
import { ViewLetterDetailsComponent } from '@app/shared/components/letters/view-letter-details/view-letter-details.component';
import { CosInterfaceService } from '@app/shared/services/external/cos-interface.service';
import { EotInterfaceService } from '@app/shared/services/external/eot-interface.service';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-explore',
  standalone: false,
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {
  isLoading=false;
  letterDataSource!: MatTableDataSource<any[]>;
  letterdisplayedColumns: string[] = ['serial','letterno', 'lettertype','subject',  'letterdate','status','view'];
  cosdisplayedColumns: string[] = ['serial','coscode', 'initiatedate','amount',  'approveddate','cosstatus','letters'];
  cosdataSource!: MatTableDataSource<any[]>;
  eotdisplayedColumns: string[] = ['serial','eotcode', 'initiatedate','days',  'approveddate','eotstatus','letters'];
  eotdataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number; 
 
  private defaultdialogoptions:  MatDialogConfig = {       
    disableClose: false,
    data: {},
  };
  readonly dialog = inject(MatDialog);

  constructor(private route:ActivatedRoute, private letterService:LetterInterfaceService,
    private cosService:CosInterfaceService, private eotService:EotInterfaceService
  ){

  }
  ngOnInit(){
   this.letterService.getAllLetters({},'').pipe(finalize(()=> this.isLoading=false))
   .subscribe((response:any)=>{
    if(response && response.success)
      this.letterDataSource = new MatTableDataSource(response.data);
   })
   this.cosService.getAllCOSDetailsByOrdIdProjectId({},'').pipe(finalize(()=> this.isLoading=false))
   .subscribe((response:any)=>{
    if(response && response.success)
      this.cosdataSource = new MatTableDataSource(response.data);
   })
   this.eotService.getAllEOTDetailsByOrdIdProjectId({},'').pipe(finalize(()=> this.isLoading=false))
   .subscribe((response:any)=>{
    if(response && response.success)
      this.cosdataSource = new MatTableDataSource(response.data);
   })
  }
  viewletter(data:any){
    const config = this.defaultdialogoptions;
    config.minWidth='1200px';
    config.minHeight= '90vh',
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element:{id:data}
    };
    this.dialog.open(ViewLetterDetailsComponent,config);
  }
}
