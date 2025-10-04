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
import moment from 'moment';
import { debounceTime, distinctUntilChanged, filter, finalize, forkJoin, Observable, of, skip, startWith, switchMap } from 'rxjs';
import { combineLatest } from 'rxjs';

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
  isSunday=false;
  minDate:any;
  maxDate:any;
  purposeList:any =[];
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageVehcileLogComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private vehicleLogService: VehicleLogInterfaceService, private vehicleService : VehicleInterfaceService,
    private employeeService: EmployeeInterfaceService,private notifyBarService:NotifyBarService,
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
      issunday: [false, Validators.required],
      isnight: [false, Validators.required],
      extrahours: [''],
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
        this.vehicledate= this.data.element.useddate;
        //this.projectChange();
      }
      else{
        this.isLoading=false;
        this.empInit=true;
      }
      this.purposeList = this.vehicleForm.get('purposeandplace')?.valueChanges
        .pipe(debounceTime(300), distinctUntilChanged(),filter(value => value && value.length > 3), 
          switchMap(value => this.fetchOptions(value)) 
        )
      .subscribe((response:any)=>{
          if(response && response.success){
            this.purposeList= response.data;
          }
      });
    } else {
      this.vehicleno= this.data.element.vehiclenumber;
      this.vehicledate= this.data.element.useddate;
      this.vehicleForm.patchValue({id:this.data.element.id});
      this.isLoading=false;
    }
    this.vehicleForm.valueChanges.subscribe(values => {
      const { initialreading, endreading } = values;
      setTimeout(() => {
        this.totalKm = (parseFloat(endreading) || 0) - (parseFloat(initialreading) || 0);
      });
    });
    combineLatest([
    this.vehicleForm.get('projectid')!.valueChanges.pipe(startWith(this.vehicleForm.get('projectid')!.value)),
    this.vehicleForm.get('vehicleid')!.valueChanges.pipe(startWith(this.vehicleForm.get('vehicleid')!.value)),
    this.vehicleForm.get('useddate')!.valueChanges.pipe(startWith(this.vehicleForm.get('useddate')!.value))
    ])
    .pipe(
      filter(([projectId, vehicleId, usedDate]) => !!projectId && !!vehicleId && !!usedDate),
      switchMap(([projectId, vehicleId, usedDate]) =>
        this.vehicleLogService.ValidateLogByDate({ vehicleid: vehicleId, datetime: usedDate }, '')
      )
    )
    .subscribe((response: any) => {
      const control = this.vehicleForm.get('useddate');
       const skipValidator = this.isEdit && new Date(control?.value).getDate() == new Date(this.vehicledate).getDate();
      
    if (!skipValidator && response?.success && !response.data) {
        control?.setValidators([
          Validators.required,
          this.validatorService.dateAlreadyUsedValidator([control.value])
        ]);
      } else {
        // keep only required if not duplicate
        control?.setValidators([Validators.required]);
      }
      control?.updateValueAndValidity({ emitEvent: false });
    });
    this.vehicleForm.get('useddate')?.valueChanges.subscribe(date => {
      if (date) {
        this.isSunday = new Date(date).getDay() === 0;
      } else {
        this.isSunday = false;
      }
    });
  }
  vehicleChange(){
    this.vehicleForm.patchValue({
      useddate:''
    });
     let vehicleId =  this.vehicleForm.get('vehicleid')?.value;
     if(vehicleId){
      let item= this.vehicleList.find((x:any)=>x.id==vehicleId);
      if(item){
        this.minDate= item.startdate;
        this.maxDate= item.enddate;
      }
     }
  }
  ngOnDestroy(){
    
  }

  private fetchOptions(query: string): Observable<unknown> {
    if (!query) return of([]);
    return this.vehicleLogService.getVehiclePurposeByProjectId({
      searchkey:this.vehicleForm.get('purposeandplace')?.value,
      projectid:this.vehicleForm.get('projectid')?.value
    },'');
  }
  projectChange(data:any=null){
    this.empInit=false;
    if(data && data.value){
      this.vehicleForm.patchValue({projectid:data.value.id});
    }
    let projectId = this.vehicleForm.controls['projectid'].value;
    if(projectId){
      forkJoin({
        vehicleAPI:this.vehicleService.getVehiclePartialForLogsProjectId({projectId: projectId},''),
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
      issunday:data.issunday,
      isnight:data.isnight,
      extrahours:data.extrahours,
      totime:data.totime,
      initialreading:data.initialreading,
      initialreadingimage:data.initialreadingimage,
      endreading:data.endreading,
      endreadingimage:data.endreadingimage,
      purposeandplace:data.purposeandplace
    });
    this.isSunday= data.issunday;
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
          if (Array.isArray(value.value)) {
            value.value.forEach(v => formData.append(key, v));  
          } else {
            formData.append(key, value.value);
          }
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
          if(response && response.success){
            formsValue.endimageaddress=response.data.endimageaddress;
            formsValue.initialimageaddress=response.data.initialimageaddress;
            this.dialogRef.close({ value: formsValue, valid: true });
          }
          else{
            this.dialogRef.close({ value: formsValue, valid: false });
            this.notifyBarService.showsnackbar(response.message);
          }
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
            this.notifyBarService.showsnackbar(response.message,true);
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



