import { Component, inject, Inject, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { BOQ_INVOICE } from '@app/shared/models/constant.config';
import { BoqTransportationInterfaceService } from '@app/shared/services/external/boq/boq-transportation-interface.service';
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
  boqList:any[]=[];
  empty_message= '';
  isBtnClicked=false;
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageConsultancyTransportationComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private boqService: InvTransportInterfaceService, private transportService:InvTransportInterfaceService){
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
      controls: this.formbuilder.array([])
    });
    if(!this.deletetp){     
        this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
          if(projectEntity && projectEntity.projectId){
            if(!this.isEdit){  
            this.boqService.getBoqTransportationListForInsertByProjectId({id:projectEntity.projectId }, '')
                .pipe(finalize(() => this.isLoading = false))
                .subscribe((response: any) => {
                  if(response && response.success){
                    this.boqList= response.data;
                    response.data.forEach((element:any) => {
                      this.addControls(element,projectEntity.invoiceId);
                    });
                    this.empty_message= BOQ_INVOICE.ALL_RECORD_INSERTED_MESSAGE;
                  }
                });
              } else{
                this.addControls(this.data.element,projectEntity.invoiceId);
                  this.isLoading=false;
              }
            }
        });      
    }
    else{
      this.settpForm(this.data.element);
      this.isLoading=false;
    }    
  }

  addControls(data:any,invId:any) {
    const group = this.formbuilder.group({
      id:[data.pid],
      boqid:[data.id],
      invoiceid:[invId],
      description: [data.description], 
      currentmonth: [data.currentmonth,Validators.required]
    });
    this.controls.push(group);
  }

  get controls() {
    return this.tpForm.get('controls') as FormArray;
  }

  settpForm(data: any) {    
    this.tpForm.patchValue({
      id: data.id
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.isBtnClicked=true;
    this.sessionService.invoiceEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.invoiceId){
        this.tpForm.patchValue({invoiceid:response.invoiceId});
        if (this.isEdit) {
          this.transportService.updateConsultantTransportation(this.tpForm.get('controls')?.value[0], '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.dialogRef.close({ value: this.tpForm.get('controls')?.value[0], valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.tpForm.value.id=null;
          this.transportService.createConsultantTransportation(this.tpForm.get('controls')?.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                let responseData:any[]=[];
                response.data.forEach((element:any) => {
                  responseData.push({
                    id:element.boqid,
                    currentbillmonths:element.currentmonth,
                    invoiceid:element.id,
                    description:this.boqList.find((x:any)=>x.id==element.boqid)?.description,
                    rate:this.boqList.find((x:any)=>x.id==element.boqid)?.rate,
                    constructionperiod:this.boqList.find((x:any)=>x.id==element.boqid)?.constructionperiod,
                    dlpoandmperiod:this.boqList.find((x:any)=>x.id==element.boqid)?.dlpoandmperiod,
                    uptolastbill:0
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