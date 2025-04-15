import { HttpClient } from '@angular/common/http';
import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from '@app/core/http/http.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { ConsultantAccountInterfaceService } from '@app/shared/services/external/consultant-account-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-manage-consultant-account',
  standalone: false,
  templateUrl: './manage-consultant-account.component.html',
  styleUrl: './manage-consultant-account.component.scss'
})
export class ManageConsultantAccountComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  consultantForm: FormGroup = new FormGroup({});
  deleteConAcc=false;
  isClicked=false;
  subCompanyList:{id:string,name:string}[] = [];
  accountTypeList:{id:string,name:string}[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageConsultantAccountComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private notifibarservice: NotifyBarService, private consultantAccountService:ConsultantAccountInterfaceService,
    private commonService:CommonInterfaceService,
    private subCompanyService:SubCompanyInterfaceService, private http:HttpClient){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit')
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteConAcc = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Consultant Account';
        break;
      case 'delete':
        this.title = 'Delete Consultant Account';
        break;
      case 'edit':
        this.title = 'Edit Consultant Account';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type); 
    forkJoin({
        accountType: this.commonService.getAccountTypeList({},''),
        subCompany: this.subCompanyService.getSubCompanyListByOrgId({}, '')
    }).pipe(finalize(() => { this.isLoading = false })).subscribe((response: any) => {
       if(response.accountType)
         this.accountTypeList = response.accountType.data;         
       if(response.accountType)
         this.subCompanyList= response.subCompany.data;
    });
    
    this.consultantForm = this.formbuilder.group({ 
      companyId:['', Validators.required],
      bankName:['', Validators.required],
      accountNo:['', Validators.required],
      ifscCode:['', Validators.required],
      accTypeId:['', Validators.required],
      panNo:['', Validators.required],
      gstNo:['', Validators.required],
      bankAddress:['', Validators.required],
      id :[],
      file:[,Validators.required],
      docAddress:['']
    });
    
    if (this.isEdit || this.deleteConAcc) {
      this.setconsultantForm(this.data.element);
    }
  }
  filedata(fileData:any) { 
   this.consultantForm.patchValue({file:fileData});
  }
  setconsultantForm(data: any) {    
    this.consultantForm.patchValue({
      id:data.id,
      companyId:data.companyid,
      accTypeId:data.acctypeid,
      bankName : data.bankname,
      accountNo : data.accountno,
      ifscCode : data.ifsccode,
      panNo : data.panno,
      gstNo : data.gstno,
      bankAddress : data.bankaddress
    });
    if(this.isEdit){
      const controls = ['companyId','accTypeId', 'file'];
      controls.forEach((controlName) => {
        const control = this.consultantForm.get(controlName);  
          control?.clearValidators();     
          control?.updateValueAndValidity();
      });
    }
  }

  submit(){ 
    this.isClicked=true;
    let formData = new FormData();   
    formData.append('companyId', this.consultantForm.controls['companyId']?.value);
    formData.append('accTypeId', this.consultantForm.controls['accTypeId']?.value);
    formData.append('bankName', this.consultantForm.controls['bankName']?.value);
    formData.append('accountNo', this.consultantForm.controls['accountNo']?.value);
    formData.append('ifscCode', this.consultantForm.controls['ifscCode']?.value);
    formData.append('panNo', this.consultantForm.controls['panNo']?.value);
    formData.append('gstNo', this.consultantForm.controls['gstNo']?.value);
    formData.append('bankAddress', this.consultantForm.controls['bankAddress']?.value);
    formData.append('file', this.consultantForm.controls['file']?.value);
    
    if (this.isEdit) {
      formData.append('id', this.consultantForm.controls['id']?.value);
      this.consultantAccountService.updateConsultantAccount(formData, '')
        .pipe(finalize(() => { this.isLoading = this.isClicked= false; })).subscribe({
          next: (response:any) => {
          if(response && response.success)
            this.dialogRef.close({ value: this.consultantForm.value, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.consultantForm.value.id=null;
      this.consultantAccountService.createConsultantAccount(formData, '')
        .pipe(finalize(() => { this.isLoading = this.isClicked= false; })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            this.consultantForm.controls["id"].setValue(response.data.id);
            this.consultantForm.controls["docAddress"].setValue(response.data.docaddress);
            this.dialogRef.close({ value: this.consultantForm.value, valid: true });
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
      this.consultantAccountService.deleteConsultantAccount({id:this.consultantForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.consultantForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}
