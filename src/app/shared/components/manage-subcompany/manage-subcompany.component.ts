import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-subcompany',
  standalone: false,
  templateUrl: './manage-subcompany.component.html',
  styleUrl: './manage-subcompany.component.scss'
})
export class ManageSubcompanyComponent {
  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  subCompanyForm: FormGroup = new FormGroup({});
  deleteSubCompany=false;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageSubcompanyComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private notifibarservice: NotifyBarService, private subCompanyService:SubCompanyInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteSubCompany = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Sub Company';
        break;
      case 'delete':
        this.title = 'Delete Sub Company';
        break;
      case 'edit':
        this.title = 'Edit Sub Company';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.subCompanyForm = this.formbuilder.group({ 
      name: ['',[Validators.required]],
      id :[]
    });
    
    if (this.isEdit || this.deleteSubCompany) {
      this.setCompanyForm(this.data.element);
    }
    this.isLoading=false;
  }

  setCompanyForm(data: any) {    
    this.subCompanyForm.setValue({
      name: data.name,
      id: data.id
    });
  }

  submit(){   
    if (this.isEdit) {
      this.subCompanyService.updateSubCompany(this.subCompanyForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
              this.dialogRef.close({ value: this.subCompanyForm.value, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.subCompanyForm.value.id=null;
      this.subCompanyService.createSubCompany(this.subCompanyForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success)  {
              this.subCompanyForm.controls["id"].setValue(response.data.id);
              this.dialogRef.close({ value: this.subCompanyForm.value, valid: true });
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
      this.subCompanyService.deleteSubCompany({id:this.subCompanyForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.subCompanyForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}
