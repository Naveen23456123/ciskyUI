import { Component ,ElementRef,Inject, ViewChild} from '@angular/core';
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
  imageURL='';
  imageFile:any;
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
            if(!response.data.imageaddress)
              this.imageURL="assets/images/internal/no-user.png";    
            else    
             this.imageURL=response.data.imageaddress;
          }
        }
      })
    }
  }

  onfileUploaded(data: any) {    
    if(data){
      this.imageURL=data.base64;
      this.imageFile= data.file;
    }
  }
  saveImage(){
    let formData = new FormData();   
    formData.append('id', this.empId);
    formData.append('file', this.imageFile); 
    console.log(formData.entries())
    this.employeeService.uploadEmployeeImage(formData,'').subscribe((response:any)=>{
       if(response){

       }
    })
  }
}
