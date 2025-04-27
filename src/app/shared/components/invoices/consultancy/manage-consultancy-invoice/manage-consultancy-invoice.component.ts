import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LetterType } from '@app/shared/models/constant.config';
import { InvoiceInterfaceService } from '@app/shared/services/external/invoice-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-consultancy-invoice',
  standalone: false,
  templateUrl: './manage-consultancy-invoice.component.html',
  styleUrl: './manage-consultancy-invoice.component.scss'
})
export class ManageConsultancyInvoiceComponent {

  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  invoiceForm: FormGroup = new FormGroup({});
  deleteInvoice=false;
  projectList:{value:string,text:string}[] = [];
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '900px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageConsultancyInvoiceComponent>, private formbuilder: FormBuilder,
    private invoiceService:InvoiceInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteInvoice = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Invoice';
        break;
      case 'delete':
        this.title = 'Delete Invoice';
        break;
      case 'edit':
        this.title = 'Edit Invoice';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.invoiceForm = this.formbuilder.group({ 
      id: [''],
      number :[],
      projectid:[],
      monthandyear:[]
    });
    
    if (this.isEdit || this.deleteInvoice) {
      this.setinvoiceForm(this.data.element);
    }
    this.isLoading=false;
  }

  setinvoiceForm(data: any) {    
    this.invoiceForm.setValue({
      id: data.id,
      number :data.number,
      projectId:data.projectId,
      monthandyear:data.monthandyear
    });
  }
  dateChange(data:any){
    this.invoiceForm.patchValue({monthandyear:data.format()});   
  }
  submit(){   
  
    if (this.isEdit) {
      this.invoiceService.updateInvoice(this.invoiceForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
              this.dialogRef.close({ value: this.invoiceForm.value, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.invoiceForm.value.id=null;
      this.invoiceService.createInvoice(this.invoiceForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success)  {             
              this.invoiceForm.value.id=response.data.id;
              this.dialogRef.close({ value: this.invoiceForm.value, valid: true });
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
      this.invoiceService.deleteInvoice({id:this.invoiceForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.invoiceForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
  projectChange(event:any){
    if(event && event.value)
      this.invoiceForm.patchValue({projectid:event.value.id});
  }
}