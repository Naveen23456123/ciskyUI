import { ChangeDetectorRef, Component,Inject,Optional,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { AttendenceInterfaceService } from '@app/shared/services/external/attendence-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-manage-boq-attendence',
  standalone: false,
  templateUrl: './manage-boq-attendence.component.html',
  styleUrl: './manage-boq-attendence.component.scss'
})
export class ManageBoqAttendenceComponent {

  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  message:any='';
  title: string='Add';
  boqForm: FormGroup = new FormGroup({});
  deleteboq=false;
  employeeList:any[] = [];
  companyList:any[] = [];
  empInit=true;
  projectName='';
  isBtnClicked=false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageBoqAttendenceComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,private cdr:ChangeDetectorRef,
     private attendenceService:AttendenceInterfaceService,
    private subCompanyService:SubCompanyInterfaceService, private employeeService:EmployeeInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteboq = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New BOQ Attendence';
        break;
      case 'delete':
        this.title = 'Delete BOQ Attendence';
        break;
      case 'edit':
        this.title = 'Edit BOQ Attendence';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.boqForm = this.formbuilder.group({
      companyid:[],
      projectid:[],
      employeeid:['',Validators.required],
      monthandyear:[],
      totaldays:[,Validators.required],
      manmonths:[,Validators.required],
      id :[]
    });
    this.subCompanyService.getSubCompanyListByOrgId({},'').pipe(finalize(()=> this.isLoading=false))
    .subscribe((response:any)=>{
      if(response && response.success)
        this.companyList= response.data;
    })
    if (this.isEdit || this.deleteboq) {
      this.setBoqForm(this.data.element);
      this.projectChange();
    }   
    this.isLoading=false;
  }

  setBoqForm(data: any) { 
    this.boqForm.patchValue({
      employeeid:data.employeeid,
      projectid:data.projectid,
      monthandyear:data.monthandyear,
      totaldays:data.totaldays,
      manmonths:data.manmonths,
      id :data.id,
    });
  }
  ngAfterViewInit(){
    this.cdr.detectChanges();
  }
  projectChange(data:any=null){
    this.empInit=false;
    if(data && data.value){
      this.projectName=data.value.projectshortname;
      this.boqForm.patchValue({
        projectid:data.value.id,
        companyid:data.value.companyid
      });
    }
    let projectId = this.boqForm.controls['projectid'].value;
    if(projectId){
      this.employeeService.getSiteEmployeeParital({projectid: projectId},'')
      .pipe(finalize(()=> this.isLoading=false)).subscribe((response:any)=>{
       if(response && response.success)
        this.employeeList= response.data.map((item:any)=>({
          id:item.id,
          name:item.code+ ' - '+item.name,
          text:item.name
        }));
        this.empInit=true;
      });
    }
  }
  empSelect(event:any){
    if(event.value){
      this.boqForm.patchValue({employeeid:event.value.id});  
    }
  }

  dateChange(data:any){
    this.boqForm.patchValue({monthandyear:data});   
  }
  submit(){
    this.isBtnClicked=true;   
    this.message=null;
    let formValue = this.boqForm.value;
    formValue.projectname= this.projectName;
    formValue.monthandyear= this.boqForm.controls["monthandyear"].value?.toISOString();
    formValue.employee= this.employeeList.find(x=>x.id== this.boqForm.get('employeeid')?.value).text;
    if (this.isEdit) {
      formValue.projectname= this.projectName;
      this.attendenceService.updateBoqAttendence(this.boqForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked=false })).subscribe({
          next: (response:any) => {
          if(response && response.success)
            console.log(formValue);
            this.dialogRef.close({ value: formValue, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.boqForm.value.id=null;
      this.attendenceService.createBoqAttendence(this.boqForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked=false })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            this.boqForm.controls["id"].setValue(response.data.id);
            formValue.id= response.data.id;
            
            formValue.projectname= this.projectName;
            this.dialogRef.close({ value: formValue, valid: true });
          } else {
            this.message= response.message;
          }
        },
         error: (err: any) => {
            this.dialogRef.close(err);
          }
      });
    }
  }

  delete() {
      this.attendenceService.deleteBoqAttendence({id:this.boqForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.boqForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}

