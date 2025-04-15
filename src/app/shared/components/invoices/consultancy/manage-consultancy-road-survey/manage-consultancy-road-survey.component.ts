import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
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
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageConsultancyRoadSurveyComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private roadSurveyService: InvRoadSurveyInterfaceService){
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
      description :[],
      km:[],
      rate:[],
      numberofsurveys:[],
      previousbillkm:[],
      currentbillkm:[]
    });
    
    if (this.isEdit || this.deleters) {
      this.setrsForm(this.data.element);
    }
    this.isLoading=false;
  }

  setrsForm(data: any) {    
    this.rsForm.patchValue({
      id: data.id,
      description :data.description,
      km:data.km,
      rate:data.rate,
      numberofsurveys:data.numberofsurveys,
      previousbillkm:data.previousbillkm,
      currentbillkm:data.currentbillkm
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.sessionService.invoiceEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.invoiceId){
        this.rsForm.patchValue({invoiceid:response.invoiceId});
        if (this.isEdit) {
          this.roadSurveyService.updateConsultantRoadSurvey(this.rsForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.dialogRef.close({ value: this.rsForm.value, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.rsForm.value.id=null;
          this.roadSurveyService.createConsultantRoadSurvey(this.rsForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.rsForm.controls["id"].setValue(response.data.id);
                this.dialogRef.close({ value: this.rsForm.value, valid: true });
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


