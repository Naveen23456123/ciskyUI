import { ChangeDetectorRef, Component, inject, Inject, OnDestroy, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { AttachLetterComponent } from '../../letters/attach-letter/attach-letter.component';
import { ApprovalStatus, LetterEntity, LetterType } from '@app/shared/models/constant.config';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { finalize, take } from 'rxjs';
import { untilDestroyed } from '@app/core/until-destroyed';
import { EotInterfaceService } from '@app/shared/services/external/eot-interface.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { ProjectReportInterfaceService } from '@app/shared/services/external/project-report-interface.service';
import moment from 'moment';


@Component({
  selector: 'app-manage-project-reports',
  standalone: false,
  templateUrl: './manage-project-reports.component.html',
  styleUrl: './manage-project-reports.component.scss'
})
export class ManageProjectReportsComponent {

  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  isClicked=false;
  reportForm: FormGroup = new FormGroup({});
  deleteReport=false;
  readonly dialog = inject(MatDialog);
  typeList:any[]=[];
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };


  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageProjectReportsComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService,  private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private commonService: CommonInterfaceService,
    private reportService:ProjectReportInterfaceService,private cdr: ChangeDetectorRef){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteReport = true;
    }
    else
      this.isEdit = false;    
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Report';
        break;
      case 'delete':
        this.title = 'Delete Report';
        break;
      case 'edit':
        this.title = 'Edit Report';
        break;
    }
  }

    ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.reportForm = this.formbuilder.group({
      id:[],
      projectid:[],
      contractorid:[], 
      typeid:[, Validators.required],
      name: [, Validators.required],
      no :[, Validators.required],
      letterno:[, Validators.required],
      date:[, Validators.required],
      companyid:[],
      remark:[],
      file:[, Validators.required],
      docaddress:[]
    });
    this.sessionService.projectEntitySubject$.pipe(take(1),untilDestroyed(this))
    .subscribe((entityData)=>{     
      console.log(entityData); 
      if(entityData && this.data.letter_type!=LetterType.allLetter) {     
        this.reportForm.patchValue({
          projectid:entityData.projectId,
          companyid:entityData.companyId,
          contractorid:entityData.isConsultant ? '' :entityData.contractorId
        }); 
        this.commonService.getPReportList({},'').pipe(finalize(()=>{this.isLoading=false}))
        .subscribe((response:any)=>{
          if(response && response.success){
            this.typeList= response.data;
          }
          if (this.isEdit || this.deleteReport) {
            this.setReportForm(this.data.element);
          }
        })
      }
    });   
  }
  ngOnDestroy(){
    
  }
  filedata(fileData:any) { 
    this.reportForm.patchValue({file:fileData});
   }
  setReportForm(data: any) {
    this.reportForm.patchValue({
      id:data.id,
      typeid:data.typeid,
      projectid:data.projectid, 
      contractorid: data.contractorid,
      name :data.name,
      no:data.no,
      letterno:data.letterno,
      date:data.date,
      remark:data.remark
    });
    const control = this.reportForm.get('file');
    control?.clearValidators();     
    control?.updateValueAndValidity();
  }

  submit(){  
    this.isClicked=true;    
    let formData = new FormData(); 
      Object.entries(this.reportForm.controls).forEach(([key, value]) => {
        if(key !='date'){          
        if (value.value != null) {
          formData.append(key, value.value);
        } else {
          formData.delete(key);
        }
      }
    });
     
    if (this.isEdit) {
      formData.append('date', moment(this.reportForm.controls['date']?.value)?.toISOString());
      this.reportService.updatePReport(this.reportForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success){
              this.reportForm.value.type=this.typeList.find((x:any)=>x.id==this.reportForm.controls["typeid"]?.value)?.name;
              this.dialogRef.close({ value: this.reportForm.value, valid: true });
            }
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.reportForm.value.id=null;
      console.log(this.reportForm.value);
      this.reportService.createPReport(formData, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success)  {
              this.reportForm.controls["id"].setValue(response.data.id);
              this.reportForm.controls["docaddress"].setValue(response.data.docaddress);
              this.reportForm.value.type=this.typeList.find((x:any)=>x.id==this.reportForm.controls["typeid"]?.value)?.name;
              this.dialogRef.close({ value: this.reportForm.value, valid: true });
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

  delete() {
    this.reportService.deletePReport({id:this.reportForm.value.id}, '')
      .pipe(finalize(() => { this.isLoading = false; })).subscribe({
      next:(response: any) => {
        if (response && response.success) 
          this.dialogRef.close({ value: this.reportForm.value, valid: true });
    },
    error: (err: any) => {
        this.dialogRef.close(err);
      }
    });
  }
}


