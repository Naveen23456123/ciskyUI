import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { VehicleInterfaceService } from '@app/shared/services/external/vehicle-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-manage-vehcile',
  standalone: false,
  templateUrl: './manage-vehcile.component.html',
  styleUrl: './manage-vehcile.component.scss'
})
export class ManageVehicleComponent implements OnDestroy {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  vehicleForm: FormGroup = new FormGroup({});
  projectList:any[]=[];
  deleteVehicle=false;
  isBtnClicked=false;
  isProject=true;
  projectName='';
  private subscription: Subscription = new Subscription();
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageVehicleComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private notifibarservice: NotifyBarService, private projectService: ProjectInterfaceService,
  private vehicleService:VehicleInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      //this.dialogRef.updateSize('500px');
      this.deleteVehicle = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Vehicle';
        break;
      case 'delete':
        this.title = 'Delete Vehicle';
        break;
      case 'edit':
        this.title = 'Edit Vehicle';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.vehicleForm = this.formbuilder.group({ 
      id: [''],
      projectid :[],
      boqId:[],
      name:[],
      number:[],
      fixedkm:[],
      kmperliter:[],
      fuelprice:[],
      fixedbillamount:[],
      extraamountafterfixedkm:[],
      bankname:[],
      accountholdername:[],
      accountnumber:[],
      mobilenumber:[],
      ifsccode:[],
      pancard:[],
      gstnumber:[],
      address:[],
      files: this.formbuilder.array([])
    });
    if(!this.deleteVehicle){     
      this.subscription =this.sessionservice.projectEntitySubject$.subscribe((entityResponse:any)=>{
        if(entityResponse && entityResponse.projectId){
          this.vehicleForm.patchValue({projectid:entityResponse.projectId});          
          this.projectChange();
        }
        else
          this.isProject=false;
          if (this.isEdit) {
            this.setCompanyForm(this.data.element);
            this.projectName= this.data.element.project;
            this.projectChange();
          }
          else
            this.addDocControls();
          this.isLoading=false;
      });     
   }
   else{    
    this.vehicleForm.patchValue({
      id:this.data.element.id,
      name :this.data.element.name
    });
    this.isLoading=false;
   }
  }

  ngOnDestroy(): void {
    
  }
  setCompanyForm(data: any) {    
    this.vehicleForm.patchValue({
      id:data.id,
      projectid : data.projectid,
      number : data.number,
      name: data.name,
      fixedkm : data.fixedkm,
      kmperliter : data.kmperliter,
      fuelprice : data.fuelprice,
      fixedbillamount: data.fixedbillamount,
      extraamountafterfixedkm : data.extraamountafterfixedkm,
      bankname : data.bankname,
      accountholdername : data.accountholdername,
      accountnumber: data.accountnumber,
      mobilenumber : data.mobilenumber,
      ifsccode : data.ifsccode,
      pancard : data.pancard,
      gstnumber: data.gstnumber,
      address : data.address,
    });
  }
  
  projectChange(data:any=null){
    if(data && data.value){
      this.vehicleForm.patchValue({projectid:data.value.id});
      this.projectName= data.value.projectshortname;
    } 
  }

  get files() {
    return this.vehicleForm.get('files') as FormArray;
  }

  addDocControls() {
    const group = this.formbuilder.group({
      id:[],
      name: ['',Validators.required], 
      file: ['',Validators.required]
    });
    this.files.push(group);
  }

  onDocNameUpdate(value:string, index:number){
    (this.vehicleForm.controls['files'] as FormArray).at(index).patchValue({
      name:value
    });
  }

  fileUploded(file:any,index:number){      
    (this.vehicleForm.get('files') as FormArray).at(index).patchValue({
      file:file
    });
  }

  removeDocControl(index: number) {
    this.files.removeAt(index);
  }

  submit(){  
    this.isBtnClicked=true; 
    let formData = new FormData(); 
    Object.entries(this.vehicleForm.controls).forEach(([key, value]) => {
      if(key!='files'){          
      if (value.value != null) {
        formData.append(key, value.value);
      } else {
        formData.delete(key);
      }
    }
  });
    let formsValue= this.vehicleForm.value;
    formsValue.project= this.projectName;
    if (this.isEdit) {
      this.vehicleForm.controls['files']?.value?.forEach((item:any, index:any) => {                
        formData.append(`files[${index}].name`, item.name);
        formData.append(`files[${index}].file`, item.file);
      });
      formData.append('id', this.vehicleForm.controls['id']?.value);
      this.vehicleService.updateVehicle(formData, '')
        .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
          next: (response:any) => {
          if(response && response.success)
            this.dialogRef.close({ value: formsValue, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.vehicleForm.value.id=null;  
      this.vehicleForm.controls['files']?.value?.forEach((item:any, index:any) => {                
        formData.append(`files[${index}].name`, item.name);
        formData.append(`files[${index}].file`, item.file);
      });
      this.vehicleService.createVehicle(formData, '')
        .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked=false })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            formsValue.id=response.data.id;
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
      this.vehicleService.deleteVehicle({id:this.vehicleForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked=false })).subscribe({
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



