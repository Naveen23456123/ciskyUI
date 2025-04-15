import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { InvReportDocInterfaceService } from '@app/shared/services/external/invoice/inv-report-doc-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-manage-consultancy-report-doc',
  standalone: false,
  templateUrl: './manage-consultancy-report-doc.component.html',
  styleUrl: './manage-consultancy-report-doc.component.scss'
})
export class ManageConsultancyReportDocComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  rdForm: FormGroup = new FormGroup({});
  deleterd=false;
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageConsultancyReportDocComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private reportDocService: InvReportDocInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleterd = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Report & Doc';
        break;
      case 'delete':
        this.title = 'Delete Report & Doc';
        break;
      case 'edit':
        this.title = 'Edit Report & Doc';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.rdForm = this.formbuilder.group({ 
      id: [''],
      invoiceid:[],
      description :[],
      numberofreport:[],
      numberofcopiesperreport:[],
      ratepercopy:[],
      previousbillmonths:[],
      currentbillmonths:[]
    });
    
    if (this.isEdit || this.deleterd) {
      this.setrdForm(this.data.element);
    }
    this.isLoading=false;
  }

  setrdForm(data: any) {    
    this.rdForm.patchValue({
      id: data.id,
      description :data.description,
      numberofreport:data.numberofreport,
      numberofcopiesperreport:data.numberofcopiesperreport,
      ratepercopy:data.ratepercopy,
      previousbillmonths:data.previousbillmonths,
      currentbillmonths:data.currentbillmonths
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.sessionService.invoiceEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.invoiceId){
        this.rdForm.patchValue({invoiceid:response.invoiceId});
        if (this.isEdit) {
          this.reportDocService.updateConsultantReportDoc(this.rdForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.dialogRef.close({ value: this.rdForm.value, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.rdForm.value.id=null;
          this.reportDocService.createConsultantReportDoc(this.rdForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.rdForm.controls["id"].setValue(response.data.id);
                this.dialogRef.close({ value: this.rdForm.value, valid: true });
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
      this.reportDocService.deleteConsultantReportDoc({id:this.rdForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.rdForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
    });
  }

}

