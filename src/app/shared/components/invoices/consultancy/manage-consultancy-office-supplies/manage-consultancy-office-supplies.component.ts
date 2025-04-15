import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { InvOfcSupplyInterfaceService } from '@app/shared/services/external/invoice/inv-ofc-supply-interface.service';
import { OfficeInterfaceService } from '@app/shared/services/external/office-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-manage-consultancy-office-supplies',
  standalone: false,
  templateUrl: './manage-consultancy-office-supplies.component.html',
  styleUrl: './manage-consultancy-office-supplies.component.scss'
})
export class ManageConsultancyOfficeSuppliesComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  osForm: FormGroup = new FormGroup({});
  deleteos=false;
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageConsultancyOfficeSuppliesComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private officeSupplyService: InvOfcSupplyInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteos = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Office Supplies';
        break;
      case 'delete':
        this.title = 'Delete Office Supplies';
        break;
      case 'edit':
        this.title = 'Edit Office Supplies';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.osForm = this.formbuilder.group({ 
      id: [''],
      invoiceid:[],
      description :[],
      rate:[],
      months:[],
      previousbillmonths:[],
      currentbillmonths: []
    });
    
    if (this.isEdit || this.deleteos) {
      this.setosForm(this.data.element);
    }
    this.isLoading=false;
  }

  setosForm(data: any) {    
    this.osForm.patchValue({
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
        this.osForm.patchValue({invoiceid:response.invoiceId});
        if (this.isEdit) {
          this.officeSupplyService.updateConsultantOfficeSupply(this.osForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.dialogRef.close({ value: this.osForm.value, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.osForm.value.id=null;
          this.officeSupplyService.createConsultantOfficeSupply(this.osForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.osForm.controls["id"].setValue(response.data.id);
                this.dialogRef.close({ value: this.osForm.value, valid: true });
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
      this.officeSupplyService.deleteConsultantOfficeSupply({id:this.osForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.osForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }

}
