import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { BoqRoadSurveyInterfaceService } from '@app/shared/services/external/boq/boq-road-survey-interface.service';
import { InvRoadSurveyInterfaceService } from '@app/shared/services/external/invoice/inv-road-survey-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';


@Component({
  selector: 'app-manage-road-survey',
  standalone: false,
  templateUrl: './manage-road-survey.component.html',
  styleUrl: './manage-road-survey.component.scss'
})
export class ManageRoadSurveyComponent {
  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;  
  isHeading: boolean = false;
  title: string='Add';
  headingForm: FormGroup = new FormGroup({});
  rsForm: FormGroup = new FormGroup({});
  deleters=false;
  readonly dialog = inject(MatDialog);
  isBtnClicked=false;
   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageRoadSurveyComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private roadSurveyService:InvRoadSurveyInterfaceService){
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
      projectid:[],
      km :[,Validators.required],
      numberofsurveys:[,Validators.required],
      ratepersurvey:[,Validators.required],
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
    if (this.isEdit || this.deleters) {
      this.setrsForm(this.data.element);
    }
    this.isLoading=false;
  }

  setrsForm(data: any) {    
    this.rsForm.setValue({
      id: data.id,
      projectid:data.projectid,
      km :data.km,
      numberofsurveys:data.numberofsurveys,
      ratepersurvey:data.ratepersurvey,
      description:data.description,
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.isBtnClicked=true;
    this.sessionService.projectEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.projectId){
        this.rsForm.patchValue({projectid:response.projectId});
        if (this.isEdit) {
          this.roadSurveyService.updateBoqRoadSurvey(this.rsForm.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.rsForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
                this.dialogRef.close({ value: this.rsForm.value, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.rsForm.value.id=null;
          let formData= {
            projectid:response.projectId,
            scopes:[this.rsForm.value]
          }
          this.roadSurveyService.createBoqRoadSurvey(formData, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next:(response: any) => {
              if (response && response.success) { 
                this.rsForm.addControl('totalamount', this.formbuilder.control(response.data.scopes[0].totalamount));
                this.rsForm.controls["id"].setValue(response.data.scopes[0].id);
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
      this.roadSurveyService.deleteBoqRoadSurvey({id:this.rsForm.value.id}, '')
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
  desc_submit(){
    this.isBtnClicked=true;
    this.roadSurveyService.UpdateBoqRoadSurveyDescription(this.headingForm.value, '')
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