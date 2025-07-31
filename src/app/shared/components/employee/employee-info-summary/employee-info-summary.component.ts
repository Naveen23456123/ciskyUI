import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-employee-info-summary',
  standalone: false,
  templateUrl: './employee-info-summary.component.html',
  styleUrl: './employee-info-summary.component.scss'
})
export class EmployeeInfoSummaryComponent {
  employees:any[]= [];
  data:any;
  isLoading = true;
  displayedColumns: string[] = ['serial','name','code', 'designation','type','jdate', 'emailid','phonenumber'];
  dataSource!: MatTableDataSource<any[]>;
  title:string='';
  titleValue:string='';
 constructor(@Inject(MAT_DIALOG_DATA) data: any,private employeeService:EmployeeInterfaceService
 ){
  this.data= data|| {};
  this.dataSource = new MatTableDataSource(this.employees);
 }
 filterChange(event:any){
  if(event){ 
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase()
  }
  else{
    this.dataSource.filter = '';
  }
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
 ngOnInit()  {
  if(this.data){
    this.title= this.data.element.name;
      this.employeeService.searchEmployee({typeid:this.data.element.id, projectid:this.data.element.projectid}, '')
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({next : (response: any) => {
              if (response && response.success) {
                this.employees = response.data;
                this.dataSource = new MatTableDataSource(this.employees);
              }
        }});
    }
}
}

