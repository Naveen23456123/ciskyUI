import { Component, inject, Inject, Optional } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { BOQ_INVOICE } from '@app/shared/models/constant.config';
import { BoqRoadSurveyInterfaceService } from '@app/shared/services/external/boq/boq-road-survey-interface.service';
import { InvRoadSurveyInterfaceService } from '@app/shared/services/external/invoice/inv-road-survey-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-manage-consultancy-road-survey',
  standalone: false,
  templateUrl: './manage-consultancy-road-survey.component.html',
  styleUrl: './manage-consultancy-road-survey.component.scss'
})
export class ManageConsultancyRoadSurveyComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  rsForm: FormGroup = new FormGroup({});
  deleters=false;
  isBtnClicked=false;
  readonly dialog = inject(MatDialog);
  boqList:any[]=[];
  empty_message= '';
   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageConsultancyRoadSurveyComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private boqService: InvRoadSurveyInterfaceService, private roadSurveyService: InvRoadSurveyInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleters = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Road Survey';
        break;
      case 'delete':
        this.title = 'Delete Road Survey';
        break;
      case 'edit':
        this.title = 'Edit Road Survey';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.rsForm = this.formbuilder.group({ 
      id: [''],
      invoiceid:[],
      controls: this.formbuilder.array([])
    });
    if(!this.deleters){ 
      this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
        if(projectEntity && projectEntity.projectId){
          if(!this.isEdit){  
            this.boqService.getBoqRoadSurveyListForInsertByProjectId({invid:projectEntity.invoiceId,id:projectEntity.projectId }, '')
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
    } else{
      this.setrsForm(this.data.element);
      this.isLoading=false;
    }  
  }
  addControls(data:any,invId:any) {
    const group = this.formbuilder.group({
      id:[data.pid],
      boqid:[data.id],
      invoiceid:[invId],
      description: [data.description], 
      currentbillkm: [data.currentbillkm,Validators.required],
      currentbillamount:[data.currentbill]
    });
    this.controls.push(group);
  }
  subscribeChange(){   
    (this.rsForm.get('controls') as FormArray).controls.forEach((group: AbstractControl, index: number) => {
      const quantityControl = group.get('currentbillkm');
      if (quantityControl) {
        quantityControl.valueChanges.subscribe(value => {
           group.get('currentbillamount')?.setValue(value*(this.boqList.find(x=>x.id==group.get('boqid')?.value).ratepersurvey));
        });
      }
    });
  }
  get controls() {
    return this.rsForm.get('controls') as FormArray;
  }
  setrsForm(data: any) {    
    this.rsForm.patchValue({
      id: data.id
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.isBtnClicked=true;
    this.sessionService.invoiceEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.invoiceId){
        this.rsForm.patchValue({invoiceid:response.invoiceId});
        if (this.isEdit) {
          this.roadSurveyService.updateConsultantRoadSurvey(this.rsForm.get('controls')?.value[0], '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.boqList= response.data;
                this.dialogRef.close({ value: this.rsForm.get('controls')?.value[0], valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.rsForm.value.id=null;
          this.roadSurveyService.createConsultantRoadSurvey(this.rsForm.get('controls')?.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                let responseData:any[]=[];
                response.data.forEach((element:any) => {
                  responseData.push({
                    id:element.boqid,
                    currentbillkm:element.currentbillkm,
                    invoiceid:element.id,
                    km:this.boqList.find((x:any)=>x.id==element.boqid)?.km,
                    description:this.boqList.find((x:any)=>x.id==element.boqid)?.description,
                    rate:this.boqList.find((x:any)=>x.id==element.boqid)?.ratepersurvey,
                    numberofsurveys:this.boqList.find((x:any)=>x.id==element.boqid)?.numberofsurveys,
                    previousbillkm:this.boqList.find((x:any)=>x.id==element.boqid)?.uptolastbill
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
      this.roadSurveyService.deleteConsultantRoadSurvey({id:this.rsForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.rsForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
    });
  }
}


