import { Component, Inject, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatOption, MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { ApprovalStatus } from '@app/shared/models/constant.config';
import { ImperestInterfaceService } from '@app/shared/services/external/imperest-interface.service';
import { OfficeInterfaceService } from '@app/shared/services/external/office-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { ValidatorService } from '@app/shared/services/validator.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-imperest-billing-req',
  standalone: false,
  templateUrl: './manage-imperest-billing-req.component.html',
  styleUrl: './manage-imperest-billing-req.component.scss'
})
export class ManageImperestBillingReqComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Approve';
  approvalForm: FormGroup = new FormGroup({});
  deleteRequest=false;
  subCompanyList:{id:string,name:string}[] = [];
  statusList:any[]=[];
  showAmount=true;
  isClicked=false;
  userObj:any;
  actedLevel:any;
  sdetails:any;
  isRejected=false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageImperestBillingReqComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router, private validatorService:ValidatorService,
    private notifibarservice: NotifyBarService, private imperestService:ImperestInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteRequest = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {     
      case 'delete':
        this.title = 'Delete Request';
        break;
      case 'edit':
        this.title = 'Manage Request';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.sessionservice.approvalStatusSubject$.subscribe((response:any)=>{
      if(response){
        this.statusList= response.filter((x:any)=>x.name.toLowerCase()!=ApprovalStatus.PENDING);
      }
    });
    this.sessionservice.userSubject$.subscribe((response:any)=>{
      if(response){
       this.userObj= response;
      }
    })
    this.sdetails = this.data.element.value.details;
    this.actedLevel = this.data.element.value.levels?.find((l:any) => l.employeeid==this.userObj.employeeid);
    console.log(this.actedLevel);
      if(this.actedLevel){
      const actedDetail = this.actedLevel?.acteddetails;
      this.isRejected =  this.statusList.find(x=>x.id==this.actedLevel.statusid)?.name.toLocaleLowerCase()==ApprovalStatus.REJECTED;
      this.approvalForm = this.formbuilder.group({      
        remarks:[this.actedLevel.remarks,[Validators.required]],
        statusid:[this.actedLevel.statusid,[Validators.required]],
        id:[this.data.element.value.id],
        billingid:[this.actedLevel.id],
        acteddetails: this.formbuilder.array([])
      });
      if (this.isEdit || this.deleteRequest) {
        actedDetail.forEach((element:any) => {
          this.addDetailsControlswithValue(element);
        });
      }
    }
    this.isLoading=false;
  }

  get details() {
    return this.approvalForm.get('acteddetails') as FormArray;
  }
  addDetailsControlswithValue(data:any) {
    const group = this.formbuilder.group({
      category:[data.expensename],
      samount: [this.sdetails.find((x:any)=>x.id==data.id)?.amount],
      amount: [data.amount,[Validators.required,this.validatorService.lessThan('samount')]],
      id:[data.id]
    });
    this.details.push(group);
  }

  onStatusChange(event: MatSelectChange) {
    this.isRejected=false;
    if((event.source.selected as MatOption).viewValue.toLowerCase()===ApprovalStatus.REJECTED){
      this.details.controls.forEach(ctrl => {
        ctrl.get('amount')?.setValue(ctrl.get('samount')?.value)
      });
      this.isRejected=true;;
    }
  }
  submit(){ 
    this.isClicked=true;
    const obj ={...this.approvalForm.value,employeeid: this.userObj.employeeid};
    this.imperestService.actImperestBillingRequest({billing:obj,searchObj:this.data.element.searchObj}, '')
      .pipe(finalize(() => { this.isLoading = false; this.isClicked=false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: {...response.data,levelid:this.actedLevel.id}, valid: true });
          else {
          this.notifibarservice.showsnackbar(response.message,true);
          this.dialogRef.close({ value: null, valid: false });
        }
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
    });

  }

  delete() {
      this.imperestService.deleteImperest({id:this.approvalForm.value.id,searchObj:this.data.element.searchObj}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: {id:this.approvalForm.value.id,...response.data}, valid: true });
          else {
            this.notifibarservice.showsnackbar(response.message,true);
            this.dialogRef.close({ value: null, valid: false });
        }
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}


