import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-view-employee-list',
  standalone: false,
  templateUrl: './view-employee-list.component.html',
  styleUrl: './view-employee-list.component.scss'
})
export class ViewEmployeeListComponent {
  employees:any[]= [];
  data:any;
  isLoading = true;
  displayedColumns: string[] = ['serial','name','code', 'designation','type','jdate', 'emailid','phonenumber'];
  dataSource!: MatTableDataSource<any[]>;

 constructor(@Inject(MAT_DIALOG_DATA) data: any,private employeeService:EmployeeInterfaceService
 ){
  this.data= data|| {};
  this.dataSource = new MatTableDataSource(this.employees);
 }

 ngOnInit()  {
  if(this.data){
    let param;
    if(this.data.type=='desg'){
      param={ desgId:this.data.element.id  };
    }
    else
      param= { comId:this.data.element.id  };

      this.employeeService.getAllEmployeesByOrdId(param, '')
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
