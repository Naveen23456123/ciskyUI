import { Component, Inject,inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  standalone:false,
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.scss'
})
export class ManageProjectComponent {
  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='New Project';
  projectForm: FormGroup = new FormGroup({});
  subCompanyList:{id:string,name:string}[] = [];
  workTypeList:{id:string,name:string}[] = [];
  roleList:{id:string,name:string}[] = [];
  empList:any[] = [];
  contractModeList:{id:string,name:string}[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
  @Optional() private dialogRef: MatDialogRef<ManageProjectComponent>, 
  private formbuilder: FormBuilder,
  private sessionservice: SessionService,  private router: Router,
  private notifibarservice: NotifyBarService,private subCompanyService:SubCompanyInterfaceService,
  private employeeService:EmployeeInterfaceService, private projectService:ProjectInterfaceService
) {

  this.data = data || {};
}
ngOnInit(): void {
  forkJoin({
    empPartialApi:this.employeeService.getSiteEmployeeParital({},''),
    subCompanyApi:this.subCompanyService.getSubCompanyListByOrgId({},'')
  }).pipe(finalize(()=>{this.isLoading=false})).subscribe((response:any)=>{
    if(response.empPartialApi && response.empPartialApi.success)
      this.empList= response.empPartialApi.data;
    if(response.subCompanyApi && response.subCompanyApi.success)
      this.subCompanyList= response.subCompanyApi.data;
  })

  this.sessionservice.projectWorkTypeSubject$.subscribe((reposnse)=>{
    if(reposnse)
      this.workTypeList= reposnse;
  });
  this.sessionservice.ourRoleSubject$.subscribe((reposnse)=>{
    if(reposnse)
      this.roleList= reposnse;
  });
  this.sessionservice.contractModeSubject$.subscribe((reposnse)=>{
    if(reposnse)
      this.contractModeList= reposnse;
  })

  this.projectForm = this.formbuilder.group({ 
    id: [''],
    tenderId:['',Validators.required],
    projectCode:['',Validators.required],
    projectShortName:[''],
    projectLocation:[''],
    projectName:[''],
    keyPoints:[''],
    companyId:[''],
    workTypeId:[''],
    ourRoleId:[''],
    projectLength:[''],
    bidDueDate:[''],
    loadate:[''],
    aggrementDate:[''],
    commencementDate:[''],
    projectDuration:[''],
    oandmDuration:[],
    constructionDuration:[],
    jvShare:[],
    scheduleConstructionCompleteDate:[''],
    authEngineerId:[''],
    remark:[''],
    cordinatorId:[''],
    consultancyFees:[''],
    contractModeId:[''],
    lead:[''],
    jv:[''],
    ourShare:[''],
    association:[''],
    client:[''],
    regionalOfficeName:[''],
    regionalOfficeAddress:[''],
    directorname:[],
    directorLocation:[],
    membername:[],
    memberlocation:[],
    piuAddress:[''],
    siteAddress:['']
  });
  this.projectForm.valueChanges.subscribe(values => {
    const { constructionDuration, oandmDuration } = values;
    const total = (parseFloat(constructionDuration) || 0) + (parseFloat(oandmDuration) || 0);
    this.projectForm.get('projectDuration')?.setValue(total, { emitEvent: false });
  });
}



submit(){  
  
  if (this.isEdit) {
    this.projectService.updateProject(this.projectForm.value, '')
      .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next: (response:any) => {
        if(response && response.success)
          this.dialogRef.close({ value: this.projectForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  } else {
    this.projectForm.value.id=null;
    this.projectService.createProject(this.projectForm.value, '')
      .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
        if (response && response.success) {
          this.projectForm.controls["id"].setValue(response.data.id);
          this.dialogRef.close({ value: this.projectForm.value, valid: true });
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
    this.projectService.deleteProject({id:this.projectForm.value.id}, '')
     .pipe(finalize(() => { this.isLoading = false; })).subscribe({
      next:(response: any) => {
        if (response && response.success) 
         this.dialogRef.close({ value: this.projectForm.value, valid: true });
    },
    error: (err: any) => {
        this.dialogRef.close(err);
      }
    });
}

closeDialog(): void {
  //console.log(this.dialogRef.getState());
  console.log(this.dialogRef);
  this.dialogRef.close(); 
}


}
