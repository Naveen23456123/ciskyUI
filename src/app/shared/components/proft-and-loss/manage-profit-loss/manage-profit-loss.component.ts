import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfitLossInterfaceService } from '@app/shared/services/external/profit-loss-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take, takeLast } from 'rxjs';

@Component({
  selector: 'app-manage-profit-loss',
  standalone: false,
  templateUrl: './manage-profit-loss.component.html',
  styleUrl: './manage-profit-loss.component.scss'
})
export class ManageProfitLossComponent {

public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  profitLossForm: FormGroup = new FormGroup({});
  deleteProfitLoss=false;
  scopeId='';
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageProfitLossComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private notifibarservice: NotifyBarService, private profitLossService: ProfitLossInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteProfitLoss = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New ';
        break;
      case 'delete':
        this.title = 'Delete ';
        break;
      case 'edit':
        this.title = 'Edit ';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
 
    this.profitLossForm = this.formbuilder.group({ 
      name: ['',[Validators.required]],
      amount: ['',[Validators.required]],
      companyid:[''],
      scopeid:['',[Validators.required]],
      id :[]
    });
    this.sessionservice.profileLossScopeSubject$.pipe(take(1), finalize(()=> this.isLoading=false)).subscribe((response:any)=>{
      if(response){       
       this.title += response.find((x:any)=> x.key== this.data.scope)?.value;    
       this.profitLossForm.patchValue({scopeid:response.find((x:any)=> x.key== this.data.scope)?.id});
      }
    })
   
    if(!this.deleteProfitLoss){   
      if (this.isEdit) {
        this.setProfitLossForm(this.data.element);
      }       
    }
    else{
      this.profitLossForm.patchValue({
        id:this.data.element.id,
        name:this.data.element.name
      });
      this.isLoading=false;
    }
    
  }

  setProfitLossForm(data: any) {    
    this.profitLossForm.patchValue({
      name: data.name,
      amount: data.amount,
      companyid:data.companyid,
      scopeid:data.scopeid,
      id:data.id
    });
  }

  submit(){  
    if (this.isEdit) {
      this.profitLossService.updateProfitLoss(this.profitLossForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
              this.dialogRef.close({ value: this.profitLossForm.value, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.profitLossForm.value.id=null;
      this.profitLossService.createProfitLoss(this.profitLossForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success)  {
              this.profitLossForm.patchValue({id:response.data.id});
              this.dialogRef.close({ value: this.profitLossForm.value, valid: true });
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
      this.profitLossService.deleteProfitLoss({id:this.profitLossForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.profitLossForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}

