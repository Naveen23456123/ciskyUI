import { Component, Inject, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { DesignationInterfaceService } from '@app/shared/services/external/designation-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SiteControlInterfaceService } from '@app/shared/services/external/site-control-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { ValidatorService } from '@app/shared/services/validator.service';
import moment from 'moment';
import { finalize, forkJoin, take } from 'rxjs';

@Component({
  selector: 'app-manage-employee',
  standalone: false,
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.scss'
})
export class ManageEmployeeComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  employeeForm: FormGroup = new FormGroup({});
  deleteEmployee=false;
  activeOrgId='123';
  subCompanyList:any[] = [];
  empTypeList:any[] = [];
  empRoleList:any[] = [];
  empdesignationList:any[] = [];
  empstatusList:any[] = [];
  genderList:any[] = [];
  maritalList:any[] = [];
  projectList:any[]=[];
  isBtnClicked=false;
  projectInit=true;
  hasProject=false;
  empObj:any;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageEmployeeComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService,  private router: Router,private validatorService:ValidatorService,
    private notifibarservice: NotifyBarService, private commonService:CommonInterfaceService,
    private employeeService:EmployeeInterfaceService,private projectService:ProjectInterfaceService,
    private subCompanyService:SubCompanyInterfaceService, private designationService:DesignationInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit')
      this.isEdit = true;
    else if (type == 'delete') {
      this.deleteEmployee = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Employee';
        break;
      case 'delete':
        this.title = 'Delete Employee';
        break;
      case 'edit':
        this.title = 'Edit Employee';
        break;
    }
  }

  ngOnInit() {     
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.employeeForm = this.formbuilder.group({ 
      id: [''],
      Code:['',{ 
        validators: [Validators.required], 
        asyncValidators: this.isEdit ? [] :[this.validatorService.validateUsername()],
        updateOn: 'blur'
      }],
      CompanyId :[,Validators.required],
      projectid:[],
      name:['',Validators.required],
      emailId:['',Validators.required],
      PhoneNumber:['',Validators.required],
      TypeId:['',Validators.required],
      designationId:['',Validators.required],
      RoleId:[,Validators.required],
      statusId:[],
      joiningDate:[],
      dateOfBirth:[],
      genderId:[],
      qualification:[],
      maritalStatusId:[],
      emergencyPersonName:[],
      EmergencyContactNumber:[],
      relation:[],
      AccountNumber:[],
      ifscCode:[],
      bankName:[],
      bankAddress:[],
      AadharNumber :[],
      UanNumber:[],
      PanNumber:[],
      currentAddress:[],
      emergencyAddress:[],
      files: this.formbuilder.array([])
    }); 
    if(!this.deleteEmployee){
      let apiCalls:any= {
        subCompanyAPI: this.subCompanyService.getSubCompanyListByOrgId({},''), 
        roleAPI:this.commonService.getEmployeeRoleList({ organizationId: this.activeOrgId }, '')        
      };
       this.sessionService.projectEntitySubject$.pipe(take(1),finalize(()=>{
            this.isLoading=false
          }),untilDestroyed(this))
          .subscribe((entityData)=>{ 
            if(entityData){     
                this.employeeForm.patchValue({projectid:entityData.projectId}); 
                this.hasProject=true;
          }
        });
      
      if(this.isEdit){
        apiCalls.empById = this.employeeService.getSiteEmployeeById({id: this.data.element.id},'')
      } 
      forkJoin(apiCalls).pipe(finalize(() => { this.isLoading = false }))
        .subscribe((response:any) => {        
            if(response && response.roleAPI && response.roleAPI.success)
              this.empRoleList=response.roleAPI.data;        
            if(response.subCompanyAPI && response.subCompanyAPI.success)
              this.subCompanyList= response.subCompanyAPI.data;          
            if(response && response.empById && response.empById.success)
              this.empObj= response.empById.data;
            this.sessionService.genderTypeSubject$.subscribe((response)=>{
              if(response)
                this.genderList=response;
            });
            this.sessionService.statusSubject$.subscribe((response)=>{
            if(response)
                this.empstatusList=response;
            });
            this.sessionService.maritalStatusSubject$.subscribe((response)=>{
              if(response)
                this.maritalList=response;
            });
            this.sessionService.employeeTypeSubject$.subscribe((response)=>{
              if(response)
                this.empTypeList=response;
            });
            if(this.isEdit){
              this.setEmployeeForm(this.empObj);
              this.companyChange();
            }
      });
    
    }
    else{
      this.isLoading=false;
      this.employeeForm.patchValue({
        id: this.data.element.id,
        name: this.data.element.name
      });
    }
  }

  ngOnDestroy(){}
  onUsernameBlur() {
    const username = this.employeeForm.get('Code')?.value;

    if (!username) return;

  this.employeeService.validateCode({code:username},'').subscribe((response:any)=>{
    if(response){
      console.log(response);
    }
  })
  }
  companyChange(event:any=null){
    this.projectInit=false;
    if(event)
    this.employeeForm.patchValue({CompanyId:event.value});
    forkJoin({
      projectAPI:this.projectService.getAllProjectPartialDetailsByOrdIg({compId:this.employeeForm.get('CompanyId')?.value},''),
      desgAPI:this.designationService.getDesignationList({companyId:this.employeeForm.get('CompanyId')?.value},'')
    }).pipe(finalize(() => { }))
    .subscribe((response:any) => {
      if(response && response.projectAPI && response.projectAPI.success){
        this.projectList= response.projectAPI.data.map((item:any)=>({
          id:item.id,
          name:item.projectcode + ' - '+ item.projectshortname
         }));
         this.projectInit=true;
      }
      if(response && response.desgAPI && response.desgAPI.success){
        this.empdesignationList = response.desgAPI.data;
      }
    });
  
  }

  projectSelect(event:any){
    if(event && event.value)
      this.employeeForm.patchValue({projectid:event.value.id});
  }

  setEmployeeForm(newdata: any) {
    this.employeeForm.patchValue({
      id:newdata.id,
      Code:newdata.code,
      projectid:newdata.projectid,
      CompanyId :newdata.companyid,
      name:newdata.name,
      emailId:newdata.emailid,
      PhoneNumber:newdata.phonenumber,
      TypeId:newdata.typeid,
      designationId: newdata.designationid,
      RoleId: newdata.roleid,
      statusId:newdata.statusid,
      joiningDate:newdata.joiningdate,
      dateOfBirth:newdata.dateofbirth,
      genderId:newdata.genderid,
      qualification:newdata.qualification,
      maritalStatusId:newdata.maritalstatusid,
      emergencyPersonName:newdata.emergencypersonname,
      EmergencyContactNumber:newdata.emergencycontactnumber,
      relation:newdata.relation,
      AccountNumber:newdata.accountnumber,
      ifscCode:newdata.ifsccode,
      bankName: newdata.bankname,
      bankAddress:newdata.bankaddress,
      AadharNumber : newdata.aadharnumber,
      UanNumber:newdata.uannumber,
      PanNumber:newdata.pannumber,
      currentAddress:newdata.currentaddress,
      emergencyAddress: newdata.emergencyaddress
    }); 
  }

  get files() {
    return this.employeeForm.get('files') as FormArray;
  }

  addDocControls() {
    const group = this.formbuilder.group({
      id:[],
      name: ['',Validators.required], 
      file: ['',Validators.required]
    });
    this.files.push(group);
  }

  onDocNameUpdate(value:string, index:number){
    (this.employeeForm.controls['files'] as FormArray).at(index).patchValue({
      name:value
    });
  }

  fileUploded(file:any,index:number){      
    (this.employeeForm.get('files') as FormArray).at(index).patchValue({
      file:file
    });
  }

  removeDocControl(index: number) {
    this.files.removeAt(index);
  }
  submit(){
    this.isBtnClicked=true;
    let formData = new FormData(); 
    Object.entries(this.employeeForm.controls).forEach(([key, value]) => {
      if(key!='files' && key!='joiningDate' && key!='dateOfBirth'){          
      if (value.value != null) {
        formData.append(key, value.value);
      } else {
        formData.delete(key);
      }
    }
  });   
    formData.append('joiningDate', moment(this.employeeForm.controls['joiningDate']?.value)?.toISOString());
    formData.append('dateOfBirth', moment(this.employeeForm.controls['dateOfBirth']?.value)?.toISOString());
    let formvalue= this.employeeForm.value;   
    formvalue.designation=this.empdesignationList.find(x=>x.id==this.employeeForm.get('designationId')?.value).name;
    if (this.isEdit) {
      this.employeeForm.controls['files']?.value?.forEach((item:any, index:any) => {                
        formData.append(`files[${index}].name`, item.name);
        formData.append(`files[${index}].file`, item.file);
      });
      this.employeeService.updateEmployee(formData, '')
        .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false  })).subscribe({
          next: (response:any) => {
          if(response && response.success)
            this.dialogRef.close({ value: formvalue, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.employeeForm.value.id=null;
      this.employeeForm.controls['files']?.value?.forEach((item:any, index:any) => {                
        formData.append(`files[${index}].name`, item.name);
        formData.append(`files[${index}].file`, item.file);
      });
      console.log(this.employeeForm.value);
      console.log(formData);
      this.employeeService.createEmployee(formData, '')
        .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false  })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            formvalue.id=response.data.id;            
            this.dialogRef.close({ value: formvalue, valid: true });
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
      this.employeeService.deleteEmployee({id:this.employeeForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.employeeForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}

