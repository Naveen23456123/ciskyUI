import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BankGuaranteeInterfaceService } from '@app/shared/services/external/bank-guarantee-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-bank-guarantee',
  standalone: false,
  templateUrl: './manage-bank-guarantee.component.html',
  styleUrl: './manage-bank-guarantee.component.scss'
})
export class ManageBankGuaranteeComponent {
  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  bgForm: FormGroup = new FormGroup({});
  deletebg=false;
  isClicked=false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageBankGuaranteeComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private notifibarservice: NotifyBarService, private bgService:BankGuaranteeInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deletebg = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Bank Guarantee';
        break;
      case 'delete':
        this.title = 'Delete Bank Guarantee';
        break;
      case 'edit':
        this.title = 'Edit Bank Guarantee';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.bgForm = this.formbuilder.group({
      id:[],
      projectid:[], 
      bankname: [, Validators.required],
      guaranteenumber :[, Validators.required],
      amount:[, Validators.required],
      guaranteedate:[, Validators.required],
      guaranteeexpirydate:[, Validators.required],
      releasedate:[, Validators.required],
      remark:[],
      file:[, Validators.required],
      docaddress:[]
    });
    
    if (this.isEdit || this.deletebg) {
      this.setCompanyForm(this.data.element);
    }
    this.isLoading=false;
  }
  filedata(fileData:any) { 
    this.bgForm.patchValue({file:fileData});
   }
  setCompanyForm(data: any) {
    this.bgForm.patchValue({
      id:data.id,
      projectid:data.projectid, 
      bankname: data.bankname,
      guaranteenumber :data.guaranteenumber,
      amount:data.amount,
      guaranteedate:data.guaranteedate,
      guaranteeexpirydate:data.guaranteeexpirydate,
      releasedate:data.releasedate,
      remark:data.remark
    });
    const control = this.bgForm.get('file');
    control?.clearValidators();     
    control?.updateValueAndValidity();
  }

  submit(){  
    this.isClicked=true;
    let formData = new FormData(); 
    formData.append('bankname', this.bgForm.controls['bankname']?.value);
    formData.append('guaranteenumber', this.bgForm.controls['guaranteenumber']?.value);
    formData.append('amount', this.bgForm.controls['amount']?.value);    
    formData.append('remark', this.bgForm.controls['remark']?.value);
    formData.append('file', this.bgForm.controls['file']?.value); 
    if (this.isEdit) {
      this.bgService.updateBankGuarantee(this.bgForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
              this.dialogRef.close({ value: this.bgForm.value, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.sessionservice.workingProjectSubject$.subscribe((response:any)=>{
        this.bgForm.patchValue({projectid:response.id});
      });          
      formData.append('guaranteedate', this.bgForm.controls['guaranteedate']?.value.toISOString());
      formData.append('guaranteeexpirydate', this.bgForm.controls['guaranteeexpirydate']?.value?.toISOString());
      formData.append('releasedate', this.bgForm.controls['releasedate']?.value?.toISOString());
       formData.append('projectid', this.bgForm.controls['projectid']?.value);  
        this.bgForm.value.id=null;
        console.log(this.bgForm.value);
        this.bgService.createBankGuarantee(formData, '')
          .pipe(finalize(() => { this.isLoading = false; })).subscribe({
            next:(response: any) => {
              if (response && response.success)  {
                this.bgForm.controls["id"].setValue(response.data.id);
                this.bgForm.controls["docaddress"].setValue(response.data.docaddress);
                this.dialogRef.close({ value: this.bgForm.value, valid: true });
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
      this.bgService.deleteBankGuarantee({id:this.bgForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.bgForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}


