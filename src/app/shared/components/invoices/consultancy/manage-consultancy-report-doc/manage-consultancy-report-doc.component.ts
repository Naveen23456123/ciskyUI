import { Component, inject, Inject, Optional } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { BOQ_INVOICE } from '@app/shared/models/constant.config';
import { InvReportDocInterfaceService } from '@app/shared/services/external/invoice/inv-report-doc-interface.service';
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
  boqList:any[]=[];
  empty_message= '';
  isBtnClicked=false;
   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageConsultancyReportDocComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private boqService: InvReportDocInterfaceService, private reportDocService: InvReportDocInterfaceService){
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
      controls: this.formbuilder.array([])
    });
    if(!this.deleterd){ 
      this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
        if(projectEntity && projectEntity.projectId){
          if(!this.isEdit){  
          this.boqService.getBoqReportDocListForInsertByProjectId({invid:projectEntity.invoiceId,id:projectEntity.projectId }, '')
              .pipe(finalize(() => this.isLoading = false))
              .subscribe((response: any) => {
                if(response && response.success){
                  this.boqList= response.data;
                  response.data.forEach((element:any) => {
                    this.addControls(element,projectEntity.invoiceId);
                  });
                }
                this.subscribeChange();
                this.empty_message= BOQ_INVOICE.ALL_RECORD_INSERTED_MESSAGE;
            });
          } else {
            this.addControls(this.data.element,projectEntity.invoiceId);
            this.boqList=[this.data.element];
            this.subscribeChange();
            this.isLoading=false;
          }
        }
      });       
    } else {
      this.setrdForm(this.data.element);
      this.isLoading=false;
    }  
  }
  addControls(data:any,invId:any) {
    const group = this.formbuilder.group({
      id:[data.pid],
      boqid:[data.id],
      invoiceid:[invId],
      description: [data.description],
      currentbillmonths: [data.currentbillmonths,Validators.required],
      currentbillamount:[data.currentbill]
    });
    this.controls.push(group);
  }
  subscribeChange(){   
    (this.rdForm.get('controls') as FormArray).controls.forEach((group: AbstractControl, index: number) => {
      const quantityControl = group.get('currentbillmonths');
      if (quantityControl) {
        quantityControl.valueChanges.subscribe(value => {
           group.get('currentbillamount')?.setValue(value*(this.boqList.find(x=>x.id==group.get('boqid')?.value).ratepercopy));
        });
      }
    });
  }
  get controls() {
    return this.rdForm.get('controls') as FormArray;
  }
  setrdForm(data: any) {    
    this.rdForm.patchValue({
      id: data.id
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.isBtnClicked=true; 
    this.sessionService.invoiceEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.invoiceId){
        this.rdForm.patchValue({invoiceid:response.invoiceId});
        if (this.isEdit) {
          this.reportDocService.updateConsultantReportDoc(this.rdForm.get('controls')?.value[0], '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.dialogRef.close({ value: this.rdForm.get('controls')?.value[0], valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.rdForm.value.id=null;
          this.reportDocService.createConsultantReportDoc(this.rdForm.get('controls')?.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                let responseData:any[]=[];
                response.data.forEach((element:any) => {
                  responseData.push({
                    id:element.boqid,
                    currentbillmonths:element.currentbillmonths,
                    invoiceid:element.id,
                    description:this.boqList.find((x:any)=>x.id==element.boqid)?.description,
                    ratepercopy:this.boqList.find((x:any)=>x.id==element.boqid)?.ratepercopy,
                    numberofreport:this.boqList.find((x:any)=>x.id==element.boqid)?.numberofreport,
                    numberofcopiesperreport:this.boqList.find((x:any)=>x.id==element.boqid)?.numberofcopiesperreport,
                    previousbillmonths:this.boqList.find((x:any)=>x.id==element.boqid)?.uptolastbill
                  })
                });
                this.dialogRef.close({ value: responseData, valid: true });
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

