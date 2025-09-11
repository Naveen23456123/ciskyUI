import { Component, inject, Inject, Optional } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { BoqOfficeRentInterfaceService } from '@app/shared/services/external/boq/boq-office-rent-interface.service';
import { InvOfcRentInterfaceService } from '@app/shared/services/external/invoice/inv-ofc-rent-interface.service';
import { BOQ_INVOICE } from '@app/shared/models/constant.config';
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
  boqList:any[]=[];
   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };
  empty_message='';
  isBtnClicked=false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageConsultancyOfficeRentComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private boqService: InvOfcRentInterfaceService, private officeRentService:InvOfcRentInterfaceService){
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
      controls: this.formbuilder.array([])
    });
    if(!this.deleteor){ 
      this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
        if(projectEntity && projectEntity.projectId){
          if(!this.isEdit){  
          this.boqService.getBoqOfficeRentListForInsertByProjectId({invid:projectEntity.invoiceId,id:projectEntity.projectId }, '')
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
      this.setorForm(this.data.element);
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
    (this.orForm.get('controls') as FormArray).controls.forEach((group: AbstractControl, index: number) => {
      const quantityControl = group.get('currentbillmonths');
      if (quantityControl) {
        quantityControl.statusChanges.subscribe(value => {
          setTimeout(() => {
            group.get('currentbillamount')?.setValue(quantityControl.value*(this.boqList.find(x=>x.id==group.get('boqid')?.value).ratepermonth));
          });
        });
      }
    });
  }
  get controls() {
    return this.orForm.get('controls') as FormArray;
  }
  setorForm(data: any) {    
    this.orForm.patchValue({
      id: data.id
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.isBtnClicked=true; 
    this.sessionService.invoiceEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.invoiceId){
        this.orForm.patchValue({invoiceid:response.invoiceId});
        if (this.isEdit) {
          this.officeRentService.updateConsultantOfficeRent(this.orForm.get('controls')?.value[0], '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.dialogRef.close({ value: this.orForm.get('controls')?.value[0], valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.orForm.value.id=null;
          this.officeRentService.createConsultantOfficeRent(this.orForm.get('controls')?.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                let responseData:any[]=[];
                console.log(this.boqList);
                response.data.forEach((element:any) => {
                  responseData.push({
                    id:element.boqid,
                    currentbillmonths:element.currentbillmonths,
                    invoiceid:element.id,
                    description:this.boqList.find((x:any)=>x.id==element.boqid)?.description,
                    rate:this.boqList.find((x:any)=>x.id==element.boqid)?.ratepermonth,
                    months:this.boqList.find((x:any)=>x.id==element.boqid)?.numberofmonths,
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
