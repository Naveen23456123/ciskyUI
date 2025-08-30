import { ChangeDetectorRef, Component, ComponentRef, Inject, Optional,Type,ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LetterEntity, LetterType } from '@app/shared/models/constant.config';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, forkJoin,Observable, Subscription, take, takeUntil } from 'rxjs';
import { AttachFileComponent } from '../../attach-file/attach-file.component';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { ProjectService } from '@app/projects/project.service';
import { DepartmentInterfaceService } from '@app/shared/services/external/department-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { ContractorInterfaceService } from '@app/shared/services/external/contractor-interface.service';
import { untilDestroyed } from '@app/core/until-destroyed';
import moment from 'moment';

@Component({
  selector: 'app-attach-letter',
  standalone: false,
  templateUrl: './attach-letter.component.html',
  styleUrl: './attach-letter.component.scss'
})
export class AttachLetterComponent {
  isLoading = true;
  data:any;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  letterForm: FormGroup = new FormGroup({});
  status:any[] = [];
  exchangeType:any[] = [];
  deptType:any[]  =[];
  letterList:any[]=[];
  projectList:any[]=[];
  replyByList:any[]=[];
  workOwnerList:any[]=[];
  letterTypeList:any[]=[];
  contractorList:any[]=[];
  isContractor = false;
  letterInit= false;
  isSend=true;
  isLetterType=false;
  deleteLetter:boolean=false;
  isLetterEntity= false;
  letterObj:any;
  associateLetterIds:any=[];
  isBtnClicked=false;
  subscription: Subscription = new Subscription();
  projectName='';
  componentsReferences = Array<ComponentRef<AttachFileComponent>>()

    constructor(@Inject(MAT_DIALOG_DATA) data: any,private viewContainerRef: ViewContainerRef,
    @Optional() private dialogRef: MatDialogRef<AttachLetterComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService,  private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService,private commonService: CommonInterfaceService,
    private cdr: ChangeDetectorRef, private letterService:LetterInterfaceService,
    private projectService:ProjectInterfaceService, private deptService:DepartmentInterfaceService,
    private contractorService:ContractorInterfaceService
  ) {
  
    this.data = data || {};
    dialogRef.updateSize("600px");
    if(data.letter_type==LetterType.SITE_PROGRESS)
      this.title= "Site Progress";
    else if(data.letter_type==LetterType.EOT)
      this.title= "EOT";
    else if(data.letter_type==LetterType.COS)
      this.title= "COS";
    else if(data.letter_type==LetterType.MILESTONE)
      this.title= "MileStone";   
    else if(data.letter_type==LetterType.BILLING)
      this.title= LetterType.BILLING;   
    else if(data.letter_type==LetterType.CONTRACTORBILL)
      this.title= LetterType.CONTRACTORBILL;   
    else if(data.letter_type==LetterType.CONTRACTORREOMMENDED)
      this.title= LetterType.CONTRACTORREOMMENDED;   
    else if(data.letter_type==LetterType.allLetter){
      this.title= "";
    }
    else{
      this.title= "";
    }
    if(data.letter_entity && data.letter_entity!=LetterEntity.ANY){
      this.isLetterEntity=true; 
    }
    if(data.letter_type)
      this.isLetterType=true;
   
  }

  ngOnInit(): void { 
    //this.letterObj= this.data.element;  
    this.checkMode(this.data.type);    
    this.getTitle(this.data.type);     
    this.letterForm = this.formbuilder.group({
      id:[],
      projectid:['', Validators.required],
      relatedtoid:['',Validators.required],
      contractorid:[''],
      exchangetypeid:['',Validators.required],
      lettertypeid:['',Validators.required],
      letternumber: ['',Validators.required],
      letterdate:['',Validators.required],
      subject:['',Validators.required],
      statusid:['',Validators.required],
      departmentid:['',Validators.required],
      letterfrom:['',Validators.required], 
      letterto:['',Validators.required],     
      remarks:[''],
      associatedletterids:[[]],
      replybyid:[''],  
      files: this.formbuilder.array([])   
      
    });   
    if(!this.deleteLetter){
      const entitySubscription =  this.sessionService.projectEntitySubject$.subscribe((entityData)=>{      
      if(entityData && this.isLetterEntity) {
        this.isContractor= !entityData.isConsultant;     
        this.letterForm.patchValue({
          projectid:entityData.projectId,
          contractorid:entityData.isConsultant ? '' :entityData.contractorId,
          relatedtoid : entityData.relatedToId
        });
      } 
      this.sessionService.entityTypeSubject$.subscribe((response:any)=>{
        if(response)
        this.letterTypeList= response;
      })

      if(this.isLetterType){
        this.sessionService.entityTypeSubject$.subscribe((response:any)=>{     
          if(response && response.length>0){ 
          let letterTypeitem = response.find((x:any)=>x.name.toLowerCase()==this.data.letter_type.toLowerCase());
          if(letterTypeitem)
            this.letterForm.patchValue({lettertypeid:letterTypeitem.id});
          }
        });
      }
      let apiCalls: any = {
        deptAPI:this.deptService.getDepartmentListByOrgId({  }, ''),
        projectAPI:this.projectService.getAllProjectPartialDetailsByOrdIg({  }, ''),
        letterPartialAPI:this.letterService.getLettersPartial({ 
          projectid:this.letterForm.controls['projectid'].value,
          contractorid:this.letterForm.controls['contractorid'].value,
          lettertypeid: this.letterForm.controls['lettertypeid'].value
        }, '')
      };
      if(this.isEdit)
        apiCalls.letterAPI = this.letterService.getLetterById({ id:this.data.element.id }, '');
      
      forkJoin(apiCalls).pipe(take(1),finalize(() => { this.isLoading = false }),untilDestroyed(this))
        .subscribe((response:any) => {
          if(response && response.deptAPI)
            this.deptType = response.deptAPI.data; 

          if(response.projectAPI)
            this.projectList = response.projectAPI.data; 

          if(response.letterPartialAPI){
            this.letterList =  response.letterPartialAPI.data.map((item :any)=>({
              id: item.id,
              name:item.letternumber
            })); 
            this.letterInit=true;
          }  
          if(response.letterAPI && response.letterAPI.success)
            this.letterObj= response.letterAPI.data; 
        
          if (this.isEdit) {
            this.setletterForm(this.letterObj);
          }
          else
            this.addDocControls();

        });
      });
      this.subscription.add(entitySubscription);
      this.sessionService.generalStatusSubject$.subscribe((response:any)=>{
        if(response)
        this.status= response;
      });
      this.sessionService.exchangeTypeSubject$.subscribe((response:any)=>{
        if(response)
          this.exchangeType= response;
      })
      this.sessionService.workOwnerSubject$.subscribe((response:any)=>{
        if(response)
        this.workOwnerList= response;
      });
      this.sessionService.officeTypeSubject$.subscribe((response:any)=>{
        if(response)
        this.replyByList= response;
      });    
      this.letterForm.get('relatedtoid')?.valueChanges.subscribe(value => {
        this.setWorkOwner(value);
      });
    }
    else{
      this.letterForm.patchValue({
        letternumber:this.data.element.letternumber,
        id:this.data.element.id
      });
      this.isLoading=false;
    }   
  }

  // projectChange(event:any){
  //   if(event.value){
  //     this.contractorService.getAllContractorPartialDetailsByProjectId({
  //       projectId: event.value},'')
  //       .subscribe((response:any)=>{
  //       if(response && response.success)
  //         this.contractorList = response.data;
  //     })
  //   }
  // }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  projectChange(data:any=null){    
    if(data && data.value){
      this.letterForm.patchValue({projectid:data.value.id});
      this.projectName= data.value.projectshortname;
      this.contractorService.getAllContractorPartialDetailsByProjectId({
        projectId: data.value.id},'')
        .subscribe((response:any)=>{
        if(response && response.success)
          this.contractorList = response.data;
      })
    }
  }
    checkMode(type: string) {
      if (type === 'edit' && !this.data.separate)
        this.isEdit = true;
      else if (type == 'delete') {
        this.dialogRef.updateSize('35%');
        this.deleteLetter = true;
      }
      else
        this.isEdit = false;
    }
  
    getTitle(val: string) {
      switch (val) {
        case 'add':
          this.title = '';
          break;
        case 'delete':
          this.title = 'Delete Letter';
          break;
        case 'edit':
          this.title = '';
          break;
      }
      if(this.isLetterEntity && !this.isLetterType)
        this.title="";
    }

    get files() {
      return this.letterForm.get('files') as FormArray;
    }

    addDocControls() {
      const group = this.formbuilder.group({
        id:[],
        name: ['',Validators.required], 
        file: ['',Validators.required]
      });
      this.files.push(group);
    }
    removeDocControl(index: number) {
      this.files.removeAt(index);
    }
  

    ngAfterViewInit(){
      if(!this.deleteLetter)
        this.exchangeTypeChange();
    }

    exchangeTypeChange(element:any=null){
      if(element!=null){
       console.log(this.exchangeType.filter(x=>x.name.toLowerCase()==element.value.toLowerCase()));
      }
      if(element==null) { 
        this.letterForm.patchValue({exchangeTypeId: this.exchangeType.filter(x=>x.name.toLowerCase()=='send')[0].id})
       
      }  else{
        this.letterForm.patchValue({exchangeTypeId:this.exchangeType.filter(x=>x.name.toLowerCase()==element.source.triggerValue.toLowerCase())[0].id});
       }
       if(element!=null)
       this.isSend= element.source.triggerValue.toLowerCase()=='send';

       this.cdr.detectChanges();
    }

    add_file(){
      const fileComponent = this.viewContainerRef.createComponent(AttachFileComponent);
      this.componentsReferences.push(fileComponent);
    }

    letterSelect(event:any){
      if(event.value){
        this.letterForm.patchValue({associatedletterids:event.value.map((item:any)=>item.id)});  
      }
    }
    setletterForm(data: any) {
      if(!this.isEdit)
      this.projectChange({value:data.projectid})
      this.isContractor= data.contractorId==null;
      this.letterForm.patchValue({
      id:data.id,
      projectid:data.projectid,
      relatedtoid:data.relatedtoid,
      contractorid:data.contractorid,
      exchangetypeid:data.exchangetypeid,
      lettertypeid:data.lettertypeid,
      letternumber: data.letternumber,
      letterdate:data.letterdate,
      subject:data.subject,
      statusid:data.statusid,
      departmentid:data.departmentid,
      letterfrom:data.letterfrom, 
      letterto:data.letterto,     
      remarks:data.remarks,
      replybyid:data.replybyid,   
      associatedletterids:data.associatedletterids
    });
    this.associateLetterIds= this.letterObj.associatedletterids;
    this.setWorkOwner(data.relatedtoid);
  }

  setWorkOwner(data:any){
    if(data) {    
      const selectedOption = this.workOwnerList.find(option => option.id === data);     
      this.isContractor = (selectedOption ? selectedOption.name : '').toLowerCase()!=LetterEntity.CONSULTANT.toLowerCase();
    }
  }

  submit(){
    this.isBtnClicked=true;
      let formData = new FormData(); 
      Object.entries(this.letterForm.controls).forEach(([key, value]) => {
        if(key!='files' && key !='associatedletterids' && key !='letterdate'){          
        if (value.value != null) {
          formData.append(key, value.value);
        } else {
          formData.delete(key);
        }
      }
    });
    if(this.letterForm.controls['letterdate']?.value)
    formData.append('letterdate', moment(this.letterForm.controls['letterdate']?.value).toISOString()); 

    this.letterForm.controls['associatedletterids']?.value?.forEach((id:any, index:any) => {
      formData.append(`associatedletterids[${index}]`, id.toString()); 
    });   
    let formsValue = this.letterForm.value;   
    formsValue.lettertype= this.letterTypeList.find(x=>x.id== this.letterForm.get('lettertypeid')?.value).name;
    formsValue.status= this.status.find(x=>x.id== this.letterForm.get('statusid')?.value).name;

      if (this.isEdit) {
        this.letterForm.controls['files']?.value?.forEach((item:any, index:any) => {                
          formData.append(`files[${index}].name`, item.name);
          formData.append(`files[${index}].file`, item.file);
        });
        formData.append('id', this.letterForm.controls['id']?.value);
        this.letterService.updateLetter(formData, '')
          .pipe(finalize(() => { this.isLoading = this.isBtnClicked= false; })).subscribe({
            next: (response:any) => {
            if(response && response.success)
              this.dialogRef.close({ value: formsValue, valid: true });
          },
          error: (err: any) => {
              this.dialogRef.close(err);
            }
          });
      } else {
        this.letterForm.value.id=null;
        formsValue.project= this.projectName;
        this.letterForm.controls['files']?.value?.forEach((item:any, index:any) => {  
          formData.append(`files[${index}].name`, item.name);
          formData.append(`files[${index}].file`, item.file);
        });
        this.letterService.createLetter(formData, '')
          .pipe(finalize(() => { this.isLoading = this.isBtnClicked= false; })).subscribe({
            next:(response: any) => {
            if (response && response.success) {
              this.letterForm.controls["id"].setValue(response.data.id);
              formsValue.id=response.data.id;
              this.dialogRef.close({ value: formsValue, valid: true });
            } else {
              //this.dialogRef.close({ value: null, valid: false });
            }
          },
           error: (err: any) => {
              //this.dialogRef.close(err);
            }
        });
      }
    }
    delete(){
      this.letterService.deleteLetter({id:this.letterForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.letterForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
    }
    onDocNameUpdate(value:string, index:number){
      (this.letterForm.controls['files'] as FormArray).at(index).patchValue({
        name:value
      });
      
    }
    fileUploded(file:any,index:number){      
      (this.letterForm.get('files') as FormArray).at(index).patchValue({
        file:file
      });
    }
 
}
