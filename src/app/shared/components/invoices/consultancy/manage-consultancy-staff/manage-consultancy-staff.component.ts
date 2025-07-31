import { Component, inject, Inject, Optional } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { BOQ_INVOICE } from '@app/shared/models/constant.config';
import { InvStaffInterfaceService } from '@app/shared/services/external/invoice/inv-staff-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-manage-consultancy-staff',
  standalone: false,
  templateUrl: './manage-consultancy-staff.component.html',
  styleUrl: './manage-consultancy-staff.component.scss'
})
export class ManageConsultancyStaffComponent {

  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  staffForm: FormGroup = new FormGroup({});
  deleteStaff=false;
  readonly dialog = inject(MatDialog);
  professionaList:any[]=[];
  professionalid:string='';
   empty_message='';
   isBtnClicked=false;
  boqList:any[]=[];
   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageConsultancyStaffComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private staffervice: InvStaffInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteStaff = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Staff Invoice';
        break;
      case 'delete':
        this.title = 'Delete Staff Invoice';
        break;
      case 'edit':
        this.title = 'Edit Staff Invoice';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.staffForm = this.formbuilder.group({ 
      id: [''],
      invoiceid:[],
      controls: this.formbuilder.array([])
    });
    this.sessionService.staffTypeSubject$.subscribe((response:any)=>{
      if(response){        
        this.professionaList= response;
      }
    })
    if(!this.deleteStaff){      
    this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
      if(projectEntity && projectEntity.projectId){
        if (!this.isEdit) {
          this.staffervice.getBoqStaffListForInsertByProjectId({invid:projectEntity.invoiceId,id:projectEntity.projectId }, '')
              .pipe(finalize(() => this.isLoading = false))
              .subscribe((response: any) => {
                if(response && response.success){
                  this.boqList=response.data;
                  response.data.forEach((element:any) => {
                    this.addControls(element,projectEntity.invoiceId);
                  });
                  this.subscribeChange();
                }
                this.empty_message= BOQ_INVOICE.ALL_RECORD_INSERTED_MESSAGE;
          });
        }
        else {
          this.addControls(this.data.element,projectEntity.invoiceId);
          this.boqList=[this.data.element];
          this.subscribeChange();
          this.isLoading=false;
        }        
      }
    });
  }
  else {
    this.setStaffForm(this.data.element);    
    this.professionalid= this.data.element.professionalid;
    this.isLoading=false;
  }
  }
  subscribeChange(){   
    (this.staffForm.get('controls') as FormArray).controls.forEach((group: AbstractControl, index: number) => {
      const quantityControl = group.get('currentbillmonths');
      if (quantityControl) {
        quantityControl.valueChanges.subscribe(value => {    
           group.get('currentbillamount')?.setValue(value*(this.boqList.find(x=>x.id==group.get('boqid')?.value).rate), { emitEvent: false });
        });       
      }
    });
  }
  addControls(data:any,invId:any) {
    this.professionalid= data.professionalid;
    const group = this.formbuilder.group({
      id:[data.pid],
      boqid:[data.id],
      designation:[data.designation],
      employeename:[data.employeename],
      invoiceid:[invId],
      currentbillmonths: [data.currentbillmonths,[Validators.required, Validators.min(0), Validators.max(1)]],
      currentbillamount: [data.currentbill]
    });
    this.controls.push(group);
  }

  get controls() {
    return this.staffForm.get('controls') as FormArray;
  }
  setStaffForm(data: any) {    
    this.staffForm.patchValue({
      id: data.id
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.isBtnClicked=true;
    this.sessionService.invoiceEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.invoiceId){
        this.staffForm.patchValue({invoiceid:response.invoiceId});
        if (this.isEdit) {
          let form =this.staffForm.get('controls')?.value[0];
          this.staffervice.updateConsultantStaff(form, '')
            .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked=false })).subscribe({
              next: (response:any) => {
              if(response && response.success){                
                form.professionalid= this.professionalid;
                form.previousbillmonths=this.boqList.find((x:any)=>x.id==form.id)?.uptolastbill
                this.dialogRef.close({ value:form,professionalData: this.professionaList, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.staffForm.value.id=null;
          this.staffervice.createConsultantStaff(this.staffForm.get('controls')?.value, '')
            .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked=false })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                let responseData:any[]=[];
                response.data.forEach((element:any) => {
                  responseData.push({
                    id:element.boqid,
                    currentbillmonths:element.currentbillmonths,
                    invoiceid:element.id,
                    designation :this.boqList.find((x:any)=>x.id==element.boqid)?.designation,
                    professionalid:this.boqList.find((x:any)=>x.id==element.boqid)?.professionalid,
                    name :this.boqList.find((x:any)=>x.id==element.boqid)?.employeename,
                    rate:this.boqList.find((x:any)=>x.id==element.boqid)?.rate,
                    constructionperiod:this.boqList.find((x:any)=>x.id==element.boqid)?.constructionperiod,
                    oandmperiod:this.boqList.find((x:any)=>x.id==element.boqid)?.oandmperiod,
                    previousbillmonths:this.boqList.find((x:any)=>x.id==element.boqid)?.uptolastbill
                  });                  
                });
                console.log(responseData);
                this.dialogRef.close({ value: responseData,professionalData: this.professionaList, valid: true });
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
      this.staffervice.deleteConsultantStaff({id:this.staffForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) {
            this.staffForm.value.professionalid= this.professionalid;
            this.dialogRef.close({ value: this.staffForm.value,professionalData: this.professionaList, valid: true });
          }
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
    });
  }

}


