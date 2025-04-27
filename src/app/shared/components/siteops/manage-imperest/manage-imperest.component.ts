import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { ImperestInterfaceService } from '@app/shared/services/external/imperest-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { VehicleInterfaceService } from '@app/shared/services/external/vehicle-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-manage-imperest',
  standalone: false,
  templateUrl: './manage-imperest.component.html',
  styleUrl: './manage-imperest.component.scss'
})
export class ManageImperestComponent {

public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  imperestForm: FormGroup = new FormGroup({});
  projectList:any[]=[];
  deleteImperest=false;
  isBtnClicked=false;

  private subscription: Subscription = new Subscription();
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageImperestComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private notifibarservice: NotifyBarService, private projectService: ProjectInterfaceService,
  private imperestService:ImperestInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.deleteImperest = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Imprest';
        break;
      case 'delete':
        this.title = 'Delete Imprest';
        break;
      case 'edit':
        this.title = 'Edit Imprest';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.imperestForm = this.formbuilder.group({ 
      id: [''],
      name :[],
      date:[],
      days:[],
      remarks:[],     
      details: this.formbuilder.array([])
    });
    if(!this.deleteImperest){ 
          if (this.isEdit) {
            this.setCompanyForm(this.data.element);           
          }
          else
            this.addDetailsControls();
          this.isLoading=false;
   }
   else{    
    this.imperestForm.patchValue({
      id:this.data.element.id,
      name :this.data.element.name
    });
    this.isLoading=false;
   }
  }

  ngOnDestroy(): void {
    
  }
  setCompanyForm(data: any) {    
    this.imperestForm.patchValue({
      id:data.id,
      name :data.name,
      date:data.date,
      days:data.days,
      remarks:data.remarks,      
    });
    data.details.forEach((element:any) => {
      this.addDetailsControlswithValue(element);
    });
    console.log(this.imperestForm.value);
  }
  

  get details() {
    return this.imperestForm.get('details') as FormArray;
  }

  addDetailsControls() {
    const group = this.formbuilder.group({
      id:[],
      expensename: ['',Validators.required], 
      amount: ['',Validators.required]
    });
    this.details.push(group);
  }

  addDetailsControlswithValue(data:any) {
    console.log(data);
    const group = this.formbuilder.group({
      id:[data.id],
      expensename: [data.expensename,Validators.required], 
      amount:[data.amount,Validators.required]
    });
    this.details.push(group);
  }

  onDocNameUpdate(value:string, index:number){
    (this.imperestForm.controls['details'] as FormArray).at(index).patchValue({
      name:value
    });
  }

  removeDocControl(index: number) {
    this.details.removeAt(index);
  }

  submit(){  
    this.isBtnClicked=true;
    if (this.isEdit) {     
      this.imperestService.updateImperest(this.imperestForm.value, '')
        .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
          next: (response:any) => {
          if(response && response.success)
            this.dialogRef.close({ value: this.imperestForm.value, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.imperestForm.value.id=null;       
      this.imperestService.createImperest(this.imperestForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked=false })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            this.imperestForm.value.id=response.data.id;
            this.dialogRef.close({ value: this.imperestForm.value, valid: true });
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
      this.imperestService.deleteImperest({id:this.imperestForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked=false })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.imperestForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}




