import { ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  title: string='Add';
  vehicleForm: FormGroup = new FormGroup({});
  vehicleList:any[]=[];
  totalkm:number=0;
  totalamount:number=0;
  projectName:any;
  deleteVehicle=false;
  isBtnClicked=false;
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
      projectid :[],
      companyid :[],
      vehicleid:[, Validators.required],
      ownername:[],
      monthandyear:[],
      enddate:[],
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
      else
        this.isLoading=false;
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
    this.isBtnClicked=true;  
    let formsValue=this.vehicleForm.value;
    formsValue.project=this.projectName;
    formsValue.vehiclename= this.vehicleList.find(x=>x.id== this.vehicleForm.get('vehicleid')?.value).name;
    formsValue.vehicleno= this.vehicleList.find(x=>x.id== this.vehicleForm.get('vehicleid')?.value).number;  
    if (this.isEdit) {
      this.vehicleBillingService.updateVehicleBilling(this.vehicleForm.value, '')
        .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false; })).subscribe({
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
      this.vehicleBillingService.createVehicleBilling(this.vehicleForm.value, '')
        .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false; })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            formsValue.id=response.data.id;
            this.dialogRef.close({ value: this.vehicleForm.value, valid: true });
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
    this.vehicleForm.patchValue({monthandyear:data.format()});   
  }

    getMonthandYear(data:any){
      if(data){
        return {month:moment(data).format('MMMM'),year :moment(data).format('YYYY')};
      }
      return {month:'-',year:'-'};
    } 
}




