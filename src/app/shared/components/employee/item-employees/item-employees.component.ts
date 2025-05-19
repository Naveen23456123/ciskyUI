import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-item-employees',
  standalone: false,
  templateUrl: './item-employees.component.html',
  styleUrl: './item-employees.component.scss'
})
export class ItemEmployeesComponent {
  employees:any[]= [];
  data:any;
  isLoading = true;
  displayedColumns: string[] = ['serial','project', 'employee','type'];
  dataSource!: MatTableDataSource<any[]>;
 itemName:string='';
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
  console.log(this.data);
  if(this.data){
  this.itemName= this.data.element.name;
    let param= { itemid:this.data.element.id  }; 
      this.employeeService.getSiteEmployeeUsingItem(param, '')
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

