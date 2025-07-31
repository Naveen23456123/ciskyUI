import { ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApprovalStatus } from '@app/shared/models/constant.config';
import { ItemInterfaceService } from '@app/shared/services/external/item-interface.service';
import { OfficeInterfaceService } from '@app/shared/services/external/office-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-ofc-rent-billing',
  standalone: false,
  templateUrl: './manage-ofc-rent-billing.component.html',
  styleUrl: './manage-ofc-rent-billing.component.scss'
})
export class ManageOfcRentBillingComponent {
  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  ofcForm: FormGroup = new FormGroup({});
  deleteOfc=false;
  subCompanyList:any[] = [];
  isClicked=false;
  isAllProject = new FormControl(true);
  isAllOffice = new FormControl(true);
  isProjectrequired:boolean=false;
  isAllOfcDisabled=false;
  ofcList:any[]=[];
  projectName='';
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageOfcRentBillingComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,private cdr:ChangeDetectorRef,
    private officeService: OfficeInterfaceService, private companyService:SubCompanyInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteOfc = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'Generate Office Billing';
        break;
      case 'delete':
        this.title = 'Delete Office Billing';
        break;
      case 'edit':
        this.title = 'Edit Office Billing';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.ofcForm = this.formbuilder.group({ 
      id:[],
      projectid: [],
      officeid :[],
      companyid:[],
      monthandyear:[]
    });
    this.companyService.getSubCompanyListByOrgId({},'')
    .pipe(finalize(()=>this.isLoading=false)).subscribe((response:any)=>{
      if(response && response.success){
        this.subCompanyList= response.data;
      }
    })
    if (this.isEdit || this.deleteOfc) {
      this.projectName= this.data.element.project;
      this.setOfcForm(this.data.element);
    }
  }

  setOfcForm(data: any) {    
    this.ofcForm.patchValue({      
      id:data.id,
      projectid: data.projectid,
      officeid :data.officeid,
      companyid:data.companyid,
      monthandyear:data.monthandyear,
    });
  }
  dateChange(data:any){
    this.ofcForm.patchValue({monthandyear:data});   
  }
  ngAfterViewInit(){
    this.cdr.detectChanges();
  }
  ofcChange(){
    // let vehicle = this.vehicleList.find((x:any)=>x.id== this.vehicleForm.controls['vehicleid'].value);
    // if(vehicle) {
    //   this.vehicleForm.patchValue({       
    //     fixedkm:vehicle.fixedkm,
    //     extraamountperkmafterfixedkm:vehicle.extraamountafterfixedkm,
    //     fixedamount:vehicle.fixedbillamount
    //   });
    //   this.onExtraChange();
    // }
  }
  onProjecttoggleChange(event:any){
    this.isAllProject.setValue(event.checked);
    if(this.isAllProject.value)
      this.isAllOffice.setValue(event.checked);
    this.isAllOfcDisabled= event.checked;
    this.setValidation();
  }
  onvehicletoggleChange(event:any){
    this.isAllOffice.setValue(event.checked);
    this.setValidation();
  }
  setValidation(){
    const pcontrol = this.ofcForm.get('projectid');
    const ocontrol = this.ofcForm.get('officeid');
    pcontrol?.clearValidators(); 
    pcontrol?.clearValidators(); 
    ocontrol?.clearValidators();   
    if(!this.isAllOffice.value)
      ocontrol?.setValidators([Validators.required]); 
    if(!this.isAllProject.value)
      pcontrol?.setValidators([Validators.required]); 
      
    pcontrol?.updateValueAndValidity();
    ocontrol?.updateValueAndValidity();   
  }
  projectChange(data:any=null){
    console.log(data);
    if(data && data.value){     
      this.ofcForm.patchValue({
        projectid:data.value.id,
        companyid:data.value.companyid
      });
      this.projectName= data.value.projectshortname;
    }
    let projectId = this.ofcForm.controls['projectid'].value;
    if(projectId){
    
      this.officeService.getOfficeRentPartialList([projectId],'')
      .pipe(finalize(()=> this.isLoading=false)).subscribe((response:any)=>{
       if(response && response.success)
         this.ofcList= response.data;
        console.log(this.ofcList.length);
      });
    }
  }
  bulkBillingObj:any={};
  submit(){   
    this.isClicked=true;
    if (this.isEdit) {
      // this.officeService.updateItem(this.ofcForm.value, '')
      //   .pipe(finalize(() => { this.isLoading = false; this.isClicked=false })).subscribe({
      //     next:(response: any) => {
      //       if (response && response.success) 
      //         this.dialogRef.close({ value: this.ofcForm.value, valid: true });
      //   },
      //   error: (err: any) => {
      //       this.dialogRef.close(err);
      //     }
      //   });
    } else {
      this.sessionservice.approvalStatusSubject$.subscribe((response:any)=>{
        if(response){
          this.bulkBillingObj.statusid=response.find((x:any)=>x.name.toLowerCase()==ApprovalStatus.PENDING)?.id;
        }
      })
      this.ofcForm.value.id=null;
      this.bulkBillingObj.monthandyear=this.ofcForm.get('monthandyear')?.value;
      this.bulkBillingObj.allproject=this.isAllProject.value;
      this.bulkBillingObj.moduleid=this.data.pageGuid;
      this.bulkBillingObj.alloffice=this.isAllOffice.value;
      if(this.isAllProject.value && this.isAllProject.value){
       
      }
      else if (!this.isAllProject.value && this.isAllOffice.value){       
      this.bulkBillingObj.projectid=this.ofcForm.get('projectid')?.value;
      this.bulkBillingObj.companyid=this.ofcForm.get('companyid')?.value;      
      
      }
      else {
        this.bulkBillingObj.projectid=this.ofcForm.get('projectid')?.value;
        this.bulkBillingObj.companyid=this.ofcForm.get('companyid')?.value;    
        this.bulkBillingObj.officeid=this.ofcForm.get('officeid')?.value;    
      }
      this.officeService.bulkOfficeBilling(this.bulkBillingObj, '')
        .pipe(finalize(() => { this.isLoading = false;this.isClicked=false })).subscribe({
          next:(response: any) => {
            if (response && response.success)  {     
              if(!this.isAllProject.value){
                response.data.forEach((element:any) => {
                  element.project= this.projectName;
                });
              }         
              this.dialogRef.close({ value: response.data, valid: true });
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
      this.officeService.deleteOfficeBilling({id:this.ofcForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.ofcForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
 
}


