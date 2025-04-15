import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LetterType } from '@app/shared/models/constant.config';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';

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
    private sessionservice: SessionService, private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService){
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
      projectId:[],
      month:[],
      year:[]
    });
    
    if (this.isEdit || this.deleteInvoice) {
      this.setinvoiceForm(this.data.element);
    }
    this.isLoading=false;
  }

  setinvoiceForm(data: any) {    
    this.invoiceForm.setValue({
      id: [''],
      number :[],
      projectId:[],
      month:[],
      year:[]
    });
  }

  submit(){
   // this.dialogRef.close({ value: this.data.element, valid: true });
    
  }

  delete(){

  }

}