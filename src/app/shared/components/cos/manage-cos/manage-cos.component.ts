import { ChangeDetectorRef, Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApprovalStatus, LetterEntity, LetterType } from '@app/shared/models/constant.config';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { AttachLetterComponent } from '../../letters/attach-letter/attach-letter.component';
import { CosInterfaceService } from '@app/shared/services/external/cos-interface.service';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { untilDestroyed } from '@app/core/until-destroyed';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-manage-cos',
  standalone: false,
  templateUrl: './manage-cos.component.html',
  styleUrl: './manage-cos.component.scss'
})
export class ManageCosComponent {

  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  cosForm: FormGroup = new FormGroup({});
  deleteCOS=false;
  letterInit=false;
  letterList:{id:string,name:string}[] = [];
  approvalStatusList:any[]=[];
  isApproved=false;
  readonly dialog = inject(MatDialog);
    
  private defaultdialogoptions:  MatDialogConfig = {    
    disableClose: false,
    data: {},
  };
  
  
    constructor(@Inject(MAT_DIALOG_DATA) data: any,
      @Optional() private dialogRef: MatDialogRef<ManageCosComponent>, private formbuilder: FormBuilder,
      private sessionService: SessionService,  private router: Router,private route: ActivatedRoute,
      private notifibarservice: NotifyBarService, private letterService: LetterInterfaceService,
      private eotService:CosInterfaceService,private cdr: ChangeDetectorRef){
        this.data = data || {};
    }
    
    checkMode(type: string) {
      if (type === 'edit' && !this.data.separate)
        this.isEdit = true;
      else if (type == 'delete') {
        this.dialogRef.updateSize('35%');
        this.deleteCOS = true;
      }
      else
        this.isEdit = false;    
    }
  
    getTitle(val: string) {
      switch (val) {
        case 'add':
          this.title = 'New COS';
          break;
        case 'delete':
          this.title = 'Delete COS';
          break;
        case 'edit':
          this.title = 'Edit COS';
          break;
      }
    }
  
    ngOnInit(){
      this.checkMode(this.data.type);
      this.getTitle(this.data.type);
      this.cosForm = this.formbuilder.group({ 
        id:[''],
        projectid:[''],
        contractorid:[''],
        code: [''],
        initiatedate :[],
        amount:[],
        initiateletterid:[],
        approvedamount:[],
        closedate:[],
        statusid:[],
        closeletterid:[]
      });
  
      this.sessionService.projectEntitySubject$.pipe(take(1),finalize(()=>{
        this.isLoading=false
      }),untilDestroyed(this))
      .subscribe((entityData)=>{      
          if(entityData && this.data.letter_type!=LetterType.allLetter) {     
            this.cosForm.patchValue({
              projectid:entityData.projectId,
              contractorid:entityData.isConsultant ? '' :entityData.contractorId
            });        
            this.sessionService.entityTypeSubject$.subscribe((response:any)=>{
              if(response) {
              let letterTypeitem = response.find((x:any)=>x.name.toLowerCase().includes(LetterType.COS.toLowerCase()));
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
      if (this.isEdit || this.deleteCOS) {
        this.setcosForm(this.data.element);
      }   
    }
    setValidators(){
      if(this.isEdit){
        const controls = ['closedate', 'statusid'];
        controls.forEach((controlName) => {
          const control = this.cosForm.get(controlName);  
            control?.clearValidators(); 
            control?.setValidators([Validators.required]);       
            control?.updateValueAndValidity();
        });
      } else {
        const controls = ['code', 'initiatedate', 'amount'];
        controls.forEach((controlName) => {
          const control = this.cosForm.get(controlName);  
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
          this.cosForm.patchValue({closeletterid: event.value.id})
        else
          this.cosForm.patchValue({initiateletterid: event.value.id})
      }    
    }
    setcosForm(data: any) { 
      this.cosForm.patchValue({
        id:data.id,
        code: data.code,
        initiatedate :data.initiatedate,
        amount:data.amount,
        initiateletterid: data.initiateletterid,
        approvedamount:data.approvedamount,
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
      const control = this.cosForm.get('approvedamount');  
      if(this.isApproved) {    
        control?.clearValidators(); 
        control?.setValidators([Validators.required]);
      } else {
        this.cosForm.patchValue({approvedamount:0});
        control?.clearValidators(); 
      }
    }
  
    ngAfterContentChecked() {
      this.cdr.detectChanges();
   }
  
    submit(){   
      let formsValue= this.cosForm.value;
      formsValue.status = this.approvalStatusList.find(x=>x.id== this.cosForm.get('statusid')?.value)?.name;
      console.log(formsValue);
      console.log(this.cosForm.value);
      if (this.isEdit) {
        this.eotService.updateCOS(this.cosForm.value, '')
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
        this.cosForm.patchValue({id:null});
        this.sessionService.approvalStatusSubject$.subscribe((response:any)=>{
          if(response){
            console.log(response);
           this.cosForm.patchValue({statusid: response.find((x:any)=>x.name.toLowerCase()==ApprovalStatus.PENDING)?.id});
          }
        })
        formsValue.statusid = this.cosForm.get('statusid')?.value;
        formsValue.status = this.approvalStatusList.find(x=>x.id== this.cosForm.get('statusid')?.value)?.name;
        this.eotService.createCOS(this.cosForm.value, '')
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
        this.eotService.deleteCOS({id:this.cosForm.value.id}, '')
         .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
             this.dialogRef.close({ value: this.cosForm.value, valid: true });
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
          letter_type : LetterType.COS,
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
  
  
  