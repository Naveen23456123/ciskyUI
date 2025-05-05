import { Component ,inject,ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ViewLetterDetailsComponent } from '@app/shared/components/letters/view-letter-details/view-letter-details.component';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-explore-letters',
  standalone: false,
  templateUrl: './explore-letters.component.html',
  styleUrl: './explore-letters.component.scss'
})
export class ExploreLettersComponent {
  isLoading=false;
  dataSource!: MatTableDataSource<any[]>;
  letterdisplayedColumns: string[] = ['serial','letterno', 'lettertype','subject',  'letterdate','status','view'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number; 
 
  private defaultdialogoptions:  MatDialogConfig = {       
    disableClose: false,
    data: {},
  };
  readonly dialog = inject(MatDialog);

  constructor(private route:ActivatedRoute, private letterService:LetterInterfaceService
  ){

  }
  ngOnInit(){
   this.letterService.getAllLetters({},'').pipe(finalize(()=> this.isLoading=false))
   .subscribe((response:any)=>{
    if(response && response.success)
      this.dataSource = new MatTableDataSource(response.data);
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

