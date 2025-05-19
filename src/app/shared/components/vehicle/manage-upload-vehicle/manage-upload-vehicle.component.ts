import { Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '@app/shared/services/common.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { VehicleInterfaceService } from '@app/shared/services/external/vehicle-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-manage-upload-vehicle',
  standalone: false,
  templateUrl: './manage-upload-vehicle.component.html',
  styleUrl: './manage-upload-vehicle.component.scss'
})
export class ManageUploadVehicleComponent {

  allColumnsData:any;
  errors:any[]=[];
  isImporting:boolean=false;

  constructor(@Optional() private dialogRef: MatDialogRef<ManageUploadVehicleComponent>,private vehicleService:VehicleInterfaceService, private sessionService:SessionService,
    private commonService:CommonService, private commonIntService:CommonInterfaceService
  ){

  }
  ngOnInit(){
   
    this.allColumnsData = this.vehicleService.getTemplateColumnList();
   
  }
  importing(data:any){
    this.isImporting=true;
    let vehicleData=data.map((item:any) => ({ ...item }));
    const fixedKMValid = vehicleData.filter((item:any) => isNaN(Number(item.fixedkm)));
    if(fixedKMValid.length > 0)
      this.insertErrors('Kindly provide the correct value for Fixed Km.');
    const fbaValid = vehicleData.filter((item:any) => isNaN(Number(item.fixedbillamount)));
    if(fbaValid.length > 0)
      this.insertErrors('Kindly provide the correct value for Fixed Bill AMount.');
    const eaValid = vehicleData.filter((item:any) => isNaN(Number(item.extraamountafterfixedkm)));
    if(eaValid.length > 0)
      this.insertErrors('Kindly provide the correct value for Extra amount after fixed km');
    const kmplValid = vehicleData.filter((item:any) => isNaN(Number(item.kmperliter)));
    if(kmplValid.length > 0)
      this.insertErrors('Kindly provide the correct value for km per liter.');
    const nameValid = vehicleData.filter((item:any) => item.name=='');
    if(nameValid.length > 0)
      this.insertErrors('Kindly provide the Vehicle Name.');
    const numberValid = vehicleData.filter((item:any) => item.number=='');
    if(numberValid.length > 0)
      this.insertErrors('Kindly provide the Vehicle Number.');
   

    if(this.errors.length == 0){
      this.vehicleService.createBulkVehicles(vehicleData, '')
        .pipe(finalize(() => { this.isImporting = false; })).subscribe({
          next:(response: any) => {             
            if (response && response.success)  {
              vehicleData.forEach((element:any) => {
                let item= response.data.find((x:any)=>x.projectcode==element.project);
                element.id= item.id;
                element.project= item.projectname; 
                element.projectid= item.projectid;                                       
              });
              this.dialogRef.close({ value: vehicleData, valid: true });
          } else {              
            this.dialogRef.close({ value: null, valid: false });
          }
        },
        error: (err: any) => {
            this.errors = [...this.errors,err.error.error.message];
          }
      });
    }
    else
      this.isImporting=false;
}
  insertErrors(message:any){
    this.errors = [...this.errors, message];
  }
}

