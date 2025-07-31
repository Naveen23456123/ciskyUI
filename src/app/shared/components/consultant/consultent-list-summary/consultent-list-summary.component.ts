import { Component, Inject, ViewChild, inject} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { finalize, take } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';

@Component({
  selector: 'app-consultent-list-summary',
  standalone: false,
  templateUrl: './consultent-list-summary.component.html',
  styleUrl: './consultent-list-summary.component.scss'
})
export class ConsultentListSummaryComponent {
  public data: any;
 projectList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','project', 'engineer', 'role','lead', 'jv','share','association', 'contact'];
  dataSource!: MatTableDataSource<any[]>;
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {    
        disableClose: false,
        data: {},
      };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,private projectService:ProjectInterfaceService,
    private notifyBarService:NotifyBarService){  
      this.data = data || {};   
       this.dataSource = new MatTableDataSource(this.projectList);
    }

  ngOnInit()  {  
    if(this.data.element){   
      this.projectService.getProjectListSummary(this.data.element, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((insResponse: any) => {
      if (insResponse && insResponse.success) {
        this.projectList = insResponse.data;
        this.dataSource = new MatTableDataSource(this.projectList);               
        this.updateTable(this.projectList);                  
        }
      });
    }
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
   
}



