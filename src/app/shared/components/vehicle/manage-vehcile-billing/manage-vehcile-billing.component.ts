import { ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApprovalStatus } from '@app/shared/models/constant.config';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { VehicleBillingInterfaceService } from '@app/shared/services/external/vehicle-billing-interface.service';
import { VehicleInterfaceService } from '@app/shared/services/external/vehicle-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import moment from 'moment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-vehcile-billing',
  standalone: false,
  templateUrl: './manage-vehcile-billing.component.html',
  styleUrl: './manage-vehcile-billing.component.scss'
})
export class ManageVehcileBillingComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  message:any='';
  title: string='Add';
  vehicleForm: FormGroup = new FormGroup({});
  vehicleList:any[]=[];
  totalkm:number=0;
  totalamount:number=0;
  projectName:any;
  deleteVehicle=false;
  isBtnClicked=false;
  isAllProject = new FormControl(true);
  isAllVehicle = new FormControl(true);
  isProjectrequired:boolean=false;
  isAllVehicleDisabled=false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageVehcileBillingComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private vehicleBillingService: VehicleBillingInterfaceService,private cdRef: ChangeDetectorRef,
    private projectService: ProjectInterfaceService, private vehicleService:VehicleInterfaceService){
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
        this.title = 'New Vehicle Billing';
        break;
      case 'delete':
        this.title = 'Delete Vehicle Billing';
        break;
      case 'edit':
        this.title = 'Edit Vehicle Billing';
        break;
    }
  }

  openFromIcon(timepicker: { open: () => void }) {    
      timepicker.open();
  
  }

  ngOnInit(){    
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.vehicleForm = this.formbuilder.group({ 
      id: [''],
      projectid :[,Validators.required],
      companyid :[],
      statusid:[],
      vehicleid:[,Validators.required],
      ownername:[],
      moduleid:[this.data.pageGuid],
      monthandyear:[],
      enddate:[,Validators.required],
      extrakm:[],
      currentkm:[],
      fixedkm:[],
      extraamountperkmafterfixedkm:[],
      fixedamount:[]
    });
    if(!this.deleteVehicle){     
      if (this.isEdit) {
        this.setVehicleForm(this.data.element);
        this.projectChange();
      }
      else{
        this.isLoading=false;
        this.setValidation();
      }
    }
    else {
      this.isLoading=false;
      this.vehicleForm.patchValue({
        id:this.data.element.id
      })
    }
  }

  ngAfterViewInit() {    
    this.cdRef.detectChanges(); // ✅ Forces Angular to update
  }  
  onProjecttoggleChange(event:any){
    this.isAllProject.setValue(event.checked);
    if(this.isAllProject.value)
      this.isAllVehicle.setValue(event.checked);
    this.isAllVehicleDisabled= event.checked;
    this.setValidation();
  }
  onvehicletoggleChange(event:any){
    this.isAllVehicle.setValue(event.checked);
    this.setValidation();
  }
  handleControls(){

  }
  projectChange(data:any=null){
    console.log(data);    
    if(data && data.value){
      this.projectName=data.value.projectshortname;
      this.vehicleForm.patchValue({
        projectid:data.value.id,
        companyid:data.value.companyid
      });
    }
    let projectId = this.vehicleForm.controls['projectid'].value;
    if(projectId){
      this.vehicleService.getVehiclePartialDetailsByProjectId({projectId: projectId},'')
      .pipe(finalize(()=> this.isLoading=false)).subscribe((response:any)=>{
        if(response && response.success)
          this.vehicleList= response.data;
      });
      if(this.vehicleForm.controls['vehicleid'].value != this.data?.element?.vehicleid)
        this.resetVehicleInfo();     
    }
  }

  resetVehicleInfo(){
    this.vehicleForm.patchValue({       
      fixedkm:0,
      extraamountperkmafterfixedkm:0,
      fixedamount:0,
      extrakm:0
    });
    this.totalkm=this.totalamount=0;
  }

  vehicleChange(){
    let vehicle = this.vehicleList.find((x:any)=>x.id== this.vehicleForm.controls['vehicleid'].value);
    if(vehicle) {
      this.vehicleForm.patchValue({       
        fixedkm:vehicle.fixedkm,
        extraamountperkmafterfixedkm:vehicle.extraamountafterfixedkm,
        fixedamount:vehicle.fixedbillamount
      });
      this.onExtraChange();
    }
  }

  setVehicleForm(data: any) {    
    this.vehicleForm.patchValue({
      id: data.id,
      projectid :data.projectid,
      vehicleid:data.vehicleid,
      ownername:data.ownername,
      monthandyear:data.monthandyear,
      enddate:data.enddate,
      extrakm:data.extrakm,
      currentkm:data.currentkm,
      fixedkm:data.fixedkm,
      extraamountperkmafterfixedkm:data.extraamountperkmafterfixedkm,
      fixedamount:data.fixedamount
    });
    this.onExtraChange();
  }

  onExtraChange() {
    let extrakm= this.vehicleForm.controls['extrakm'].value;
    this.totalkm = parseFloat(this.vehicleForm.controls['fixedkm'].value) + parseInt(extrakm==null?0:extrakm);
    let fixedAmt= this.vehicleForm.controls['fixedamount'].value;
    this.totalamount = parseFloat(fixedAmt ==null ? 0: fixedAmt) +
    (parseFloat(this.vehicleForm.controls['extraamountperkmafterfixedkm'].value)* parseFloat(extrakm==null?0:extrakm));
  }

  submit(){ 
    this.message=null;
    this.isBtnClicked=true;  
    let formsValue=this.vehicleForm.value;
    this.bulkBillingObj={};    
    if (this.isEdit) {
      formsValue.project=this.projectName;
      formsValue.vehiclename= this.vehicleList.find(x=>x.id== this.vehicleForm.get('vehicleid')?.value).name;
      formsValue.vehicleno= this.vehicleList.find(x=>x.id== this.vehicleForm.get('vehicleid')?.value).number;  
      this.vehicleBillingService.updateVehicleBilling(this.vehicleForm.value, '')
        .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false; })).subscribe({
          next: (response:any) => {
            formsValue.enddate=this.vehicleForm.controls['enddate'].value;
            (this.vehicleForm.controls['monthandyear'].value).toISOString();
            formsValue.monthandyear=this.vehicleForm.controls['monthandyear'].value.toISOString();
            console.log(formsValue);
          if(response && response.success)
            this.dialogRef.close({ value: formsValue, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.sessionservice.approvalStatusSubject$.subscribe((response:any)=>{
        if(response){
          this.vehicleForm.patchValue({statusid:response.find((x:any)=>x.name.toLowerCase()==ApprovalStatus.PENDING)?.id});
        }
      })
      this.bulkBillingObj.monthandyear=this.vehicleForm.get('monthandyear')?.value;
      this.bulkBillingObj.statusid=this.vehicleForm.get('statusid')?.value;
      this.bulkBillingObj.moduleid=this.data.pageGuid;
      if(this.isAllVehicle.value && this.isAllProject.value){
        this.bulkBillingObj.allproject=true;
        this.bulkBillingObj.allvehicle=true;
        this.generateBilling();
      }
      else if (!this.isAllProject.value && this.isAllVehicle.value){
        this.bulkBillingObj.allproject=false;
        this.bulkBillingObj.projectid=this.vehicleForm.get('projectid')?.value;
        this.bulkBillingObj.companyid=this.vehicleForm.get('companyid')?.value;
        this.bulkBillingObj.allvehicle=true;
        this.generateBilling();
      }
      else{
        formsValue.project=this.projectName;
        formsValue.vehiclename= this.vehicleList.find(x=>x.id== this.vehicleForm.get('vehicleid')?.value).name;
        formsValue.vehicleno= this.vehicleList.find(x=>x.id== this.vehicleForm.get('vehicleid')?.value).number;  
        this.vehicleForm.value.id=null;
        this.vehicleBillingService.createVehicleBilling(this.vehicleForm.value, '')
          .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false; })).subscribe({
            next:(response: any) => {
            if (response && response.success) {
              formsValue.id=response.data.id;
              formsValue.currentkm= response.data.currentkm;
              formsValue.levels= response.data.levels;
              this.dialogRef.close({ value: formsValue,bulk:false, valid: true });
            } else {
             this.message= response.message;
            }
          },
           error: (err: any) => {
              this.dialogRef.close(err);
            }
        });
      }
    }
  }
  bulkBillingObj:any={};
  generateBilling(){
    this.vehicleBillingService.generateBulkVehicleBilling(this.bulkBillingObj, '')
    .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false; })).subscribe({
      next:(response: any) => {
      if (response && response.success) {
        this.dialogRef.close({ value: response.data,bulk:true, valid: true });
      } else {
       this.message= response.message;
      }
    },
     error: (err: any) => {
        this.dialogRef.close(err);
      }
  });  
  }
  setValidation(){
    const pcontrol = this.vehicleForm.get('projectid');
    const vcontrol = this.vehicleForm.get('vehicleid');
    const dcontrol = this.vehicleForm.get('enddate');
    pcontrol?.clearValidators(); 
    vcontrol?.clearValidators(); 
    dcontrol?.clearValidators();     
    this.isProjectrequired=!(this.isAllProject.value?? true);
    if(this.isProjectrequired)
      pcontrol?.setValidators([Validators.required]); 
    if(!this.isAllVehicle.value)
      vcontrol?.setValidators([Validators.required]); 
    if(!this.isAllVehicle.value)
      dcontrol?.setValidators([Validators.required]); 
      
    dcontrol?.updateValueAndValidity();
    pcontrol?.updateValueAndValidity();
    vcontrol?.updateValueAndValidity();

    const invalidControls = this.findInvalidControls(this.vehicleForm);
    console.log('Invalid Controls:', invalidControls);
    
  }
  findInvalidControls(form: FormGroup): string[] {
    const invalid:any = [];
  
    const recurse = (formGroup: FormGroup | FormArray, path = '') => {
      Object.keys(formGroup.controls).forEach(controlName => {
        const control = formGroup.get(controlName);
  
        const controlPath = path ? `${path}.${controlName}` : controlName;
  
        if (control instanceof FormGroup || control instanceof FormArray) {
          recurse(control, controlPath);
        } else if (control && control.invalid) {
          invalid.push(controlPath);
        }
      });
    };
  
    recurse(form);
  
    return invalid;
  }
  delete() {
      this.vehicleBillingService.deleteVehicleBilling({id:this.vehicleForm.value.id}, '')
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
  dateChange(data:any){
    this.vehicleForm.patchValue({monthandyear:data});   
  }

    getMonthandYear(data:any){
      if(data){
        return {month:moment(data).format('MMMM'),year :moment(data).format('YYYY')};
      }
      return {month:'-',year:'-'};
    } 
}




