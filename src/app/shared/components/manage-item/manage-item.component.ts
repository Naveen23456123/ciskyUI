import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ItemInterfaceService } from '@app/shared/services/external/item-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-item',
  standalone: false,
  templateUrl: './manage-item.component.html',
  styleUrl: './manage-item.component.scss'
})
export class ManageItemComponent {

  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  itemForm: FormGroup = new FormGroup({});
  deleteItem=false;
  subCompanyList:any[] = [];
  isClicked=false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageItemComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private itemService: ItemInterfaceService, private companyService:SubCompanyInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteItem = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Item';
        break;
      case 'delete':
        this.title = 'Delete Item';
        break;
      case 'edit':
        this.title = 'Edit Item';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.itemForm = this.formbuilder.group({ 
      name: ['',Validators.required],
      id :[]
    });
    this.companyService.getSubCompanyListByOrgId({},'')
    .pipe(finalize(()=>this.isLoading=false)).subscribe((response:any)=>{
      if(response && response.success){
        this.subCompanyList= response.data;
      }
    })
    if (this.isEdit || this.deleteItem) {
      this.setCompanyForm(this.data.element);
    }
  }

  setCompanyForm(data: any) {    
    this.itemForm.setValue({
      name: data.name,
      id:data.id
    });
  }

  submit(){   
    this.isClicked=true;
    if (this.isEdit) {
      this.itemService.updateItem(this.itemForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; this.isClicked=false })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
              this.dialogRef.close({ value: this.itemForm.value, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.itemForm.value.id=null;
      this.itemService.createItem(this.itemForm.value, '')
        .pipe(finalize(() => { this.isLoading = false;this.isClicked=false })).subscribe({
          next:(response: any) => {
            if (response && response.success)  {
              this.itemForm.controls["id"].setValue(response.data.id);
              this.dialogRef.close({ value: this.itemForm.value, valid: true });
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
      this.itemService.deleteItem({id:this.itemForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.itemForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
  downloadCSV() {
    const headers = ['Name', 'Department'];
    const data = [
      ['John Doe', 'Sales'],
      ['Jane Smith', 'Engineering'],
      ['Dropdown Options:', 'Sales | Engineering | HR'] // shows dropdown-like hint
    ];
  
    const csvContent = [headers, ...data]
      .map(e => e.join(','))
      .join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
  
    link.setAttribute('href', url);
    link.setAttribute('download', 'template.csv');
    link.click();
  }
}

