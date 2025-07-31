import { Component,inject,Inject,Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { ApprovalStatus, LetterEntity, LetterType, WorkTypeStatus } from '@app/shared/models/constant.config';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { MilestoneInterfaceService } from '@app/shared/services/external/milestone-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, forkJoin, Subscription } from 'rxjs';
import { AttachLetterComponent } from '../../letters/attach-letter/attach-letter.component';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-manage-milestone',
  standalone: false,
  templateUrl: './manage-milestone.component.html',
  styleUrl: './manage-milestone.component.scss'
})
export class ManageMilestoneComponent {
  public data: any;
  isLoading=true;
  milestoneForm : FormGroup = new FormGroup({});
  isEdit=false;
  title='';
  deleteMilestone=false;
  statusList:any[]=[];
  isAchvd=false;
  letterInit=false;
  letterList:any=[];
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '900px', 
    disableClose: false,
    data: {},
  };
  readonly dialog = inject(MatDialog);
  public subscription:Subscription = new Subscription();

   constructor(@Inject(MAT_DIALOG_DATA) data: any,
      @Optional() private dialogRef: MatDialogRef<ManageMilestoneComponent>, private formbuilder: FormBuilder,
      private sessionService: SessionService,  private router: Router,private route: ActivatedRoute,
      private notifibarservice: NotifyBarService,private commonService: CommonInterfaceService,
      private mileStoneService:MilestoneInterfaceService, private letterService:LetterInterfaceService
    ) {
      this.data = data || {};
    }
  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.milestoneForm = this.formbuilder.group({
      id:[],
      projectid:[],
      contractorid:[],
      name:[''],
      appointeddate: [''],
      days:[''],
      milestonedate:[''],
      statusid:[],
      actualdate:[],
      rescheduledate:[],
      actualletterid:[],
      rescheduleletterid:[]
    });
    this.subscribeChange();
    if(!this.deleteMilestone){
      this.setValidators();
      this.sessionService.projectEntitySubject$.pipe(untilDestroyed(this)).subscribe((entityData:any)=>{
        this.isLoading=false;
        if(entityData){
          this.milestoneForm.patchValue({
            projectid:entityData.projectId,
            contractorid:entityData.isConsultant ? '' :entityData.contractorId
          });
          this.commonService.getWorkStatusTypeList({},'').subscribe((workTypeResponse:any)=>{
              if(workTypeResponse){
                this.statusList= workTypeResponse.data; 
              }
            })
          if(this.isEdit){            
            this.isLoading=true;
            this.subscription= this.sessionService.entityTypeSubject$.subscribe((response:any)=>{
              if(response) {
              let letterTypeitem = response.find((x:any)=>x.name.toLowerCase()==LetterType.MILESTONE.toLowerCase());
              if(letterTypeitem) {
                forkJoin({
                  letterAPI:this.letterService.getLettersPartial({
                    projectid:entityData.projectId,
                    contractorid:entityData.isConsultant ? '' :entityData.contractorId,
                    lettertypeid:letterTypeitem.id
                  },''),
                  statusAPI:this.commonService.getWorkStatusTypeList({},'')
                }).pipe(finalize(()=> this.isLoading=false)).subscribe((response:any)=>{
                  if(response && response.letterAPI.success) {                  
                    this.letterList = response.letterAPI.data.map((item :any)=>({
                      id: item.id,
                      name:item.letternumber
                    }));
                    this.letterInit=true;
                  }
                  if(response && response.statusAPI.success){
                    this.statusList= response.statusAPI.data;
                  }
                  if(this.isEdit){
                    this.setMileStoneForm(this.data.element);
                  }
                }) 
               }
              }     
            });
          }
        }        
      })
    }else{
      this.isLoading=false;
      this.milestoneForm.patchValue({
        id:this.data.element.id,
        name:this.data.element.name
      })
    }

  }
  subscribeChange(){  
    const daysControl = this.milestoneForm.get('days');    
    if (daysControl) {
      daysControl.valueChanges.subscribe(value => {      
        this.milestoneForm.get('milestonedate')?.setValue(this.addDays());
      });      
    }    
  }
  addDays(): Date|null {
    let daysControl = this.milestoneForm.get('days');
    let appointeddate = this.milestoneForm.value.appointeddate;
    if(appointeddate && daysControl){      
      const result = new Date(appointeddate);     
      result.setDate(result.getDate() + daysControl.value);
      this.milestoneForm.get('milestonedate')?.setValue(result);
      return result;
    }
    return null;
  }
  onDateChanged(event: MatDatepickerInputEvent<Date>) {
    this.milestoneForm.patchValue({appointeddate:event.value});  
    this.addDays();  
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  setMileStoneForm(data:any){
    this.milestoneForm.patchValue({
      id:data.id,
      projectid:data.projectid,
      contractorid:data.contractorid,
      name:data.name,
      appointeddate:data.appointeddate,
      days:data.days,
      milestonedate:data.milestonedate,
      statusid:data.statusid,
      actualdate:data.actualdate,
      rescheduledate:data.rescheduledate,
      actualletterid:data.actualletterid,
      rescheduleletterid:data.rescheduleletterid
    })
    this.statusValidator(this.statusList.find((x:any)=>x.id==data.statusid)?.name);
  }
  checkMode(type: string) {
    if (type === 'edit' )
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteMilestone = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New MileStone';
        break;
      case 'delete':
        this.title = 'Delete MileStone';
        break;
      case 'edit':
        this.title = 'Edit MileStone';
        break;
    }
  }
  letterSelect(event:any){
    if(event && event.value){
      if(this.isEdit && this.isAchvd)
        this.milestoneForm.patchValue({actualletterid: event.value.id})
      else
        this.milestoneForm.patchValue({rescheduleletterid: event.value.id})
    }    
  }
  statusChange(event:any){    
    if(event && event.source){
      this.statusValidator(event.source.selected.viewValue.toLowerCase());
    } 
  }
  statusValidator(value:string){
    if(value){
      this.isAchvd =  value.toLowerCase() ==WorkTypeStatus.ACHIEVED;
      let controls =['actualdate', 'rescheduledate'];
      controls.forEach((controlName) => {
        const control = this.milestoneForm.get(controlName);
          control?.clearValidators();     
          control?.updateValueAndValidity();
      }); 
      if(this.isAchvd)
        controls = ['actualdate'];
      else
        controls = ['rescheduledate'];

      controls.forEach((controlName) => {
        const control = this.milestoneForm.get(controlName);  
          control?.clearValidators(); 
          control?.setValidators([Validators.required]);       
          control?.updateValueAndValidity();
      });  
    } 
  }
  setValidators(){
    if(this.isEdit){
      const controls = ['statusid'];
      controls.forEach((controlName) => {
        const control = this.milestoneForm.get(controlName);  
          control?.clearValidators(); 
          control?.setValidators([Validators.required]);       
          control?.updateValueAndValidity();
      });
    } else {
      const controls = ['name', 'appointeddate', 'days','milestonedate'];
      controls.forEach((controlName) => {
        const control = this.milestoneForm.get(controlName);  
          control?.clearValidators(); 
          control?.setValidators([Validators.required]);       
          control?.updateValueAndValidity();
      });
    }
  }
  newLetter(){
      const config = this.defaultdialogoptions;
      config.data = {
          pageGuid: this.route.snapshot.data['pageGuid'],
          type: this.route.snapshot.data['type'],
          letter_type : LetterType.MILESTONE,
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

  submit(){
    //const companyName= this.subCompanyList.find(x=>x.id==this.designationForm.get('companyId')?.value)?.name; 
    let formValues= this.milestoneForm.value;
    formValues.status= this.statusList.find(x=>x.id==this.milestoneForm.get('statusid')?.value)?.name;  
    if (this.isEdit) {
      this.mileStoneService.updateMileStone(formValues, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
              this.dialogRef.close({ value: formValues, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.milestoneForm.patchValue({statusid: this.statusList.find((x:any)=>x.name.toLowerCase()==WorkTypeStatus.NOT_ACHIEVED)?.id});
      formValues.status= this.statusList.find(x=>x.id==this.milestoneForm.get('statusid')?.value)?.name;;
      this.milestoneForm.value.id=null;
      this.mileStoneService.createMileStone(this.milestoneForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success)  {
              formValues.id=response.data.id;
              this.dialogRef.close({ value: formValues, valid: true });
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
      this.mileStoneService.deleteMileStone({id:this.milestoneForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.milestoneForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}
