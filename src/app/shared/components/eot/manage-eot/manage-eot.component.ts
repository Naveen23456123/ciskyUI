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


@Component({
  selector: 'app-manage-eot',
  standalone: false,
  templateUrl: './manage-eot.component.html',
  styleUrl: './manage-eot.component.scss'
})
export class ManageEotComponent implements OnDestroy {

  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  eotForm: FormGroup = new FormGroup({});
  deleteEOT=false;
  letterInit=false;
  letterList:{id:string,name:string}[] = [];
  approvalStatusList:any[]=[];
  isApproved=false;
  readonly dialog = inject(MatDialog);
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };


  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageEotComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService,  private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private letterService: LetterInterfaceService,
    private eotService:EotInterfaceService,private cdr: ChangeDetectorRef){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteEOT = true;
    }
    else
      this.isEdit = false;    
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New EOT';
        break;
      case 'delete':
        this.title = 'Delete EOT';
        break;
      case 'edit':
        this.title = 'Edit EOT';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.eotForm = this.formbuilder.group({ 
      id:[''],
      projectid:[''],
      contractorid:[''],
      code: [''],
      initiatedate :[],
      days:[],
      initiateletterid:[],
      approveddays:[],
      closedate:[],
      statusid:[],
      closeletterid:[]
    });

    this.sessionService.projectEntitySubject$.pipe(take(1),finalize(()=>{
      this.isLoading=false
    }),untilDestroyed(this))
    .subscribe((entityData)=>{      
        if(entityData && this.data.letter_type!=LetterType.allLetter) {     
          this.eotForm.patchValue({
            projectid:entityData.projectId,
            contractorid:entityData.isConsultant ? '' :entityData.contractorId
          });        
          this.sessionService.entityTypeSubject$.subscribe((response:any)=>{
            if(response) {
            let letterTypeitem = response.find((x:any)=>x.name.toLowerCase()==LetterType.EOT.toLowerCase());
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
    if (this.isEdit || this.deleteEOT) {
      this.setEotForm(this.data.element);
    }   
  }
  setValidators(){
    if(this.isEdit){
      const controls = ['closedate', 'statusid'];
      controls.forEach((controlName) => {
        const control = this.eotForm.get(controlName);  
          control?.clearValidators(); 
          control?.setValidators([Validators.required]);       
          control?.updateValueAndValidity();
      });
    } else {
      const controls = ['code', 'initiatedate', 'days'];
      controls.forEach((controlName) => {
        const control = this.eotForm.get(controlName);  
          control?.clearValidators(); 
          control?.setValidators([Validators.required]);       
          control?.updateValueAndValidity();
      });
    }
  }

  ngOnDestroy(){}

  letterSelect(event:any){
    if(event && event.value){
      if(this.isEdit)
        this.eotForm.patchValue({closeletterid: event.value.id})
      else
        this.eotForm.patchValue({initiateletterid: event.value.id})
    }    
  }
  setEotForm(data: any) { 
    this.eotForm.patchValue({
      id:data.id,
      code: data.code,
      initiatedate :data.initiatedate,
      days:data.days,
      initiateletterid: data.initiateletterid,
      approveddays:data.approveddays,
      closedate:data.closedate,
      statusid:data.statusid,
      closeletterid:data.closeletterid
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
    const control = this.eotForm.get('approveddays');  
    if(this.isApproved) {    
      control?.clearValidators(); 
      control?.setValidators([Validators.required]);
    } else{
      this.eotForm.patchValue({approveddays:0});
      control?.clearValidators(); 
    }
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
 }

  submit(){  
    let formsValue= this.eotForm.value;
    formsValue.status = this.approvalStatusList.find(x=>x.id== this.eotForm.get('statusid')?.value)?.name;
    if (this.isEdit) {
      this.eotService.updateEOT(this.eotForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next: (response:any) => {
          if(response && response.success)
            this.dialogRef.close({ value: formsValue, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.eotForm.value.id=null;
      this.eotService.createEOT(this.eotForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
          if (response && response.success) {           
            formsValue.id=response.data.id;
            this.dialogRef.close({ value: formsValue, valid: true });
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
      this.eotService.deleteEOT({id:this.eotForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.eotForm.value, valid: true });
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
        letter_type : LetterType.EOT,
        letter_entity: LetterEntity.CONSULTANT
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
}


