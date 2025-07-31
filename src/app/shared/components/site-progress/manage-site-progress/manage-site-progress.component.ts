import { ChangeDetectorRef, Component,Inject,Optional,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';

import { ApprovalStatus, LetterEntity, LetterType } from '@app/shared/models/constant.config';
import { AttachLetterComponent } from '../../letters/attach-letter/attach-letter.component';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { SiteProgressInterfaceService } from '@app/shared/services/external/site-progress-interface.service';
import { finalize, take } from 'rxjs';
import { untilDestroyed } from '@app/core/until-destroyed';
import moment from 'moment';


@Component({
  selector: 'app-manage-site-progress',
  standalone: false,
  templateUrl: './manage-site-progress.component.html',
  styleUrl: './manage-site-progress.component.scss'
})
export class ManageSiteProgressComponent {

  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  siteProgressForm: FormGroup = new FormGroup({});
  deleteSiteProgress=false;
  letterInit=false;
  letterList:any[] = [];
  approvalStatusList:any[]=[];
  isApproved=false;
  readonly dialog = inject(MatDialog);
  
     private defaultdialogoptions:  MatDialogConfig = {
          minWidth: '900px', 
          disableClose: false,
          data: {},
    };


  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageSiteProgressComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService,  private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private letterService: LetterInterfaceService,
    private siteProgressService:SiteProgressInterfaceService,private cdr: ChangeDetectorRef){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit')
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteSiteProgress = true;
    }
    else
      this.isEdit = false;    
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Site Progress';
        break;
      case 'delete':
        this.title = 'Delete Site Progress';
        break;
      case 'edit':
        this.title = 'Edit Site Progress';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.siteProgressForm = this.formbuilder.group({
      id:[],
      contractorid:[],
      projectid:[],
      monthandyear:[],
      physicalprogress: [],
      financialprogress:[],
      submittedphysicalprogress: [],
      submittedfinancialprogress:[],
      statusid:[],
      submittedletterid:[],
      approvedletterid:[]
    });

    this.sessionService.projectEntitySubject$.pipe(take(1),finalize(()=>{
      this.isLoading=false
    }),untilDestroyed(this))
    .subscribe((entityData)=>{      
        if(entityData && this.data.letter_type!=LetterType.allLetter) {     
          this.siteProgressForm.patchValue({
            projectid:entityData.projectId,
            contractorid:entityData.isConsultant ? '' :entityData.contractorId
          });        
          this.sessionService.entityTypeSubject$.subscribe((response:any)=>{
            if(response) {
            let letterTypeitem = response.find((x:any)=>x.name.toLowerCase()==LetterType.SITE_PROGRESS.toLowerCase());
            if(letterTypeitem) {
              this.letterService.getLettersPartial({
                projectid:entityData.projectId,
                contractorid:entityData.isConsultant ? '' :entityData.contractorId,
                lettertypeid:letterTypeitem.id
              },'').subscribe((response:any)=>{
                if(response && response.success) {                  
                  this.letterList = response.data.map((item :any)=>({
                    id: item.id,
                    name:item.letternumber
                  }));
                  this.letterInit=true;
                }
              }) 
             }
            }     
          });
                  
        }
    });
    this.setValidators();
    this.sessionService.approvalStatusSubject$.subscribe((response)=>{
      if(response)
        this.approvalStatusList= response;      
    })
    if (this.isEdit || this.deleteSiteProgress) {
      this.setsiteProgressForm(this.data.element);
    }   
  }
  setValidators(){
    if(this.isEdit){
      const controls = ['physicalprogress','financialprogress', 'statusid'];
      controls.forEach((controlName) => {
        const control = this.siteProgressForm.get(controlName);  
          control?.clearValidators(); 
          control?.setValidators([Validators.required]);       
          control?.updateValueAndValidity();
      });
    } else {
      const controls = ['submittedphysicalprogress', 'submittedfinancialprogress'];
      controls.forEach((controlName) => {
        const control = this.siteProgressForm.get(controlName);  
          control?.clearValidators(); 
          control?.setValidators([Validators.required]);       
          control?.updateValueAndValidity();
      });
    }

  }

  ngOnDestroy(){}

  dateChange(data:any){
    this.siteProgressForm.patchValue({monthandyear:data});   
  }
  
  letterSelect(event:any){
    if(event && event.value){
      if(this.isEdit)
        this.siteProgressForm.patchValue({approvedletterid: event.value.id})
      else
        this.siteProgressForm.patchValue({submittedletterid: event.value.id})
    }    
  }
  setsiteProgressForm(data: any) { 
    this.siteProgressForm.patchValue({
      id:data.id,
      contractorid:data.contractorid,
      projectid:data.projectid,
      monthandyear:data.monthandyear,
      physicalprogress: data.physicalprogress,
      financialprogress:data.financialprogress,
      submittedphysicalprogress: data.submittedphysicalprogress,
      submittedfinancialprogress:data.submittedfinancialprogress,
      statusid:data.statusid,
      submittedletterid:data.submittedletterid,
      approvedletterid:data.approvedletterid
    });
    
    if(this.isEdit && data.statusid) {
        let item = this.approvalStatusList.find((x:any)=> x.id== this.data.element.statusid);
        if(item){
          this.isApproved = item.name.toLowerCase()==ApprovalStatus.APPROVED;
        }
    }
  }

  statusChange(event:any){
    if(event && event.source)    
      this.isApproved =  event.source.selected.viewValue.toLowerCase() ==ApprovalStatus.APPROVED;   
    const control = this.siteProgressForm.get('approvedletterid');  
    if(this.isApproved) {    
      control?.clearValidators(); 
      control?.setValidators([Validators.required]);
    } else
      control?.clearValidators();
      if(!this.isApproved){
        this.siteProgressForm.patchValue({
          physicalprogress:0,
          financialprogress:0
        })
      } 
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
 }

  submit(){  
    let formValue= this.siteProgressForm.value;    
    if (this.isEdit) {
      formValue.status= this.approvalStatusList.find(x=>x.id== this.siteProgressForm.get('statusid')?.value).name;
      this.siteProgressService.updateSiteProgress(this.siteProgressForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next: (response:any) => {
          if(response && response.success)
            this.dialogRef.close({ value: formValue, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.siteProgressForm.patchValue({statusid: this.approvalStatusList.find((x:any)=>x.name.toLowerCase()==ApprovalStatus.PENDING)?.id});
      formValue.status= this.approvalStatusList.find(x=>x.id== this.siteProgressForm.get('statusid')?.value).name;
      this.siteProgressForm.value.id=null;
      this.siteProgressService.createSiteProgress(this.siteProgressForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            formValue.id=response.data.id;
            this.dialogRef.close({ value: formValue, valid: true });
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
      this.siteProgressService.deleteSiteProgress({id:this.siteProgressForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.siteProgressForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }

newLetter(){
     const config = this.defaultdialogoptions;
    config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: this.route.snapshot.data['type'],
        letter_type : LetterType.SITE_PROGRESS,
        letter_entity: LetterEntity.CONTRACTOR
    };
    config.minWidth= '75vw';
    const dialogRef = this.dialog.open(AttachLetterComponent, config);
        dialogRef.afterClosed().subscribe((data:any) => {
          if (data && data.valid) {
            this.letterList.unshift({id:data.value.id, name:data.value.letternumber});
          }
          else {
          }
    });
  }
  getMonthandYear(data:any){
    if(data){
      return {month:moment(data).format('MMMM'),year :moment(data).format('YYYY')};
    }
    return {month:'-',year:'-'};
  } 
}


