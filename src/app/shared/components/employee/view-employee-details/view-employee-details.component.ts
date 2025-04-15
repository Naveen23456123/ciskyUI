import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-view-employee-details',
  standalone: false,
  templateUrl: './view-employee-details.component.html',
  styleUrl: './view-employee-details.component.scss'
})
export class ViewEmployeeDetailsComponent {  
  
  isLoading=true;
  empDetails:any;
  empId!:any;
  constructor(private employeeService: EmployeeInterfaceService, private route:ActivatedRoute){
    this.empId = this.route.snapshot.paramMap.get('empId');
  }

  ngOnInit(){
   
    if(this.empId ){
     this.employeeService.getSiteEmployeeDetailsById({id:this.empId},'')
     .pipe(take(1), finalize(()=>this.isLoading=false))
      .subscribe((response:any)=>{
        if(response && response.success){
          if(response.data) {
            this.empDetails = response.data;         
          }
        }
      })
    }
  }
}
