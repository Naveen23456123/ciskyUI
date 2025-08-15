import { ChangeDetectorRef, Component ,inject,ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
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
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number; 
  filtersObj:any={};
 controlFilter:any={
 };
  private defaultdialogoptions:  MatDialogConfig = {       
    disableClose: false,
    data: {},
  };
  readonly dialog = inject(MatDialog);

  constructor(private route:ActivatedRoute, private letterService:LetterInterfaceService,
    private cosService:CosInterfaceService, private eotService:EotInterfaceService,
    private cdr:ChangeDetectorRef
  ){

  }
  ngOnInit(){
   this.letterService.getAllLetters({},'').pipe(finalize(()=> this.isLoading=false))
   .subscribe((response:any)=>{
    if(response && response.success)
      this.letterDataSource = new MatTableDataSource(response.data);
   })

  }
  ngAfterViewInit(){
    this.cdr.detectChanges(); 
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
  onTabChange(event: MatTabChangeEvent) {
    this.searchObj= {
      projectid:'',
      companyid:'',   
      relatedtoid:'',
      statusid:'',
      startdate:'',
      enddate:''
    };
  }
  searchObj:any={
    projectid:'',
    companyid:'',   
    relatedtoid:'',
    statusid:'',
    startdate:'',
    enddate:''
  };
  clear(){
    this.searchObj={
    projectid:'',
    companyid:'',   
    relatedtoid:'',
    statusid:'',
    startdate:'',
    enddate:''
  };
    this.filter();
  }
  projectChange(data:any){ 
    this.searchObj.projectid= data.value ?? '';
    this.filter();
  } 
  compChange(data:any){
    this.searchObj.companyid= data.value ?? '';
    this.searchObj.projectid= data.projectid ?? '';
    this.filter();
  }
  relatedChange(data:any){
    this.searchObj.relatedtoid= data.value ?? '';
    this.filter();
  }
  approvalStatusChange(data:any){
    this.searchObj.statusid= data.value ?? '';
    this.filter();
  }
  startDateChange(data:any){
    this.searchObj.startdate= data.value ?? '';
    this.filter();
  }
  endDateChange(data:any){
    this.searchObj.enddate= data.value ?? '';
    this.filter();
  }
  dataChange(data:any){
    this.searchObj.date= data.value ?? '';
    this.filter();
  }
  anyChange(data:any){
    if(data && data.value){ 
      //this.dataSource.filter = data.value.trim().toLowerCase()
    }
    else{
     // this.dataSource.filter = '';
    }
  } 
  dateRangeChange(data:any){
    if(data){
      this.searchObj.startdate= data.start ?? '';
      this.searchObj.enddate= data.end ?? '';
    }
    this.filter();
  }

  filter(){
    this.filtersObj= {...this.searchObj};  
  //   this.isSearchLoading=true;
  //   this.letterService.searchLetters(this.searchObj, '')
  //   .pipe(finalize(() =>{ this.isLoading = false; this.isSearchLoading=false;}))
  //   .subscribe((response: any) => {
  //     if (response && response.success) {
  //       this.lettersList = response.data;
  //       this.dataSource = new MatTableDataSource(this.lettersList);               
  //       this.updateTable(this.lettersList);                
  //     }
  // }); 

  }
  update_filter(data:any){
    this.controlFilter= { ...data.value};
   console.log(this.controlFilter);
   this.cdr.detectChanges();
  }

}
