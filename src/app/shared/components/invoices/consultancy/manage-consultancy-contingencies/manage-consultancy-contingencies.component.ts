import { Component, inject, Inject, Optional } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { BOQ_INVOICE } from '@app/shared/models/constant.config';
import { InvoiceInterfaceService } from '@app/shared/services/external/invoice-interface.service';
import { InvContingencyInterfaceService } from '@app/shared/services/external/invoice/inv-contingency-interface.service';
import { InvDutyTravelInterfaceService } from '@app/shared/services/external/invoice/inv-duty-travel-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';
@Component({
  selector: 'app-manage-consultancy-contingencies',
  standalone: false,
  templateUrl: './manage-consultancy-contingencies.component.html',
  styleUrl: './manage-consultancy-contingencies.component.scss'
})
export class ManageConsultancyContingenciesComponent {
  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  contForm: FormGroup = new FormGroup({});
  deletecont=false;
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
    @Optional() private dialogRef: MatDialogRef<ManageConsultancyContingenciesComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute, private contingencyService:InvContingencyInterfaceService,
  private invoiceService:InvoiceInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deletecont = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Contingency';
        break;
      case 'delete':
        this.title = 'Delete Contingency';
        break;
      case 'edit':
        this.title = 'Edit Contingency';
        break;
    }
  }

  ngOnInit(){
    
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.contForm = this.formbuilder.group({ 
      id: [''],
      invoiceid:[],
      controls: this.formbuilder.array([])
    });
    if(!this.deletecont){ 
      this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
        if(projectEntity && projectEntity.projectId){
          if(!this.isEdit){  
          this.contingencyService.getBoqContingencyListForInsertByProjectId({invid:projectEntity.invoiceId,id:projectEntity.projectId }, '')
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
      this.setcontForm(this.data.element);
      this.isLoading=false;
    }  
  }

  addControls(data:any,invId:any) {
    const group = this.formbuilder.group({
      id:[data.pid],
      boqid:[data.id],
      invoiceid:[invId],
      description: [data.description],
      currentbillamount:[data.currentbillamount,[Validators.required, Validators.max(data.amount)]]
    });
    this.controls.push(group);
  }
  subscribeChange(){   
    (this.contForm.get('controls') as FormArray).controls.forEach((group: AbstractControl, index: number) => {
      const quantityControl = group.get('currentbilltrips');
      if (quantityControl) {
        quantityControl.valueChanges.subscribe(value => {
           group.get('currentbillamount')?.setValue(value*(this.boqList.find(x=>x.id==group.get('boqid')?.value).ratepertrip));
        });
      }
    });
  }
  get controls() {
    return this.contForm.get('controls') as FormArray;
  }

  setcontForm(data: any) {    
    this.contForm.patchValue({
      id: data.id
    });
  }


  ngOnDestroy(){}

  submit(){ 
    this.isBtnClicked=true; 
    this.sessionService.invoiceEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.invoiceId){
        this.contForm.patchValue({invoiceid:response.invoiceId});
        if (this.isEdit) {
          this.invoiceService.upsertContingencyInvoiceScope(this.contForm.get('controls')?.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.dialogRef.close({ value: this.contForm.get('controls')?.value[0], valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.contForm.value.id=null;
          this.invoiceService.upsertContingencyInvoiceScope(this.contForm.get('controls')?.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                let responseData:any[]=[];
                response.data.forEach((element:any) => {
                  responseData.push({
                    id:element.boqid,
                    boqid: element.boqid,
                    currentbillamount:element.currentbillamount,
                    invoiceid:element.invoiceid,
                    description:this.boqList.find((x:any)=>x.id==element.boqid)?.description,
                    previousbillamount:this.boqList.find((x:any)=>x.id==element.boqid)?.uptolastbill,   
                    totalamount:this.boqList.find((x:any)=>x.id==element.boqid)?.totalamount,              
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
      this.invoiceService.deleteContingencyScope(this.data.element, '')
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

