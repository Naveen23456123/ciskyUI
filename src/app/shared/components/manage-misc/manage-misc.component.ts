import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CircularInterfaceService } from '@app/shared/services/external/circular-interface.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { MiscInterfaceService } from '@app/shared/services/external/misc-interface.service';
import moment from 'moment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-misc',
  standalone: false,
  templateUrl: './manage-misc.component.html',
  styleUrl: './manage-misc.component.scss'
})
export class ManageMiscComponent {
 public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  miscForm: FormGroup = new FormGroup({});
  deletemisc=false;
  projectName='';
  isBtnClicked=false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageMiscComponent>, private formbuilder: FormBuilder,
    private commonService: CommonInterfaceService,  private router: Router,
    private miscService: MiscInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.deletemisc = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Miscellaneous';
        break;
      case 'delete':
        this.title = 'Delete Miscellaneous';
        break;
      case 'edit':
        this.title = 'Edit Miscellaneous';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.miscForm = this.formbuilder.group({ 
      projectid: [''],
      name:[],
      monthyear:[''],
      amount:[''],
      id :[],
      file:[]
    });

    if (this.isEdit || this.deletemisc) {
      this.setmiscForm(this.data.element);
    }
   
    this.isLoading=false;
  }
  projectChange(data:any=null){
    if(data && data.value){
      this.projectName= data.value.projectshortname;
      this.miscForm.patchValue({projectid:data.value.id});
    }
  }
  dateChange(data:any){
    this.miscForm.patchValue({monthyear:data});   
  }
  fileUploded(data:any){
    if(data)
      this.miscForm.patchValue({file:data});
  }
  setmiscForm(data: any) {    
    this.miscForm.patchValue({
      id:data.id,
      name:data.name,
      monthyear:data.monthyear,
      amount:data.amount,
      projectid:data.projectid
    });
  }

  submit(){   
    let formsValue= this.miscForm.value;    
    this.isBtnClicked=true;
    let formData = new FormData(); 
    Object.entries(this.miscForm.controls).forEach(([key, value]) => {
      if(key!='monthyear'){          
        if (value.value != null) {
          formData.append(key, value.value);
        } else {
          formData.delete(key);
        }
      }  
    });    
    formData.append('monthyear', moment(this.miscForm.controls['monthyear']?.value).toISOString());
    formData.append('project', this.projectName);
    formsValue.project= this.projectName;
    if (this.isEdit) { 
      this.miscService.updateMiscellaneous(formData, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next: (response:any) => {
          if(response && response.success){
            formsValue.attachmentaddress=response.data.attachmentaddress;
            formsValue.monthyear= moment(this.miscForm.controls['monthyear']?.value).toISOString();
            formsValue.project= this.projectName;
            this.dialogRef.close({ value: formsValue, valid: true });
          }
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.miscForm.value.id=null;  
      this.miscService.createMiscellaneous(formData, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            formsValue.project= this.projectName;
            formsValue.monthyear= moment(this.miscForm.controls['monthyear']?.value).toISOString();
            formsValue.id= response.data.id;
            formsValue.attachmentaddress=response.data.attachmentaddress;
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
      this.miscService.deleteMiscellaneous({id:this.miscForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.miscForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}

