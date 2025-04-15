import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { OfficeInterfaceService } from '@app/shared/services/external/office-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SiteControlInterfaceService } from '@app/shared/services/external/site-control-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-manage-office-rent-control',
  standalone: false,
  templateUrl: './manage-office-rent-control.component.html',
  styleUrl: './manage-office-rent-control.component.scss'
})
export class ManageOfficeRentControlComponent {
 public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  rentForm: FormGroup = new FormGroup({});
  deleteRent=false;
  activeOrgId='123';
  projectList:any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageOfficeRentControlComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private notifibarservice: NotifyBarService, private commonService:CommonInterfaceService,
  private projectService:ProjectInterfaceService, private officeRentService:OfficeInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteRent = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Office Rent';
        break;
      case 'delete':
        this.title = 'Delete Office Rent';
        break;
      case 'edit':
        this.title = 'Edit Office Rent';
        break;
    }
  }

  ngOnInit(){
      
    forkJoin({projectAPI :this.projectService.getAllProjectPartialDetailsByOrdIg ({ organizationId: this.activeOrgId }, '')})
      .pipe(finalize(() => { this.isLoading = false }))
      .subscribe((response:any) => {
         if(response.projectAPI)
          this.projectList = response.projectAPI.data; 
      });

    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.rentForm = this.formbuilder.group({ 
      id: [''],
      projectid :[],
      basicamount:[],
      tdspercentage:[],
      agreementduration:[''],
      agreementstartdate:[''],
      agreementenddate:[],
      ownername:[],
      bankname:[],
      accountholdername:[],
      accountnumber:[],
      ifsccode:[],
      panno:[],
      gstno:[],
      phoneno:[],
      address:[],
      documentaddress:[]
    });
    
    if (this.isEdit || this.deleteRent) {
      this.setOfficeRentForm(this.data.element);
    }
   
  }

  setOfficeRentForm(data: any) {    
    this.rentForm.setValue({
      id: data.id,
      projectid :data.projectid,
      basicamount:data.basicamount,
      tdspercentage:data.tdspercentage,
      agreementduration:data.agreementduration,
      agreementstartdate:data.agreementstartdate,
      agreementenddate:data.agreementenddate,
      ownername:data.ownername,
      bankname:data.bankname,
      accountholdername:data.accountholdername,
      accountnumber:data.accountnumber,
      ifsccode:data.ifsccode,
      panno:data.panno,
      gstno:data.gstno,
      phoneno:data.phoneno,
      address:data.address,
      documentaddress:data.documentaddress      
    });
  }


  submit(){   
    if (this.isEdit) {
      this.officeRentService.updateOfficeRent(this.rentForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
              this.dialogRef.close({ value: this.rentForm.value, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.rentForm.value.id=null;
      this.officeRentService.createOfficeRent(this.rentForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success)  {
              this.rentForm.controls["id"].setValue(response.data.id);
              this.dialogRef.close({ value: this.rentForm.value, valid: true });
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
      this.officeRentService.deleteOfficeRent({id:this.rentForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.rentForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}


