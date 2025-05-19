import { Component, inject, Inject, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { BoqOfficeSupplyInterfaceService } from '@app/shared/services/external/boq/boq-office-supply-interface.service';
import { InvOfcSupplyInterfaceService } from '@app/shared/services/external/invoice/inv-ofc-supply-interface.service';
import { BOQ_INVOICE } from '@app/shared/models/constant.config';
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
  boqList:any[]=[];
   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };
  empty_message= '';
  isBtnClicked=false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageConsultancyOfficeSuppliesComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private boqService: InvOfcSupplyInterfaceService, private officeSupplyService: InvOfcSupplyInterfaceService){
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
      controls: this.formbuilder.array([])
    });
    if(!this.deleteos){
      this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
        if(projectEntity && projectEntity.projectId){
          if(!this.isEdit){  
            this.boqService.getBoqOfficeSupplyListForInsertByProjectId({id:projectEntity.projectId }, '')
                .pipe(finalize(() => this.isLoading = false))
                .subscribe((response: any) => {
                  if(response && response.success){
                    this.boqList= response.data;
                    response.data.forEach((element:any) => {
                      this.addControls(element,projectEntity.invoiceId);
                    });
                  }
                  this.empty_message= BOQ_INVOICE.ALL_RECORD_INSERTED_MESSAGE;
            });
          } else {
            this.addControls(this.data.element,projectEntity.invoiceId);
              this.isLoading=false;
          }
        }
      }); 
    } else {
      this.setosForm(this.data.element);
      this.isLoading=false;
    }  
  }
  addControls(data:any,invId:any) {
    const group = this.formbuilder.group({
      id:[data.pid],
      boqid:[data.id],
      invoiceid:[invId],
      description: [data.description], 
      currentbillmonths: [data.currentbillmonths,Validators.required]
    });
    this.controls.push(group);
  }

  get controls() {
    return this.osForm.get('controls') as FormArray;
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
    this.isBtnClicked=true; 
    this.sessionService.invoiceEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.invoiceId){
        this.osForm.patchValue({invoiceid:response.invoiceId});
        if (this.isEdit) {
          this.officeSupplyService.updateConsultantOfficeSupply(this.osForm.get('controls')?.value[0], '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.dialogRef.close({ value: this.osForm.get('controls')?.value[0], valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.osForm.value.id=null;
          this.officeSupplyService.createConsultantOfficeSupply(this.osForm.get('controls')?.value, '')
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
                    previousbillmonths:0
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
