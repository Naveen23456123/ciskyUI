import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InsuranceInterfaceService } from '@app/shared/services/external/insurance-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { id } from '@swimlane/ngx-charts';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-insurance',
  standalone: false,
  templateUrl: './manage-insurance.component.html',
  styleUrl: './manage-insurance.component.scss'
})
export class ManageInsuranceComponent {
  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  insForm: FormGroup = new FormGroup({});
  deleteIns=false;
  subCompanyList:{value:string,text:string}[] = [];
  isClicked=false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageInsuranceComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private notifibarservice: NotifyBarService, private insuranceService:InsuranceInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteIns = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Insurance';
        break;
      case 'delete':
        this.title = 'Delete Insurance';
        break;
      case 'edit':
        this.title = 'Edit Insurance';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.insForm = this.formbuilder.group({ 
      id: [''],
      projectid :[],
      insurancename:[, Validators.required],
      companyname:[, Validators.required],
      amount:[, Validators.required],
      policynumber:[, Validators.required],
      startdate:[, Validators.required],
      enddate:[, Validators.required],
      file:[, Validators.required],
      docaddress:[]
    });
    
    if (this.isEdit || this.deleteIns) {
      this.setCompanyForm(this.data.element);
    }
    this.isLoading=false;
  }
  filedata(fileData:any) { 
    this.insForm.patchValue({file:fileData});
   }
  setCompanyForm(data: any) {
    this.insForm.patchValue({     
      id: data.id,
      projectid :data.projectid,
      insurancename:data.insurancename,
      companyname:data.companyname,
      amount:data.amount,
      policynumber:data.policynumber,
      startdate:data.startdate,
      enddate:data.enddate,
      docaddress:data.docaddress
    });
    const control = this.insForm.get('file');
    control?.clearValidators();     
    control?.updateValueAndValidity();
  }

  submit(){   
    this.isClicked=true;
    let formData = new FormData(); 
    formData.append('insurancename', this.insForm.controls['insurancename']?.value);
    formData.append('companyname', this.insForm.controls['companyname']?.value);
    formData.append('amount', this.insForm.controls['amount']?.value);
    formData.append('policynumber', this.insForm.controls['policynumber']?.value);

    formData.append('file', this.insForm.controls['file']?.value);
    
    if (this.isEdit) {
      this.insuranceService.updateInsurance(this.insForm.value, '')
        .pipe(finalize(() => { this.isLoading = this.isClicked= false; })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
              this.dialogRef.close({ value: this.insForm.value, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.sessionservice.workingProjectSubject$.subscribe((response:any)=>{
        this.insForm.patchValue({projectid:response.id});
      });       
        formData.append('projectid', this.insForm.controls['projectid']?.value);
        formData.append('startdate', this.insForm.controls['startdate']?.value?.toISOString());
        formData.append('enddate', this.insForm.controls['enddate']?.value?.toISOString());
        this.insForm.value.id=null;
        this.insuranceService.createInsurance(formData, '')
          .pipe(finalize(() => { this.isLoading = this.isClicked= false; })).subscribe({
            next:(response: any) => {
              if (response && response.success)  {
                this.insForm.controls["id"].setValue(response.data.id);
                this.insForm.controls["docaddress"].setValue(response.data.docaddress);
                this.dialogRef.close({ value: this.insForm.value, valid: true });
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
      this.insuranceService.deleteInsurance({id:this.insForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.insForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}

