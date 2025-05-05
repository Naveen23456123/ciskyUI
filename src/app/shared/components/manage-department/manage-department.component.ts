import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DepartmentInterfaceService } from '@app/shared/services/external/department-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-department',
  standalone: false,
  templateUrl: './manage-department.component.html',
  styleUrl: './manage-department.component.scss'
})
export class ManageDepartmentComponent {

  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  deptForm: FormGroup = new FormGroup({});
  deleteDepartment=false;
  subCompanyList:{id:string,name:string}[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageDepartmentComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private notifibarservice: NotifyBarService, private departmentService:DepartmentInterfaceService,
    private subCompanyService:SubCompanyInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteDepartment = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Department';
        break;
      case 'delete':
        this.title = 'Delete Department';
        break;
      case 'edit':
        this.title = 'Edit Department';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.deptForm = this.formbuilder.group({ 
      name: ['',[Validators.required]],
      companyid:['',[Validators.required]],
      id :[]
    });
    if(!this.deleteDepartment){
      this.subCompanyService.getSubCompanyListByOrgId({},'').pipe(finalize(()=> this.isLoading=false)).subscribe((response:any)=>{
        if(response && response.success){
        this.subCompanyList= response.data;
        }
      });
    }
    else
      this.isLoading=false;
    if (this.isEdit || this.deleteDepartment) {
      this.setCompanyForm(this.data.element);
    }
   
  }

  setCompanyForm(data: any) {    
    this.deptForm.setValue({
      name: data.name,
      companyid:data.companyid,
      id:data.id
    });
  }

  submit(){  
    const companyName= this.subCompanyList.find(x=>x.id==this.deptForm.get('companyid')?.value)?.name; 
    let formValues= this.deptForm.value;
    formValues.companyname= companyName; 
    if (this.isEdit) {
      this.departmentService.updateDepartment(formValues, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
              this.dialogRef.close({ value: this.deptForm.value, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.deptForm.value.id=null;
      this.departmentService.createDepartment(formValues, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success)  {
              formValues.id=response.data.id;
              this.dialogRef.close({ value: this.deptForm.value, valid: true });
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
      this.departmentService.deleteDepartment({id:this.deptForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.deptForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}
