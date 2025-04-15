import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DesignationInterfaceService } from '@app/shared/services/external/designation-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-designation',
  standalone: false,
  templateUrl: './manage-designation.component.html',
  styleUrl: './manage-designation.component.scss'
})
export class ManageDesignationComponent {

  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  designationForm: FormGroup = new FormGroup({});
  deleteDesignation=false;
  subCompanyList:{id:string,name:string}[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageDesignationComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private notifibarservice: NotifyBarService, private designationService:DesignationInterfaceService,
    private subCompanyService:SubCompanyInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteDesignation = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Designation';
        break;
      case 'delete':
        this.title = 'Delete Designation';
        break;
      case 'edit':
        this.title = 'Edit Designation';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.designationForm = this.formbuilder.group({ 
      name: ['',[Validators.required]],
      companyId:['',[Validators.required]],
      id :[]
    });
    if(!this.deleteDesignation){
      this.subCompanyService.getSubCompanyListByOrgId({},'').subscribe((response:any)=>{
        if(response && response.success) {
          this.subCompanyList= response.data;
        }
      });
    }
    else
      this.isLoading=false;
    
    if (this.isEdit || this.deleteDesignation) {
      this.setCompanyForm(this.data.element);
    }
    this.isLoading=false;
  }

  setCompanyForm(data: any) { 
    this.designationForm.setValue({
      name: data.name,
      companyId:data.companyid,
      id:data.id
    });
  }

  submit(){
    const companyName= this.subCompanyList.find(x=>x.id==this.designationForm.get('companyId')?.value)?.name; 
    let formValues= this.designationForm.value;
    formValues.companyname= companyName;  
    if (this.isEdit) {
      this.designationService.updateDesignation(formValues, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
              this.dialogRef.close({ value: formValues, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.designationForm.value.id=null;
      this.designationService.createDesignation(this.designationForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success)  {
              formValues.id=response.data.id;
              this.dialogRef.close({ value: formValues, valid: true });
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
      this.designationService.deleteDesignation({id:this.designationForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.designationForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}
