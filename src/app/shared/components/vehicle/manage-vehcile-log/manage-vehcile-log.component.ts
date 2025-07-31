import { ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { VehicleInterfaceService } from '@app/shared/services/external/vehicle-interface.service';
import { VehicleLogInterfaceService } from '@app/shared/services/external/vehicle-log-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { ValidatorService } from '@app/shared/services/validator.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-manage-vehcile-log',
  standalone: false,
  templateUrl: './manage-vehcile-log.component.html',
  styleUrl: './manage-vehcile-log.component.scss'
})
export class ManageVehcileLogComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  vehicleForm: FormGroup = new FormGroup({});
  employeeList:any[]=[];
  vehicleList:any[]=[];
  empInit=false;
  deleteVehicle=false;
  vehicleno='';
  vehicledate='';
  isBtnClicked=false;
  totalKm=0;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageVehcileLogComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private vehicleLogService: VehicleLogInterfaceService, private vehicleService : VehicleInterfaceService,
    private employeeService: EmployeeInterfaceService,
    private cdr:ChangeDetectorRef, private validatorService:ValidatorService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('500px');
      this.deleteVehicle = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Vehicle Log';
        break;
      case 'delete':
        this.title = 'Delete Vehicle Log';
        break;
      case 'edit':
        this.title = 'Edit Vehicle Log';
        break;
    }
  }

  openFromIcon(timepicker: { open: () => void }) {    
      timepicker.open();
  
  }
  ngAfterViewInit(){
    this.cdr.detectChanges();
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.vehicleForm = this.formbuilder.group({ 
      id: [],
      projectid :[,Validators.required],
      vehicleid:[,Validators.required],
      employeeids:[,Validators.required],
      useddate:[,Validators.required],
      fromtime:[,Validators.required],
      totime:[, [Validators.required, this.validatorService.timeGreaterThan('fromtime')]],
      initialreading:[,Validators.required],
      initialreadingimage:[],
      endreading:[,[Validators.required, this.validatorService.greaterThan('initialreading')]],
      endreadingimage:[],
      purposeandplace:[,Validators.required],
      initialfile:[],
      endfile:[]
    });
    if(!this.deleteVehicle){
      if (this.isEdit) {      
        this.setVehicleForm(this.data.element);
        this.projectChange();
      }
      else{
        this.isLoading=false;
        this.empInit=true;
      }

    } else {
      this.vehicleno= this.data.element.vehiclenumber;
      this.vehicledate= this.data.element.useddate;
      this.vehicleForm.patchValue({id:this.data.element.id});
      this.isLoading=false;
    }
    this.vehicleForm.valueChanges.subscribe(values => {
      const { initialreading, endreading } = values;
      const total = (parseFloat(endreading) || 0) - (parseFloat(initialreading) || 0);
      this.totalKm= total;
    });
  }
  ngOnDestroy(){
    
  }

  projectChange(data:any=null){
    this.empInit=false;
    if(data && data.value){
      this.vehicleForm.patchValue({projectid:data.value.id});
    }
    let projectId = this.vehicleForm.controls['projectid'].value;
    if(projectId){
      forkJoin({
        vehicleAPI:this.vehicleService.getVehiclePartialDetailsByProjectId({projectId: projectId},''),
        empAPI:this.employeeService.getSiteEmployeeParital({projectId: projectId},'')
      }).pipe(untilDestroyed(this), finalize(()=> this.isLoading=false))
      .subscribe((response:any)=>{
       if(response && response.vehicleAPI.success)
         this.vehicleList= response.vehicleAPI.data;      
       if(response && response.empAPI.success){
         this.employeeList= response.empAPI.data.map((item:any)=>({
          id:item.id,
          name:item.code+ ' - '+item.name        
         }));
         this.empInit=true;
       }
      })
    }
  }

  setVehicleForm(data: any) {    
    this.vehicleForm.patchValue({
      id: data.id,
      projectid :data.projectid,
      vehicleid:data.vehicleid,
      employeeids:data.employeeids,
      useddate:data.useddate,
      fromtime:data.fromtime,
      totime:data.totime,
      initialreading:data.initialreading,
      initialreadingimage:data.initialreadingimage,
      endreading:data.endreading,
      endreadingimage:data.endreadingimage,
      purposeandplace:data.purposeandplace
    });
  }

  empSelect(event:any){
    if(event.value){
      this.vehicleForm.patchValue({employeeids:event.value.map((item:any)=>item.id)});  
    }
  }

  initFileUploded(data:any){ 
    if(data)
      this.vehicleForm.patchValue({initialfile:data.file});
  }
  endFileUploded(data:any){   
    if(data)   
      this.vehicleForm.patchValue({endfile:data.file});
  }
  
  submit(){   
    let formsValue= this.vehicleForm.value;
    formsValue.vehiclename= this.vehicleList.find(x=>x.id== this.vehicleForm.get('vehicleid')?.value).name;
    formsValue.vehiclenumber= this.vehicleList.find(x=>x.id== this.vehicleForm.get('vehicleid')?.value).number;   
    this.isBtnClicked=true;
    let formData = new FormData(); 
    Object.entries(this.vehicleForm.controls).forEach(([key, value]) => {
      if(key!='useddate'){          
        if (value.value != null) {
          formData.append(key, value.value);
        } else {
          formData.delete(key);
        }
      }         
    });    
    formData.append('useddate', new Date(this.vehicleForm.controls['useddate']?.value).toISOString());
    if (this.isEdit) {
      this.vehicleLogService.updateVehicleLog(formData, '')
        .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false; })).subscribe({
          next: (response:any) => {
          if(response && response.success)
            formsValue.endimageaddress=response.data.endimageaddress;
            formsValue.initialimageaddress=response.data.initialimageaddress;
            this.dialogRef.close({ value: formsValue, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.vehicleForm.value.id=null;      
      this.vehicleLogService.createVehicleLog(formData, '')
        .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false; })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            formsValue.id=response.data.id;
            formsValue.endimageaddress=response.data.endimageaddress;
            formsValue.initialimageaddress=response.data.initialimageaddress;
            this.dialogRef.close({ value: formsValue, valid: true });
          } else {
            this.dialogRef.close({ value: null, valid: false });
          }
        },
         error: (err: any) => {
            this.dialogRef.close(err);
          }
      });
    }
  }

  delete() {
      this.vehicleLogService.deleteVehicleLog({id:this.vehicleForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.vehicleForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}



