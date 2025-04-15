import { Component,Inject,Optional,inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  title: string='Add';
  boqForm: FormGroup = new FormGroup({});
  deleteboq=false;
  employeeList:any[] = [];
  companyList:any[] = [];
  empInit=true;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageBoqAttendenceComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private notifibarservice: NotifyBarService, private attendenceService:AttendenceInterfaceService,
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
      employeeid:[''],
      monthandyear:[],
      totaldays:[],
      manmonths:[],
      id :[]
    });
    this.subCompanyService.getSubCompanyListByOrgId({},'').pipe(finalize(()=> this.isLoading=false))
    .subscribe((response:any)=>{
      if(response && response.success)
        this.companyList= response.data;
    })
    if (this.isEdit || this.deleteboq) {
      this.setBoqForm(this.data.element);
      this.companyChange();
    }   
    this.isLoading=false;
  }

  setBoqForm(data: any) {    
    this.boqForm.setValue({
      companyid:data.companyid,
      employeeid:data.employeeid,
      monthandyear:data.monthandyear,
      totaldays:data.totaldays,
      manmonths:data.manmonths,
      id :data.id,
    });
  }

  companyChange(){
    this.empInit=false;
    let compId= this.boqForm.controls['companyid'].value;
    if(compId){
       this.employeeService.getSiteEmployeeParital({companyId:compId},'')
       .subscribe((response:any)=>{
         if(response && response.success)
          this.employeeList= response.data.map((item:any)=>({
            id:item.id,
            name:item.code+ ' - '+item.name,
            text:item.name
          }));
          this.empInit=true;
       })
    }
  }

  empSelect(event:any){
    if(event.value){
      this.boqForm.patchValue({employeeid:event.value.id});  
    }
  }

  dateChange(data:any){
    this.boqForm.patchValue({monthandyear:data.format()});   
  }
  submit(){   
    let formValue = this.boqForm.value;
    formValue.company= this.companyList.find(x=>x.id== this.boqForm.get('companyid')?.value).name;
    formValue.employee= this.employeeList.find(x=>x.id== this.boqForm.get('employeeid')?.value).text;
    if (this.isEdit) {
      formValue.projectname= this.data.element.projectname;
      this.attendenceService.updateBoqAttendence(this.boqForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
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
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            this.boqForm.controls["id"].setValue(response.data.id);
            formValue.projectname= response.data.projectname;
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

