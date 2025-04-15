import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { LetterType } from '@app/shared/models/constant.config';
import { BoqOfficeRentInterfaceService } from '@app/shared/services/external/boq/boq-office-rent-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-manage-office-rent',
  standalone: false,
  templateUrl: './manage-office-rent.component.html',
  styleUrl: './manage-office-rent.component.scss'
})
export class ManageOfficeRentComponent {
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
    @Optional() private dialogRef: MatDialogRef<ManageOfficeRentComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private officeRentService: BoqOfficeRentInterfaceService){
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
      projectid:[],
      numberofmonths :[],
      ratepermonth:[]
    });
    
    if (this.isEdit || this.deleteor) {
      this.setorForm(this.data.element);
    }
    this.isLoading=false;
  }

  setorForm(data: any) {    
    this.orForm.setValue({
      id: data.id,
      projectid:data.projectid,
      numberofmonths :data.numberofmonths,
      ratepermonth:data.ratepermonth,
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.sessionService.projectEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.projectId){
        this.orForm.patchValue({projectid:response.projectId});
        if (this.isEdit) {
          this.officeRentService.updateBoqOfficeRent(this.orForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.orForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
                this.dialogRef.close({ value: this.orForm.value, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.orForm.value.id=null;
          this.officeRentService.createBoqOfficeRent(this.orForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.orForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
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
      this.officeRentService.deleteBoqOfficeRent({id:this.orForm.value.id}, '')
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