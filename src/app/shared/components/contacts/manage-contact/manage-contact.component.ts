import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { ContactInterfaceService } from '@app/shared/services/external/contact-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-manage-contact',
  standalone: false,
  templateUrl: './manage-contact.component.html',
  styleUrl: './manage-contact.component.scss'
})
export class ManageContactComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  contactForm: FormGroup = new FormGroup({});
  deleteContact=false;
  activeOrgId='123';
  contactTypeList:any[] = [];
  branchList:any[] = [];
  designationList:any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageContactComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private notifibarservice: NotifyBarService, private commonService:CommonInterfaceService,
  private contactService:ContactInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteContact = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Contact';
        break;
      case 'delete':
        this.title = 'Delete Contact';
        break;
      case 'edit':
        this.title = 'Edit Contact';
        break;
    }
  }

  ngOnInit(){  
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.contactForm = this.formbuilder.group({ 
      id: [''],
      projectid:[],
      typeid:[''],
      branchid :[],
      designationid:[''],
      name:[''],
      phoneno:[''],
      email:[''],
      address:[''],
      alternatephoneno:[],  

    });

    forkJoin({
      conBrnachAPI: this.commonService.getOfficeTypeList({ organizationId: this.activeOrgId }, ''),
      desgAPI : this.commonService.getCommonDesignationList({ organizationId: this.activeOrgId }, ''),
      conTypeAPI : this.commonService.getContactTypeList({ organizationId: this.activeOrgId }, '')
    })
    .pipe(finalize(() => { this.isLoading = false }))
    .subscribe((response:any) => {
      if(response && response.conTypeAPI.success)
        this.contactTypeList = response.conTypeAPI.data;         
      if(response && response.desgAPI.success)
        this.designationList=response.desgAPI.data;        
      if(response && response.conBrnachAPI.success)
       this.branchList= response.conBrnachAPI.data;
    }); 

    if (this.isEdit || this.deleteContact) {
      this.setCompanyForm(this.data.element);
    }
   
    this.isLoading=false;
  }

  setCompanyForm(data: any) {
    this.contactForm.patchValue({
      id: data.id,
      projectid:data.projectid,
      typeid:data.typeid,
      branchid :data.branchid,
      designationid:data.designationid,
      name:data.name,
      phoneno:data.phoneno,
      email:data.email,
      address:data.address,
      alternatephoneno:data.alternatephoneno, 
    });
  }

  submit(){   
    let formvalue= this.contactForm.value;   
    formvalue.branch=this.branchList.find(x=>x.id==this.contactForm.get('branchid')?.value).name;
    formvalue.designation=this.designationList.find(x=>x.id==this.contactForm.get('designationid')?.value).name;
    formvalue.type=this.contactTypeList.find(x=>x.id==this.contactForm.get('typeid')?.value).name;
    this.sessionservice.projectEntitySubject$.subscribe((response:any)=>{
      if(response){
        this.contactForm.patchValue({projectid:response.projectId})
      }
    })
    if (this.isEdit) {
      this.contactService.updateConsultantContact(this.contactForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next: (response:any) => {
          if(response && response.success)
            this.dialogRef.close({ value: formvalue, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.contactForm.value.id=null;
      this.contactService.createConsultantContact(this.contactForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            formvalue.id=response.data.id;            
            this.dialogRef.close({ value: formvalue, valid: true });
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
      this.contactService.deleteConsultantContact({id:this.contactForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.contactForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}

