import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { InvTransportInterfaceService } from '@app/shared/services/external/invoice/inv-transport-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-manage-consultancy-transportation',
  standalone: false,
  templateUrl: './manage-consultancy-transportation.component.html',
  styleUrl: './manage-consultancy-transportation.component.scss'
})
export class ManageConsultancyTransportationComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  tpForm: FormGroup = new FormGroup({});
  deletetp=false;
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageConsultancyTransportationComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private transportService:InvTransportInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deletetp = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Transportation';
        break;
      case 'delete':
        this.title = 'Delete Transportation';
        break;
      case 'edit':
        this.title = 'Edit Transportation';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.tpForm = this.formbuilder.group({ 
      id: [''],
      invoiceid:[],
      description :[],
      rate:[],
      constructionmonths:[],
      maintenancemonths:[],
      previousbillmonths:[],
      currentbillmonths:[]
    });
    
    if (this.isEdit || this.deletetp) {
      this.settpForm(this.data.element);
    }
    this.isLoading=false;
  }

  settpForm(data: any) {    
    this.tpForm.patchValue({
      id: data.id,
      description :data.description,
      rate:data.rate,
      constructionmonths:data.constructionmonths,
      maintenancemonths:data.maintenancemonths,
      previousbillmonths:data.previousbillmonths,
      currentbillmonths:data.currentbillmonths,
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.sessionService.invoiceEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.invoiceId){
        this.tpForm.patchValue({invoiceid:response.invoiceId});
        if (this.isEdit) {
          this.transportService.updateConsultantTransportation(this.tpForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.dialogRef.close({ value: this.tpForm.value, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.tpForm.value.id=null;
          this.transportService.createConsultantTransportation(this.tpForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.tpForm.controls["id"].setValue(response.data.id);
                this.dialogRef.close({ value: this.tpForm.value, valid: true });
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
      this.transportService.deleteConsultantTransportation({id:this.tpForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.tpForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}