import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatOption, MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { ApprovalStatus } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { VehicleBillingInterfaceService } from '@app/shared/services/external/vehicle-billing-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { ValidatorService } from '@app/shared/services/validator.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-manage-veh-billing-req',
  standalone: false,
  templateUrl: './manage-veh-billing-req.component.html',
  styleUrl: './manage-veh-billing-req.component.scss'
})
export class ManageVehBillingReqComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Approve';
  approvalForm: FormGroup = new FormGroup({});
  deleteRequest=false;
  isBtnClicked=false;
  subCompanyList:{id:string,name:string}[] = [];
  statusList:any[]=[];
  userObj:any;
  actedLevel:any;
  isRejected=false;
  selectedId='';
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageVehBillingReqComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private notifibarservice: NotifyBarService, private vehicleService:VehicleBillingInterfaceService,
  private commonService:CommonService, private validatorService:ValidatorService){
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
    let pendingid='';
    if(!this.deleteRequest){
      this.sessionservice.approvalStatusSubject$.subscribe((response:any)=>{
        if(response){
          this.statusList= response.filter((x:any)=>x.name.toLowerCase()!=ApprovalStatus.PENDING);
          pendingid = response.find((x:any)=>x.name.toLowerCase()==ApprovalStatus.PENDING.toLowerCase())?.id;
        }
      })
      this.sessionservice.userSubject$.subscribe((response:any)=>{
        if(response){
          this.userObj= response;
        }
      }) 
      this.actedLevel = this.data.element.value.levels?.find((l:any) => l.employeeid==this.userObj.employeeid);  
     
      if(this.actedLevel){
        this.approvalForm = this.formbuilder.group({ 
          samount:[,[Validators.required]],
          amount:[,[Validators.required, this.validatorService.lessThan('samount')]],
          remarks:[this.actedLevel.remarks,[Validators.required]],
          statusid:[pendingid == this.actedLevel.statusid?'':this.actedLevel.statusid,[Validators.required]],
          billingid:[],
          id :[]
        });
        if (this.isEdit || this.deleteRequest) {
           console.log(this.data.element.value);
          this.setApprovalForm(this.data.element.value);
        }
      }
    }
    else {
      this.selectedId= this.data.element.value.id;
    }
    this.isLoading=false;
  }

  onStatusChange(event: MatSelectChange) {
    this.isRejected=false;
    if((event.source.selected as MatOption).viewValue.toLowerCase()===ApprovalStatus.REJECTED){
      this.approvalForm.patchValue({amount: this.approvalForm.get('samount')?.value});
      this.isRejected=true;
    }
  }
  tamount=0;
  setApprovalForm(data: any) { 
    //this.tamount= this.commonService.getVehicleBillingInfo(data)?.amount;
    this.approvalForm.patchValue({
      samount: data.billamount,
      amount:this.actedLevel.actedamount ?? data.totalamount,
      billingid:data.id,
      id:this.actedLevel?.id
    });
  }

  submit(){ 
    this.isBtnClicked=true;
    this.vehicleService.actVehicleBilling({billing:this.approvalForm.value,searchObj:this.data.element.searchObj}, '')
      .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked=false })).subscribe({
        next:(response: any) => {
          if (response && response.success){ 
            this.approvalForm.value.approved= response.data.amount;
            this.approvalForm.value.summary= response.data.summary; 
            this.dialogRef.close({ value: this.approvalForm.value, valid: true });
          }
          else {
             this.dialogRef.close({ value: this.approvalForm.value, valid: false });
            this.notifibarservice.showsnackbar(response.message);
          }
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
    });

  }

  delete() {
      this.vehicleService.deleteVehicleBilling({id:this.selectedId,searchObj:this.data.element.searchObj}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success){
            this.dialogRef.close({ value: {id:this.selectedId,...response.data}, valid: true });
          }
          else {
             this.dialogRef.close({ value: this.approvalForm.value, valid: false });
            this.notifibarservice.showsnackbar(response.message);
          }
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}


