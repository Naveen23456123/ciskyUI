import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { BoqReportDocInterfaceService } from '@app/shared/services/external/boq/boq-report-doc-interface.service';
import { InvReportDocInterfaceService } from '@app/shared/services/external/invoice/inv-report-doc-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-manage-report-doc',
  standalone: false,
  templateUrl: './manage-report-doc.component.html',
  styleUrl: './manage-report-doc.component.scss'
})
export class ManageReportDocComponent {

public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  isHeading: boolean = false;
  title: string='Add';
  headingForm: FormGroup = new FormGroup({});
  rdForm: FormGroup = new FormGroup({});
  deleterd=false;
  readonly dialog = inject(MatDialog);
  isBtnClicked=false;
   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageReportDocComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private reportService: InvReportDocInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if(type=='heading'){
      this.isHeading=true;
    }
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
      projectid:[],
      numberofreport :[ ,Validators.required],
      numberofcopiesperreport:[,Validators.required],
      ratepercopy:[,Validators.required],
      description:[,Validators.required]
    });
    if(this.isHeading){
      this.headingForm= this.formbuilder.group({ 
        id: [''],
        description:[this.data.element.description]
      });
      this.sessionService.projectEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
        if(response && response.projectId){
          this.headingForm.patchValue({id:response.projectId});
        }
      });
     
    } 
    if (this.isEdit || this.deleterd) {
      this.setrdForm(this.data.element);
    }
    this.isLoading=false;
  }

  setrdForm(data: any) {    
    this.rdForm.patchValue({
      id:data.id,
      projectid:data.projectid,
      numberofreport :data.numberofreport,
      numberofcopiesperreport:data.numberofcopiesperreport,
      ratepercopy:data.ratepercopy,
      description:data.description,
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.isBtnClicked=true;
    this.sessionService.projectEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.projectId){
        this.rdForm.patchValue({projectid:response.projectId});
        if (this.isEdit) {
          this.reportService.updateBoqReportDoc(this.rdForm.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false; })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.rdForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
                this.dialogRef.close({ value: this.rdForm.value, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          let formData= {
            projectid:response.projectId,
            scopes:[this.rdForm.value]
          }
          this.rdForm.value.id=null;
          this.reportService.createBoqReportDoc(formData, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.rdForm.addControl('totalamount', this.formbuilder.control(response.data.scopes[0].totalamount));
                this.rdForm.controls["id"].setValue(response.data.scopes[0].id);
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
      this.reportService.deleteBoqReportDoc({id:this.rdForm.value.id}, '')
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
  desc_submit(){
    this.isBtnClicked=true;
    this.reportService.UpdateBoqReportDocDescription(this.headingForm.value, '')
    .pipe(finalize(() => { this.isBtnClicked = false; })).subscribe({
    next:(response: any) => {
      if (response && response.success) 
        this.dialogRef.close({ value: this.headingForm.value, valid: true });
    },
    error: (err: any) => {
        this.dialogRef.close(err);
      }
    });
  }
}