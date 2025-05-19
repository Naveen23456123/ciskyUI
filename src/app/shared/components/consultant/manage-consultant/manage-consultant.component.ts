import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, forkJoin } from 'rxjs';


@Component({
  selector: 'app-manage-consultant',
  standalone: false,
  templateUrl: './manage-consultant.component.html',
  styleUrl: './manage-consultant.component.scss'
})
export class ManageConsultantComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='';
  consultantForm: FormGroup = new FormGroup({});
  deleteConsultant= false;
  subCompanyList:{id:string,name:string}[] = [];
  employeeList:{id:string,name:string}[] = [];
  roleList:{id:string,name:string}[] = [];
  workTypeList:{id:string,name:string}[] = [];
  enggList:{id:string,name:string}[] = [];
  contractModeList:{id:string,name:string}[] = [];
  accountList:{id:string,name:string}[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
  @Optional() private dialogRef: MatDialogRef<ManageConsultantComponent>, private formbuilder: FormBuilder,
  private sessionservice: SessionService,  private router: Router,
  private notifibarservice: NotifyBarService, private projectService: ProjectInterfaceService,
  private employeeService:EmployeeInterfaceService, private subCompanyService:SubCompanyInterfaceService
) {

  this.data = data || {};
  
}
ngOnInit(): void {
  this.checkMode(this.data.type);
  this.getTitle(this.data.type);
  this.consultantForm = this.formbuilder.group({
    id:[],
    tenderId:[],
    projectLocation:[],
    companyId:[],
    workTypeId:[],
    ourRoleId:[],
    projectLength:[],
    bidDueDate:[''],
    loaDate:[''],
    agreementDate:[''],
    commencementDate:[''],
    constructionDuration:[],
    oandmDuration:[],
    projectDuration:[''],
    scheduleConstructionCompleteDate:[''],
    scheduleCompleteDate:[''],
    actualCompleteDate:[''],
    actualConstructionCompleteDate:[''],
    authEngineerId:[],
    cordinatorId:[],
    remark:[],
    consultancyFees:[],
    contractModeId:[],
    lead:[],
    jv:[],
    association:[],
    ourShare:[],
    client:[],
    clientAddress:[],
    siteAddress:[],
    accountDetailId:[] 
    
  });
  forkJoin({
      empPartialApi:this.employeeService.getSiteEmployeeParital({},''),
      subCompanyApi:this.subCompanyService.getSubCompanyListByOrgId({},'')
    }).pipe(finalize(()=>{this.isLoading=false})).subscribe((response:any)=>{
      if(response.empPartialApi && response.empPartialApi.success)
        this.employeeList= response.empPartialApi.data;
      if(response.subCompanyApi && response.subCompanyApi.success)
        this.subCompanyList= response.subCompanyApi.data;
    });
  
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
  if (this.isEdit || this.deleteConsultant) { 
    this.setConsultantForm(this.data.element);
  }
//console.log(this.consultantForm.controls['name'].value);
this.consultantForm.valueChanges.subscribe(values => {
  const { constructionDuration, oandmDuration } = values;
  const total = (parseFloat(constructionDuration) || 0) + (parseFloat(oandmDuration) || 0);
  this.consultantForm.get('projectDuration')?.setValue(total, { emitEvent: false });
});
this.isLoading = false;
}

checkMode(type: string) {
  if (type === 'edit' && !this.data.separate)
    this.isEdit = true;
  else if (type == 'delete') {
    this.dialogRef.updateSize('35%');
    this.deleteConsultant = true;
  }
  else
    this.isEdit = false;
}

getTitle(val: string) {
  switch (val) {
    case 'add':
      this.title = 'New Consultant';
      break;
    case 'delete':
      this.title = 'Delete Consultant';
      break;
    case 'edit':
      this.title = 'Edit Consultant';
      break;
  }
}
setConsultantForm(data: any) { 
  this.consultantForm.patchValue({
    id:data.id,
    tenderId:data.tenderid,
    projectLocation:data.projectlocation,
    companyId:data.companyid,
    workTypeId:data.worktypeid,
    ourRoleId:data.ourroleid,
    projectLength:data.projectlength,
    bidDueDate:data.bidduedate,
    loaDate:data.loadate??'',
    agreementDate:data.agreementdate??'',
    commencementDate:data.commencementdate,
    constructionDuration:data.constructionduration,
    oandmDuration:data.oandmduration,
    projectDuration:data.projectduration,
    scheduleConstructionCompleteDate:data.scheduleconstructioncompletedate,
    scheduleCompleteDate:data.schedulecompletedate==null?'':data.schedulecompletedate,
    actualCompleteDate:data.actualcompletedate,
    actualConstructionCompleteDate:data.actualconstructioncompletedate,
    authEngineerId:data.authengineerid,
    cordinatorId:data.cordinatorid,
    remark:data.remark,
    consultancyFees:data.consultancyfees,
    contractModeId:data.contractmodeid,
    lead:data.lead,
    jv:data.jv,
    association:data.association,
    ourShare:data.ourshare,
    client:data.client,
    clientAddress:data.clientaddress,
    siteAddress:data.siteaddress,
    accountDetailId:data.accountdetailid ??''   
  });
}

submit() {
 let formValues= this.consultantForm.value;
 formValues.company= this.subCompanyList.find(x=>x.id== this.consultantForm.get('companyId')?.value)?.name;
 formValues.ourrole= this.roleList.find(x=>x.id== this.consultantForm.get('ourRoleId')?.value)?.name;
 formValues.worktype= this.workTypeList.find(x=>x.id== this.consultantForm.get('workTypeId')?.value)?.name;
 formValues.authengineer= this.employeeList.find(x=>x.id== this.consultantForm.get('authEngineerId')?.value)?.name;
 formValues.cordinator= this.employeeList.find(x=>x.id== this.consultantForm.get('cordinatorId')?.value)?.name;
 formValues.contractmode= this.contractModeList.find(x=>x.id== this.consultantForm.get('contractModeId')?.value)?.name;


  this.projectService.updateProject(this.consultantForm.value, '')
      .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next: (response:any) => {
        if(response && response.success)
          this.dialogRef.close({ value: formValues, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
  });
}
delete(){

}

closeDialog(): void {
  //console.log(this.dialogRef.getState());
  console.log(this.dialogRef);
  this.dialogRef.close(); 
}
}
