import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { ManageOfficeFurnitureComponent } from '../../boq/manage-office-furniture/manage-office-furniture.component';
import { finalize, take } from 'rxjs';
import { untilDestroyed } from '@app/core/until-destroyed';
import { InvOfcFurnitureInterfaceService } from '@app/shared/services/external/invoice/inv-ofc-furniture-interface.service';

@Component({
  selector: 'app-manage-consultancy-office-furniture',
  standalone: false,
  templateUrl: './manage-consultancy-office-furniture.component.html',
  styleUrl: './manage-consultancy-office-furniture.component.scss'
})
export class ManageConsultancyOfficeFurnitureComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  ofForm: FormGroup = new FormGroup({});
  deleteof=false;
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageOfficeFurnitureComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private officeFurnitureService: InvOfcFurnitureInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteof = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Office Furniture';
        break;
      case 'delete':
        this.title = 'Delete Office Furniture';
        break;
      case 'edit':
        this.title = 'Edit Office Furniture';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.ofForm = this.formbuilder.group({ 
      id: [''],
      invoiceid:[],
      description :[],
      unit:[],
      quantity:[],
      rateperunit:[],
      previousbillmonths: [],
      currentbillmonths: []
    });
    
    if (this.isEdit || this.deleteof) {
      this.setofForm(this.data.element);
    }
    this.isLoading=false;
  }

  setofForm(data: any) {    
    this.ofForm.patchValue({
      id: data.id,
      description :data.description,
      unit:data.unit,
      quantity:data.quantity,
      rateperunit:data.rateperunit,
      previousbillmonths: data.previousbillmonths,
      currentbillmonths: data.currentbillmonths
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.sessionService.invoiceEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.invoiceId){
        this.ofForm.patchValue({invoiceid:response.invoiceId});
        if (this.isEdit) {
          this.officeFurnitureService.updateConsultantOfficeFurniture(this.ofForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.dialogRef.close({ value: this.ofForm.value, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.ofForm.value.id=null;
          this.officeFurnitureService.createConsultantOfficeFurniture(this.ofForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.ofForm.controls["id"].setValue(response.data.id);
                this.dialogRef.close({ value: this.ofForm.value, valid: true });
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
      this.officeFurnitureService.deleteConsultantOfficeFurniture({id:this.ofForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.ofForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
    });
  }

}
