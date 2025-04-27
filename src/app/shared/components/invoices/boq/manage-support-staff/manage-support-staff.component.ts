import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { LetterType } from '@app/shared/models/constant.config';
import { BoqStaffInterfaceService } from '@app/shared/services/external/boq/boq-staff-interface.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { DesignationInterfaceService } from '@app/shared/services/external/designation-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, forkJoin, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-manage-support-staff',
  standalone: false,
  templateUrl: './manage-support-staff.component.html',
  styleUrl: './manage-support-staff.component.scss'
})
export class ManageSupportStaffComponent {

  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  renumerationForm: FormGroup = new FormGroup({});
  deleteRenumeration=false;
  designationList:any[] = [];
  professionaList:any[] = [];
  empList:any[] = [];
  designationLoad=false;
  employeeLoad=false;
  empName='';
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '900px', 
        disableClose: false,
        data: {},
  };
  private subscription:Subscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageSupportStaffComponent>, private formbuilder: FormBuilder,
    private router: Router,private route: ActivatedRoute,
    private staffService: BoqStaffInterfaceService, private sessionService:SessionService,
  private employeeService:EmployeeInterfaceService, private designationService:DesignationInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteRenumeration = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Staff';
        break;
      case 'delete':
        this.title = 'Delete Staff';
        break;
      case 'edit':
        this.title = 'Edit Staff';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.renumerationForm = this.formbuilder.group({ 
      id: [''],
      projectid:[''],
      designationid :[],
      professionalid:[],
      employeeid:[],
      rate:[],
      constructionperiod:[],
      oandmperiod:[]
    });
    this.sessionService.staffTypeSubject$.subscribe((response:any)=>{
      if(response){        
        this.professionaList= response;
      }
    })
    if(!this.deleteRenumeration) {
    this.subscription=  this.sessionService.projectEntitySubject$.pipe(untilDestroyed(this)).subscribe((projectEntity:any)=>{
        if(projectEntity){
          forkJoin({
            designationAPI:this.designationService.getDesignationList({},''),
            employeeAPI:this.employeeService.getSiteEmployeeParital({projectId:projectEntity.projectId},''),          
          }).pipe(take(1), untilDestroyed(this), finalize(()=> this.isLoading=false)).subscribe((response:any)=>{
            if(response){
              if(response.designationAPI && response.designationAPI.success){
                this.designationLoad=true;
                this.designationList=response.designationAPI.data;
              }
              if(response.employeeAPI && response.employeeAPI.success){
                this.empList = response.employeeAPI.data.map((emp:any) => ({
                  id: emp.id,
                  name: emp.name + ' - '+emp.code,
                  empname:emp.name
                }));
                this.employeeLoad=true;
              }
              if (this.isEdit) {
                this.setRenumerationForm(this.data.element);
              }            
            }
          });         
        }
      });
    }
    else {
      this.renumerationForm.patchValue({
        id: this.data.element.id
      });
      this.empName= this.data.element.employeename;
      this.isLoading=false;
    }   
  }

  setRenumerationForm(data: any) {    
    this.renumerationForm.patchValue({
      id: data.id,
      designationid :data.designationid,
      professionalid:data.professionalid,
      employeeid:data.employeeid,
      rate:data.rate,
      constructionperiod:data.constructionperiod,
      oandmperiod:data.oandmperiod,
    });
  }

  desgSelect(data:any){
    if(data && data.value)
      this.renumerationForm.patchValue({designationid :data.value.id});
  }
  empSelect(data:any){
    if(data && data.value)
      this.renumerationForm.patchValue({employeeid :data.value.id});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  submit(){ 
    this.renumerationForm.value.employeename= this.empList.find(x=>x.id==this.renumerationForm.get('employeeid')?.value).empname;
    this.renumerationForm.value.designation= this.designationList.find(x=>x.id==this.renumerationForm.get('designationid')?.value).name;
    this.sessionService.projectEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.projectId){
        this.renumerationForm.patchValue({projectid:response.projectId});
        if (this.isEdit) {
          this.staffService.updateBoqStaff(this.renumerationForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.renumerationForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
                this.dialogRef.close({ value: this.renumerationForm.value,professionalData: this.professionaList, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.renumerationForm.value.id=null;
          this.staffService.createBoqStaff(this.renumerationForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.renumerationForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
                this.renumerationForm.controls["id"].setValue(response.data.id);
                this.dialogRef.close({ value: this.renumerationForm.value,professionalData: this.professionaList, valid: true });
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
    }) 
  }

  delete() {
      this.staffService.deleteBoqStaff({id:this.renumerationForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.renumerationForm.value,professionalData: this.professionaList, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }

}