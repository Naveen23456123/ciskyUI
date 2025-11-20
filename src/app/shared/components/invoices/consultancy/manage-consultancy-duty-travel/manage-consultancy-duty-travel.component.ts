import { Component, inject, Inject, Optional } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { BOQ_INVOICE } from '@app/shared/models/constant.config';
import { InvoiceInterfaceService } from '@app/shared/services/external/invoice-interface.service';
import { InvDutyTravelInterfaceService } from '@app/shared/services/external/invoice/inv-duty-travel-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-manage-consultancy-duty-travel',
  standalone: false,
  templateUrl: './manage-consultancy-duty-travel.component.html',
  styleUrl: './manage-consultancy-duty-travel.component.scss'
})
export class ManageConsultancyDutyTravelComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  dtForm: FormGroup = new FormGroup({});
  deletedt=false;
  readonly dialog = inject(MatDialog);
  boqList:any[]=[];
   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };
  empty_message= '';
  isBtnClicked=false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageConsultancyDutyTravelComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private boqService:InvDutyTravelInterfaceService, private dutyTravelService:InvDutyTravelInterfaceService,
    private invoiceService:InvoiceInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deletedt = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Duty Travel';
        break;
      case 'delete':
        this.title = 'Delete Duty Travel';
        break;
      case 'edit':
        this.title = 'Edit Duty Travel';
        break;
    }
  }

  ngOnInit(){
    
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.dtForm = this.formbuilder.group({ 
      id: [''],
      invoiceid:[],
      controls: this.formbuilder.array([])
    });
    if(!this.deletedt){ 
      this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
        if(projectEntity && projectEntity.projectId){
          if(!this.isEdit){  
          this.boqService.getBoqDutyTravelListForInsertByProjectId({invid:projectEntity.invoiceId,id:projectEntity.projectId }, '')
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
      this.setdtForm(this.data.element);
      this.isLoading=false;
    }  
  }

  addControls(data:any,invId:any) {
    const group = this.formbuilder.group({
      id:[data.pid],
      boqid:[data.id],
      invoiceid:[invId],
      description: [data.description],
      currentbilltrips: [data.currentbilltrips,Validators.required],
      currentbillamount:[data.currentbill]
    });
    this.controls.push(group);
  }
  subscribeChange(){   
    (this.dtForm.get('controls') as FormArray).controls.forEach((group: AbstractControl, index: number) => {
      const quantityControl = group.get('currentbilltrips');
      if (quantityControl) {
        quantityControl.statusChanges.subscribe(value => {
          setTimeout(() => {
            group.get('currentbillamount')?.setValue(quantityControl.value*(this.boqList.find(x=>x.id==group.get('boqid')?.value).ratepertrip));
          });
        });
      }
    });
  }
  get controls() {
    return this.dtForm.get('controls') as FormArray;
  }

  setdtForm(data: any) {    
    this.dtForm.patchValue({
      id: data.id
    });
  }


  ngOnDestroy(){}

  submit(){ 
    this.isBtnClicked=true; 
    this.sessionService.invoiceEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.invoiceId){
        this.dtForm.patchValue({invoiceid:response.invoiceId});
        if (this.isEdit) {
          this.invoiceService.upsertDutyTravelInvoiceScope(this.dtForm.get('controls')?.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.dialogRef.close({ value: this.dtForm.get('controls')?.value[0], valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.dtForm.value.id=null;
          this.invoiceService.upsertDutyTravelInvoiceScope(this.dtForm.get('controls')?.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                let responseData:any[]=[];
                response.data.forEach((element:any) => {
                  responseData.push({
                    id:element.id,
                    boqid: element.boqid,
                    currentbilltrips:element.currentbilltrips,
                    invoiceid:element.invoiceid,
                    description:this.boqList.find((x:any)=>x.id==element.boqid)?.description,
                    rate:this.boqList.find((x:any)=>x.id==element.boqid)?.ratepertrip,
                    trips:this.boqList.find((x:any)=>x.id==element.boqid)?.numberofminimumtrips,
                    previousbilltrips:this.boqList.find((x:any)=>x.id==element.boqid)?.uptolastbill
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
      this.invoiceService.deleteInvoiceDutyTravelScope(this.data.element, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.data.element, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }

}
