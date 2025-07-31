import { Component, Inject, Optional } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApprovalStatus } from '@app/shared/models/constant.config';
import { ExpenseInterfaceService } from '@app/shared/services/external/expense-interface.service';
import { ImperestInterfaceService } from '@app/shared/services/external/imperest-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import moment from 'moment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-expense',
  standalone: false,
  templateUrl: './manage-expense.component.html',
  styleUrl: './manage-expense.component.scss'
})
export class ManageExpenseComponent {
  public data: any;
  deleteRequest=false;
  deleteExpense=false;
  isLoading=true;
  isEdit: boolean = false;
  imperestList:any[]=[];
  expenseForm: FormGroup = new FormGroup({});
  title: string='';
  isClicked=false;
  Uploadtitle='Bill';
  statusList:any[]=[];
  selectedImperest:any;
  imperestName='';
  separateEdit=false;
  isClaiming=false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,private formbuilder:FormBuilder,
      @Optional() private dialogRef: MatDialogRef<ManageExpenseComponent>,private expenseService:ExpenseInterfaceService,
    private imperestService:ImperestInterfaceService, private sessionService:SessionService){
        this.data = data || {};
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.checkOperation();
    this.sessionService.approvalStatusSubject$.subscribe((response:any)=>{
      if(response){
        this.statusList= response;
      }
    })
    this.expenseForm = this.formbuilder.group({      
      name:[,[Validators.required]],
      id:[],
      moduleid:[this.data.pageGuid],
      projectid:[],
      expenseid:[],
      companyid:[],
      remarks:[],
      statusid: [this.statusList.find((x:any)=>x.name.toLowerCase()==ApprovalStatus.PENDING.toLocaleLowerCase())?.id],
      imperestid:[,[Validators.required]],
      date:[,[Validators.required]],
      claimeddetails: this.formbuilder.array([])
    });
    if(!this.deleteRequest && !this.deleteExpense){
      this.imperestService.getImperestDetails({},'').pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response:any)=>{
        if(response && response.success){
          this.imperestList= response.data;
          
        }
        if(this.isEdit || this.isClaiming){
        this.setExpenseForm(this.data.element);
        this.imperestName= this.imperestList.find(x=>this.data.element.imperestid)?.name;
      }
      });
    }
    else{
      this.expenseForm.patchValue({
        id:this.data.element.id,
        name:this.data.element.expensename,
        expenseid: this.data.element.expenseid
      })
      this.isLoading=false;
    }
    
  }
  setExpenseForm(data:any){
    this.selectedImperest=data.imperestid;
    this.expenseForm.patchValue({
      projectid:this.imperestList.find(x=>this.selectedImperest)?.projectid,
      companyid:this.imperestList.find(x=>this.selectedImperest)?.companyid,
      statusid:data.statusid,
      id:data.id,
      expenseid:data.expenseid,
      name :data.expensename,
      date:data.date,
      imperestid:data.imperestid,
      remarks:data.remarks,      
    });
    if(!this.isClaiming && !this.separateEdit){
      data.claimeddetails.forEach((element:any) => {
        this.addDetailsControlswithValue(element);
      });
    }
  }
  checkMode(type: string) {
    if (type === 'edit')
      this.isEdit = true;
    else if (type == 'delete') {
      this.deleteRequest = true;
    } else if (type === 'claim') {
      this.isClaiming = true;
    }
    else
      this.isEdit = false;
  }
  checkOperation(){
    if(this.data.operation)
      this.separateEdit = this.data.operation=='medit';
  }
  getTitle(val: string) {
    switch (val) {     
      case 'delete':
        this.title = 'Delete Expense';
        break;
      case 'edit':
        this.title = 'Manage Expense';
        break;
      case 'add':
        this.title = 'Add Expense';
        break;
      case 'claim':
        this.title = 'Submit Expense';
        break;
    }
  }
  get details() {
    return this.expenseForm.get('claimeddetails') as FormArray;
  }
  addDetailsControlswithValue(data:any) {
    const fileValidators = (!this.isEdit) ? [Validators.required] : [];
    const group = this.formbuilder.group({
      item:[data.itemname,Validators.required],
      categoryid:[data.categoryid,Validators.required],
      amount: [data.amount,Validators.required],
      file:[,fileValidators],
      id:[data.id]
    });
    this.details.push(group);
  }
  getAvailableCategories(index: number): any[] {
    const selectedIds = this.details.controls
      .map((ctrl, i) => i !== index && ctrl.get('categoryid')?.value)
      .filter(Boolean);
  
    return  this.imperestList.find((x:any)=> x.id==this.selectedImperest)?.details;
  }
  onimperestChange(event:any){
    if(event.value){
      const claimeddetails = this.details;
      claimeddetails.clear();
      this.selectedImperest=event.value.id;
      this.expenseForm.patchValue({
        projectid:event.value.projectid,
        companyid:event.value.companyid})
    }
  }
  onfileUploaded(file:any,index:number){      
    this.details.at(index).patchValue({
      file:file
    });
  }
  addExpense() {
    this.addDetailsControlswithValue({ id: '', item: '', amount: 0 });
  }  
  removeRow(index: number) {
    this.details.removeAt(index);
  }

  submit(){ 
    this.isClicked=true;
    if (this.isEdit) {
      if(this.data.operation){
        this.expenseService.updatePartialExpense(this.expenseForm.value, '')
          .pipe(finalize(() => { this.isLoading = false; this.isClicked=false; })).subscribe({
            next:(response: any) => {
              if (response && response.success){
                this.dialogRef.close({ value: this.expenseForm.value, valid: true });
              }
          },
          error: (err: any) => {
              this.dialogRef.close(err);
            }
        });     
      } 
      else {
        const formData= this.toFormData(this.expenseForm);
        formData.append('date', moment(this.expenseForm.controls['date']?.value).toISOString());
        formData.append('imperestid', this.expenseForm.controls['imperestid']?.value);
        this.expenseService.updateExpense(formData, '')
          .pipe(finalize(() => { this.isLoading = false; this.isClicked=false; })).subscribe({
            next:(response: any) => {
              if (response && response.success){
                response.data.hasUpdated=true;
                let catDetails=this.imperestList.find((x:any)=> x.id==this.selectedImperest)?.details;
                console.log(catDetails);
                response.data.updated.claimeddetails = response.data.updated.claimeddetails.map((detail:any) => {
                  const matched = catDetails.find((cat:any) => cat.id === detail.categoryid);
                  console.log(detail.categoryid);
                  console.log(matched);
                  return {
                    ...detail,
                    categoryname: matched ? matched.expensename : 'Unknown'
                  };
                });
                this.dialogRef.close({ value: response.data, valid: true });
              }
          },
          error: (err: any) => {
              this.dialogRef.close(err);
            }
        });     
      }
    } else if (this.isClaiming) { 
      const formData= this.toFormData(this.expenseForm);
      formData.append('date', moment(this.expenseForm.controls['date']?.value).toISOString());
      formData.append('imperestid', this.expenseForm.controls['imperestid']?.value);
      formData.append('statusid',this.statusList.find((x:any)=>x.name.toLowerCase()==ApprovalStatus.PENDING.toLocaleLowerCase())?.id);
      this.expenseService.claimExpense(formData, '')
        .pipe(finalize(() => { this.isLoading = false; this.isClicked=false; })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
              this.dialogRef.close({ value: response.data, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
      });     
    }
    else{
      const formData= this.toFormData(this.expenseForm);
      formData.append('date', moment(this.expenseForm.controls['date']?.value).toISOString());
      formData.append('imperestid', this.expenseForm.controls['imperestid']?.value?.id);
      formData.append('statusid',this.statusList.find((x:any)=>x.name.toLowerCase()==ApprovalStatus.PENDING.toLocaleLowerCase())?.id);
      this.expenseService.createExpense(formData, '')
        .pipe(finalize(() => { this.isLoading = false; this.isClicked=false; })).subscribe({
          next:(response: any) => {
            if (response && response.success){
              let data= {...response.data};
              let imperestObj= this.imperestList.find(x=>x.id==this.selectedImperest);
              let catDetails=this.imperestList.find((x:any)=> x.id==this.selectedImperest)?.details;
              data.project=imperestObj?.project; 
              data.officename=imperestObj?.officename; 
              data.officelocation=imperestObj?.officelocation;  
              data.claimed= response.data.claimed.map((item:any)=>({
                   ...item,
                   categoryname: catDetails.find((x:any)=>x.id==item.categoryid)?.expensename
              }));
              data.approved= response.data.approved.map((item:any)=>({
                   ...item,
                   categoryname: catDetails.find((x:any)=>x.id==item.categoryid)?.expensename
              }))
              this.dialogRef.close({ value: data, valid: true });
            }
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
      });
    }

  }

  delete() {
    if(this.data.operation=='expdelete'){
      let obj= {
        id:this.expenseForm.value.id,
        expenseid:this.expenseForm.value.expenseid
      }
      this.expenseService.deleteExpenseById({...obj,searchObj:null}, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: {...obj,summary:response.data.summary}, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });       
    } else {
      this.expenseService.deleteExpense({id:this.expenseForm.value.id}, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.expenseForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
    }    
  }
  toFormData(formGroup: FormGroup): FormData {
    const formData = new FormData();
  
    // Loop through all form controls
    for (const [key, control] of Object.entries(formGroup.controls)) {
      if(key==='date'|| key==='imperestid')
        continue;

      if (key === 'claimeddetails') {
        const detailsArray = control as FormArray;
  
        detailsArray.controls.forEach((group: AbstractControl, index: number) => {
          const groupValue = group.value;
          for (const [groupKey, groupVal] of Object.entries(groupValue)) {
            if (groupKey === 'file') {
              if (groupVal && groupVal instanceof File) {
                formData.append(
                  `claimeddetails[${index}].${groupKey}`,
                  groupVal,
                  groupVal.name
                );
              }
            } else if (groupVal != null) {
              formData.append(
                `claimeddetails[${index}].${groupKey}`,
                groupVal.toString()
              );
            }
          }
        });
      } else {
        if (control.value != null) {
          formData.append(key, control.value);
        }
      }
    }
  
    return formData;
  }
}
