import { Component, Inject, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminInterfaceService } from '@app/shared/services/external/admin-interface.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { SettingInterfaceService } from '@app/shared/services/external/setting-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-manage-approval',
  standalone: false,
  templateUrl: './manage-approval.component.html',
  styleUrl: './manage-approval.component.scss'
})
export class ManageApprovalComponent {
 public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  approvalForm: FormGroup = new FormGroup({});
  deleteItem=false;
  moduleList:any[] = [];
  roleList:any[] = [];
  empList:any[] = [];
  empInit=false;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageApprovalComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService,  private router: Router,
    private adminService: AdminInterfaceService, private commomService:CommonInterfaceService,
    private approvalService:SettingInterfaceService, private employeeService:EmployeeInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteItem = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Item';
        break;
      case 'delete':
        this.title = 'Delete Item';
        break;
      case 'edit':
        this.title = 'Edit Item';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.approvalForm = this.formbuilder.group({       
      levels: this.formbuilder.array([]),
      moduleid:[],
      id :[]
    });
    forkJoin({
      roleAPI: this.commomService.getApprovalRoles(),
      moduleAPI: this.adminService.getBillinModuleList()
    }).pipe(finalize(()=> this.isLoading=false)).subscribe((response:any)=>{
      if(response && response.roleAPI && response.roleAPI.success){
        this.roleList= response.roleAPI.data;
      }
      if(response && response.moduleAPI && response.moduleAPI.success){
        this.moduleList= response.moduleAPI.data;
      }
    })
  
    if (this.isEdit || this.deleteItem) {
      this.setApprovalForm(this.data.element);
    }
  }


  get levels() {
    return this.approvalForm.get('levels') as FormArray;
  }

  addlevelsControls() {
    const group = this.formbuilder.group({
      id:[],
      roleid: ['',Validators.required], 
      name: ['',Validators.required],
      employeeid:['']
    });
    this.levels.push(group);
  }

  addlevelsControlswithValue(data:any) {  
    const group = this.formbuilder.group({
      id:[data.id],
      roleid: [data.id,Validators.required], 
      name: [data.id,Validators.required],
      employeeid:[data.id,Validators.required]
    });
    this.levels.push(group);
  }

  onDocNameUpdate(value:string, index:number){
    (this.approvalForm.controls['levels'] as FormArray).at(index).patchValue({
      name:value
    });
  }

  removeDocControl(index: number) {
    this.levels.removeAt(index);
  }
  moduleChange(data:any){
    this.levels.controls.forEach((group: any, index: number) => {
      group.patchValue({moduleid:data.value});
    });
  }
  onRoleChange(data:any){
    if(data && data.value)
    this.employeeService.getSiteEmployeeParital({roleId:data.value},'').subscribe((response:any)=>{
      if(response && response.success){
       this.empList= response.data.map((item:any)=>({
        id:item.id,
        name:item.code+ ' - '+item.name        
       }));
       this.empInit=true;
      }
    })
  }

  setApprovalForm(data: any) {    
    this.approvalForm.setValue({
      name: data.name,
      companyid:data.companyid,
      id:data.id
    });
  }

  empSelect(event:any,index:number){
    if(event.value){
      (this.approvalForm.controls['levels'] as FormArray).at(index).patchValue({
        employeeid:event.value.id
      });  
    }
  }

  submit(){   
    console.log(this.approvalForm.value);
    if (this.isEdit) {
      this.approvalService.updateApproval(this.approvalForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
              this.dialogRef.close({ value: this.approvalForm.value, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.approvalForm.value.id=null;
      this.approvalService.createApproval(this.approvalForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success)  {
              console.log(response.data);
              //this.approvalForm.controls["id"].setValue(response.data.id);
              this.dialogRef.close({ value: this.approvalForm.value, valid: true });
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
      this.approvalService.deleteApproval({id:this.approvalForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.approvalForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}


