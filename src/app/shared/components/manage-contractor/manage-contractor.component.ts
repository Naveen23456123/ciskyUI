import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContractorInterfaceService } from '@app/shared/services/external/contractor-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-manage-contractor',
  standalone: false,
  templateUrl: './manage-contractor.component.html',
  styleUrl: './manage-contractor.component.scss'
})
export class ManageContractorComponent {
 public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='';
  contractorForm: FormGroup = new FormGroup({});
  deleteContractor= false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
  @Optional() private dialogRef: MatDialogRef<ManageContractorComponent>, private formbuilder: FormBuilder,
  private sessionservice: SessionService,  private router: Router,
  private notifibarservice: NotifyBarService,private contractorService:ContractorInterfaceService
) {

  this.data = data || {};
  
}
ngOnInit(): void {
  this.checkMode(this.data.type);
  this.getTitle(this.data.type);
this.contractorForm = this.formbuilder.group({
  id:[],
  projectId:[],
  contractorname: [],
  contractoraddress:[],
  projectcost:[],
  projectlength:[],
  projectduration:[],
  bidduedate:[],
  loadate:[],
  agreementdate:[],
  commencementdate:[],
  scheduleconstructioncompletedate:[],
  schedulecompletedate:[],
  actualcompletedate:[],
  actualconstructioncompletedate:[],
  
});
if (this.isEdit || this.deleteContractor) {
  this.setcontractorForm(this.data.element);
}
this.isLoading = false;
}

checkMode(type: string) {
  if (type === 'edit' && !this.data.separate)
    this.isEdit = true;
  else if (type == 'delete') {
    this.dialogRef.updateSize('35%');
    this.deleteContractor = true;
  }
  else
    this.isEdit = false;
}

getTitle(val: string) {
  switch (val) {
    case 'add':
      this.title = 'New Contractor';
      break;
    case 'delete':
      this.title = 'Delete Contractor';
      break;
    case 'edit':
      this.title = 'Edit Contractor';
      break;
  }
}
setcontractorForm(data: any) {  
  this.contractorForm.patchValue({   
    id: data.id,
    contractorname: data.contractorname,
    contractoraddress:data.contractoraddress,
    projectcost:data.projectcost,
    projectlength:data.projectlength,
    projectduration:data.projectduration,
    bidduedate:data.bidduedate,
    loadate:data.loadate,
    agreementdate:data.agreementdate,
    commencementdate:data.commencementdate,
    scheduleconstructioncompletedate:data.scheduleconstructioncompletedate,
    schedulecompletedate:data.schedulecompletedate,
    actualcompletedate:data.actualcompletedate,
    actualconstructioncompletedate:data.actualconstructioncompletedate
  });
}

submit(){  
  
  if (this.isEdit) {
    this.contractorService.updateContractor(this.contractorForm.value, '')
      .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next: (response:any) => {
        if(response && response.success)
          this.dialogRef.close({ value: this.contractorForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  } else {
    this.sessionservice.workingProjectSubject$.pipe(take(1)).subscribe((projectResponse)=>{
      if(projectResponse) {
      this.contractorForm.value.id=null;
      this.contractorForm.controls["projectId"].setValue(projectResponse.id);
      this.contractorService.createContractor(this.contractorForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            this.contractorForm.controls["id"].setValue(response.data.id);
            this.dialogRef.close({ value: this.contractorForm.value, valid: true });
          } else {
            this.dialogRef.close({ value: null, valid: false });
          }
        },
         error: (err: any) => {
            this.dialogRef.close(err);
          }
      });
    }
    });  
  }
}

delete() {
    this.contractorService.deleteContractor({id:this.contractorForm.value.id}, '')
     .pipe(finalize(() => { this.isLoading = false; })).subscribe({
      next:(response: any) => {
        if (response && response.success) 
         this.dialogRef.close({ value: this.contractorForm.value, valid: true });
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
