import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';

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
  subCompanyList:{value:string,text:string}[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageCircularComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private notifibarservice: NotifyBarService){
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
      publishDate:[''],
      description:[''],
      id :[]
    });
    
    if (this.isEdit || this.deleteCircular) {
      this.setCompanyForm(this.data.element);
    }
   
    this.isLoading=false;
  }

  setCompanyForm(data: any) {    
    this.circularForm.patchValue({
      title:'',
      publishDate:'',
      description:'',
      id:''
    });
  }

  submit(){

  }

  delete(){

  }
}
