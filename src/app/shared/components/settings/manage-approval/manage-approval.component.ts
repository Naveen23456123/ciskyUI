import { Component, Inject, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
        this.title = 'New Approval(s)';
        break;
      case 'delete':
        this.title = 'Delete Approval';
        break;
      case 'edit':
        this.title = 'Edit Approval(s)';
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
    if(!this.deleteItem){
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
        if (this.isEdit) {
          this.setApprovalForm(this.data.element);
        }
      })
    }
    else{
      this.approvalForm.patchValue({
        id:this.data.element.id,
        modulename:this.data.element.modulename
      })
      this.isLoading=false;
    }
  }

  get levels() {
    return this.approvalForm.get('levels') as FormArray;
  }

  addlevelsControls() {
    const group = this.formbuilder.group({
      empInit:[true],
      id:[],
      roleid: ['',Validators.required], 
      roles:[this.getFreshRoles()],
      name: ['',Validators.required],
      employeeid:[''],
      employees:[],
      employeename:[],
      rolename:[],
    });
    group.get('roleid')?.valueChanges.subscribe(value => {
      group.patchValue({
        empInit:false,
        rolename:this.roleList.find(x=>x.id==value).name
       })
      this.employeeService.getSiteEmployeeParital({roleId:value},'').subscribe((response:any)=>{
        if(response && response.success){
         let list= response.data.map((item:any)=>({
          id:item.id,
          name:item.code+ ' - '+item.name ,
          empname:item.name       
         }));
         group.patchValue({
          empInit:true,
          employees:list
         })
        }
      })
    });
    this.levels.push(group);
  }
  getFreshRoles() {
    return this.roleList.map(role => ({ ...role })); // returns a new array of objects
  }
  addlevelsControlswithValue(data:any) {  
    const group = this.formbuilder.group({
      empInit:[true],
      id:[data.id],
      roleid: [data.roleid,Validators.required], 
      name: [data.name,Validators.required],
      employeeid:[data.employeeid,Validators.required],
      employees:[] ,
      employeename:[],
      rolename:[],
    });
    group.get('roleid')?.valueChanges.subscribe(value => {
      group.patchValue({
        empInit:false
       })
      this.employeeService.getSiteEmployeeParital({roleId:value},'').subscribe((response:any)=>{
        if(response && response.success){
         let list= response.data.map((item:any)=>({
          id:item.id,
          name:item.code+ ' - '+item.name ,
          empname:item.name,       
         }));
         group.patchValue({
          empInit:true,
          employees:list
         })
        }
      })
    });
    group.patchValue({
      roleid:data.roleid,
      rolename:this.roleList.find(x=>x.id==data.roleid).name
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

  setApprovalForm(data: any) {    
    this.approvalForm.patchValue({
      moduleid:data.moduleid,
      id:data.id
    });
    data.levels.forEach((element:any) => {
      this.addlevelsControlswithValue(element);
    });
  }

  empSelect(event:any,index:number){
    if(event.value){
      (this.approvalForm.controls['levels'] as FormArray).at(index).patchValue({
        employeeid:event.value.id,
        employeename :event.value.empname
      });  
    }
  }

  submit(){ 
    this.approvalForm.value.modulename= this.moduleList.find(x=>x.id==this.approvalForm.get('moduleid')?.value).name;
    this.approvalForm.value.employees= null;
    this.approvalForm.value.roles= null;
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


