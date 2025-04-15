import { Component,Type,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '@app/employee-control/employee.service';
import { HelperService } from '@app/shared/services/helper.service';
import { SiteControlService } from '@app/site-control/site-control.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {

  employeecomponentData!: Type<any>;

 constructor(private employeeService:EmployeeService){ 
 }

 ngOnInit()  {
  this.employeecomponentData= this.employeeService.getEmployeeListComponent().component;
  }


}

