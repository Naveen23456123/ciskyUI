import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CircularInterfaceService } from '@app/shared/services/external/circular-interface.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import moment from 'moment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-circular',
  standalone: false,
  templateUrl: './manage-circular.component.html',
  styleUrl: './manage-circular.component.scss'
})
export class ManageCircularComponent {
  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  circularForm: FormGroup = new FormGroup({});
  deleteCircular=false;
  typeList:any[] = [];
  isBtnClicked=false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageCircularComponent>, private formbuilder: FormBuilder,
    private commonService: CommonInterfaceService,  private router: Router,
    private circularService: CircularInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteCircular = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Circular';
        break;
      case 'delete':
        this.title = 'Delete Circular';
        break;
      case 'edit':
        this.title = 'Edit Circular';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.circularForm = this.formbuilder.group({ 
      title: [''],
      type:[],
      date:[''],
      description:[''],
      id :[],
      file:[]
    });
    this.commonService.getCircularTypes().subscribe((response:any)=>{
      if(response && response.success){
        this.typeList= response.data;
      }
    })
    if (this.isEdit || this.deleteCircular) {
      this.setCircularForm(this.data.element);
    }
   
    this.isLoading=false;
  }

  fileUploded(data:any){
    if(data)
      this.circularForm.patchValue({file:data});
  }
  setCircularForm(data: any) {    
    this.circularForm.patchValue({
      id:data.id,
      title:data.title,
      date:data.date,
      description:data.description,
      type:data.type
    });
  }

  submit(){   
    let formsValue= this.circularForm.value;    
    this.isBtnClicked=true;
    let formData = new FormData(); 
    Object.entries(this.circularForm.controls).forEach(([key, value]) => {
      if(key!='date'){          
        if (value.value != null) {
          formData.append(key, value.value);
        } else {
          formData.delete(key);
        }
      }  
    });    
    formData.append('date', moment(this.circularForm.controls['date']?.value).toISOString());
    formData.append('type', this.typeList.find((x:any)=>x.id== this.circularForm.value.type)?.name);
    if (this.isEdit) { 
      this.circularService.updateCircular(formData, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next: (response:any) => {
          if(response && response.success){
            formsValue.attachmentaddress=response.data.attachmentaddress;
            this.dialogRef.close({ value: formsValue, valid: true });
          }
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.circularForm.value.id=null;  
      this.circularService.createCircular(formData, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            formsValue.id=response.data.id;
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
      this.circularService.deleteCircular({id:this.circularForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.circularForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}
