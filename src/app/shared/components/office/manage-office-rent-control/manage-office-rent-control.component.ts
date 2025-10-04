import { Component, Inject, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '@app/shared/services/common.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { OfficeInterfaceService } from '@app/shared/services/external/office-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SiteControlInterfaceService } from '@app/shared/services/external/site-control-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { ValidatorService } from '@app/shared/services/validator.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-manage-office-rent-control',
  standalone: false,
  templateUrl: './manage-office-rent-control.component.html',
  styleUrl: './manage-office-rent-control.component.scss'
})
export class ManageOfficeRentControlComponent {
 public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  rentForm: FormGroup = new FormGroup({});
  deleteRent=false;
  showTDS=false;
  tdsAmount=0;
  tdsPercentage=10;
  totalAmount=0;
  projectName='';
  isBtnClicked=false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageOfficeRentControlComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,private validatorService:ValidatorService,
    private notifibarservice: NotifyBarService, private commonService:CommonService,
  private projectService:ProjectInterfaceService, private officeRentService:OfficeInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteRent = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Office Rent';
        break;
      case 'delete':
        this.title = 'Delete Office Rent';
        break;
      case 'edit':
        this.title = 'Edit Office Rent';
        break;
    }
  }
  
  ngOnInit(){    
   
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.rentForm = this.formbuilder.group({ 
      id: [''],
      companyid:[],
      projectid :[,Validators.required],
      officename:[,Validators.required],
      officelocation :[,Validators.required],
      basicamount:[,Validators.required],
      tdspercentage:[this.tdsPercentage],
      agreementduration:['',Validators.required],
      agreementstartdate:['',Validators.required],
      agreementenddate:[,Validators.required],
      ownername:[,Validators.required],
      bankname:[,Validators.required],
      accountholdername:[,Validators.required],
      accountnumber:[,Validators.required],
      ifsccode:[,[Validators.required, this.validatorService.IfscCode]],
      panno:[,[Validators.required, this.validatorService.PanNo]],
      gstno:[,[Validators.required, this.validatorService.GstNo]],
      phoneno:[,[Validators.required, this.validatorService.PhoneNumber]],
      address:[],
      files: this.formbuilder.array([])
    });
    this.rentForm.valueChanges.subscribe(values => {
      const { agreementstartdate, agreementenddate,agreementduration } = values;   
      this.rentForm.get('agreementenddate')?.setValue(this.commonService.addMonths(agreementstartdate,+agreementduration), { emitEvent: false });   
      //this.rentForm.get('agreementduration')?.setValue(this.commonService.getMonthsDifference(agreementstartdate,agreementenddate), { emitEvent: false });
    });
    if(!this.deleteRent){
      let apiCalls: any = {};

      if(this.isEdit)
        apiCalls.rentAPI= this.officeRentService.getOfficeRentsById({id:this.data.element.id},'');
      else
        this.addDocControls();

      forkJoin(apiCalls)
      .pipe(finalize(() => { this.isLoading = false }))
      .subscribe((response:any) => {
       
        if(response.rentAPI && response.rentAPI.success){
          if (this.isEdit ) {
            this.data.element= response.rentAPI.data;
            this.setOfficeRentForm(this.data.element);
            this.projectChange();
          }
        } 
      });
      
    }
    else{
      this.setOfficeRentForm(this.data.element);
      this.isLoading = false;
    }
  }

  get files() {
    return this.rentForm.get('files') as FormArray;
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
    (this.rentForm.controls['files'] as FormArray).at(index).patchValue({
      name:value
    });
  }

  fileUploded(file:any,index:number){      
    (this.rentForm.get('files') as FormArray).at(index).patchValue({
      file:file
    });
  }

  removeDocControl(index: number) {
    this.files.removeAt(index);
  }

  onAmountChangeEvent(){
    var amount= +this.rentForm.get('basicamount')?.value;
    this.showTDS=amount>19999;
    if(this.showTDS){
      this.rentForm.patchValue({tdspercentage:this.tdsPercentage});
     var percent= +this.rentForm.get('tdspercentage')?.value;
     this.tdsAmount= (amount*percent)/100;
     this.totalAmount= amount + this.tdsAmount;
    }
    else{
      this.rentForm.patchValue({tdspercentage:0});
     this.tdsAmount= 0;
     this.totalAmount= amount ;
    }
  }

  setOfficeRentForm(data: any) {    
    this.rentForm.patchValue({
      id: data.id,
      projectid :data.projectid,
      basicamount:data.basicamount,
      officename :data.officename,
      officelocation:data.officelocation,
      tdspercentage:data.tdspercentage,
      agreementduration:data.agreementduration,
      agreementstartdate:data.agreementstartdate,
      agreementenddate:data.agreementenddate,
      ownername:data.ownername,
      bankname:data.bankname,
      accountholdername:data.accountholdername,
      accountnumber:data.accountnumber,
      ifsccode:data.ifsccode,
      panno:data.panno,
      gstno:data.gstno,
      phoneno:data.phoneno,
      address:data.address,   
    });
    this.onAmountChangeEvent();
  }

  projectChange(data:any=null){
    console.log(data);
    if(data && data.value){
      console.log(data);
      this.rentForm.patchValue({
        projectid:data.value.id,
        companyid:data.value.companyid
    });
      this.projectName= data.value.projectshortname;
    } 
  }

  submit(){
    this.isBtnClicked=true; 
    let formData = new FormData(); 
    Object.entries(this.rentForm.controls).forEach(([key, value]) => {
      if(key!='files' && key!='agreementstartdate' && key!='agreementenddate' ){          
        if (value.value != null) {
          formData.append(key, value.value);
        } else {
          formData.delete(key);
        }
      }
    });
    
    let formsValue= this.rentForm.value;
    formsValue.totalamount= this.totalAmount;
    formsValue.projectname= this.projectName;  
    if (this.isEdit) {
      this.officeRentService.updateOfficeRent(this.rentForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked=false })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
              this.dialogRef.close({ value: this.rentForm.value, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      formData.append('agreementstartdate', this.rentForm.controls['agreementstartdate']?.value.toISOString());
      formData.append('agreementenddate', this.rentForm.controls['agreementenddate']?.value?.toISOString()); 
      this.rentForm.value.id=null;
      this.rentForm.controls['files']?.value?.forEach((item:any, index:any) => {                
        formData.append(`files[${index}].name`, item.name);
        formData.append(`files[${index}].file`, item.file);
      });
      
      this.officeRentService.createOfficeRent(formData, '')
        .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked=false })).subscribe({
          next:(response: any) => {
            if (response && response.success)  {
              formsValue.id= response.data.id;
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
      this.officeRentService.deleteOfficeRent({id:this.rentForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.rentForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}


