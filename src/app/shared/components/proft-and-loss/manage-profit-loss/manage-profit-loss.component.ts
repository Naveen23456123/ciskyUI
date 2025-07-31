import { ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ItemInterfaceService } from '@app/shared/services/external/item-interface.service';
import { OfficeInterfaceService } from '@app/shared/services/external/office-interface.service';
import { ProfitLossInterfaceService } from '@app/shared/services/external/profit-loss-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-profit-loss',
  standalone: false,
  templateUrl: './manage-profit-loss.component.html',
  styleUrl: './manage-profit-loss.component.scss'
})
export class ManageProfitLossComponent  {
 public data: any;
   isLoading = true;
   isEdit: boolean = false;
   pageGuid: any;
   title: string='Add';
   profitLossForm: FormGroup = new FormGroup({});
   deleteOfc=false;
   subCompanyList:any[] = [];
   isClicked=false;
   isAllProject = new FormControl(true);
   isProjectrequired:boolean=false;
   projectName='';

   constructor(@Inject(MAT_DIALOG_DATA) data: any,
     @Optional() private dialogRef: MatDialogRef<ManageProfitLossComponent>, private formbuilder: FormBuilder,
     private sessionservice: SessionService,  private router: Router,private cdr:ChangeDetectorRef,
     private profitLossService: ProfitLossInterfaceService, private companyService:SubCompanyInterfaceService){
       this.data = data || {};
   }
   
   checkMode(type: string) {
     if (type === 'edit' && !this.data.separate)
       this.isEdit = true;
     else if (type == 'delete') {
       this.dialogRef.updateSize('35%');
       this.deleteOfc = true;
     }
     else
       this.isEdit = false;
   }
 
   getTitle(val: string) {
     switch (val) {
       case 'add':
         this.title = 'Generate Profit Loss Sheet';
         break;
       case 'delete':
         this.title = 'Delete Profit Loss Sheet';
         break;
       case 'edit':
         this.title = 'Edit Profit Loss Sheet';
         break;
     }
   }
 
   ngOnInit(){
     this.checkMode(this.data.type);
     this.getTitle(this.data.type);
     this.profitLossForm = this.formbuilder.group({ 
       id:[],
       projectid: [],
       companyid:[],
       monthandyear:[]
     });
     this.companyService.getSubCompanyListByOrgId({},'')
     .pipe(finalize(()=>this.isLoading=false)).subscribe((response:any)=>{
       if(response && response.success){
         this.subCompanyList= response.data;
       }
     })
     if (this.isEdit || this.deleteOfc) {
       this.projectName= this.data.element.project;
       this.setprofitLossForm(this.data.element);
     }
   }
 
   setprofitLossForm(data: any) {    
     this.profitLossForm.patchValue({      
       id:data.id,
       projectid: data.projectid,
       companyid:data.companyid,
       monthandyear:data.monthandyear,
     });
   }
   dateChange(data:any){
     this.profitLossForm.patchValue({monthandyear:data});   
   }
   ngAfterViewInit(){
     this.cdr.detectChanges();
   }

   onProjecttoggleChange(event:any){
     this.isAllProject.setValue(event.checked);    
     this.setValidation();
   }
   setValidation(){
     const pcontrol = this.profitLossForm.get('projectid');
     pcontrol?.clearValidators(); 
     pcontrol?.clearValidators(); 
    
     if(!this.isAllProject.value)
       pcontrol?.setValidators([Validators.required]); 
       
     pcontrol?.updateValueAndValidity();
   }
   projectChange(data:any=null){
     console.log(data);
     if(data && data.value){     
       this.profitLossForm.patchValue({
         projectid:data.value.id,
         companyid:data.value.companyid
       });
       this.projectName= data.value.projectshortname;
     }
   }
   bulkBillingObj:any={};
   submit(){   
     this.isClicked=true;
     if (this.isEdit) {
       
     } else {
       this.profitLossForm.value.id=null;
       this.bulkBillingObj.monthandyear=this.profitLossForm.get('monthandyear')?.value;
       this.bulkBillingObj.allproject=this.isAllProject.value;
        if (!this.isAllProject.value ){       
       this.bulkBillingObj.projectid=this.profitLossForm.get('projectid')?.value;
       this.bulkBillingObj.companyid=this.profitLossForm.get('companyid')?.value;  
       }
       this.profitLossService.createProfitLoss(this.bulkBillingObj, '')
         .pipe(finalize(() => { this.isLoading = false;this.isClicked=false })).subscribe({
           next:(response: any) => {
             if (response && response.success)  {     
               if(!this.isAllProject.value){
                 response.data.forEach((element:any) => {
                   element.project= this.projectName;
                 });
               }         
               this.dialogRef.close({ value: response.data, valid: true });
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
       // this.officeService.deleteOfc({id:this.profitLossForm.value.id}, '')
       //  .pipe(finalize(() => { this.isLoading = false; })).subscribe({
       //   next:(response: any) => {
       //     if (response && response.success) 
       //       this.dialogRef.close({ value: this.profitLossForm.value, valid: true });
       // },
       // error: (err: any) => {
       //     this.dialogRef.close(err);
       //   }
       // });
   }
  
 }

