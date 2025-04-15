import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { InvOfcRentInterfaceService } from '@app/shared/services/external/invoice/inv-ofc-rent-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-manage-consultancy-office-rent',
  standalone: false,
  templateUrl: './manage-consultancy-office-rent.component.html',
  styleUrl: './manage-consultancy-office-rent.component.scss'
})
export class ManageConsultancyOfficeRentComponent {
  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  orForm: FormGroup = new FormGroup({});
  deleteor=false;
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageConsultancyOfficeRentComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private officeRentService:InvOfcRentInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteor = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Office Rent';
        break;
      case 'delete':
        this.title = 'Delete Office Rent';
        break;
      case 'edit':
        this.title = 'Edit Office Rent';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.orForm = this.formbuilder.group({ 
      id: [''],
      invoiceid:[],
      description :[],
      rate:[],
      months:[],
      previousbillmonths:[],
      currentbillmonths: []
    });
    
    if (this.isEdit || this.deleteor) {
      this.setorForm(this.data.element);
    }
    this.isLoading=false;
  }

  setorForm(data: any) {    
    this.orForm.patchValue({
      id: data.id,
      description :data.description,
      rate:data.rate,
      months:data.months,
      previousbillmonths: data.previousbillmonths,
      currentbillmonths: data.currentbillmonths
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.sessionService.invoiceEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.invoiceId){
        this.orForm.patchValue({invoiceid:response.invoiceId});
        if (this.isEdit) {
          this.officeRentService.updateConsultantOfficeRent(this.orForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.dialogRef.close({ value: this.orForm.value, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.orForm.value.id=null;
          this.officeRentService.createConsultantOfficeRent(this.orForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.orForm.controls["id"].setValue(response.data.id);
                this.dialogRef.close({ value: this.orForm.value, valid: true });
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
    }) 
  }

  delete() {
      this.officeRentService.deleteConsultantOfficeRent({id:this.orForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.orForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }

}
