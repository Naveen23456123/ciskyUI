import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { AttachLetterComponent } from '../../letters/attach-letter/attach-letter.component';
import { LetterEntity, LetterType } from '@app/shared/models/constant.config';
import { ContractorInterfaceService } from '@app/shared/services/external/contractor-interface.service';
import { finalize, forkJoin, Subscription, take } from 'rxjs';
import { untilDestroyed } from '@app/core/until-destroyed';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { CommonService } from '@app/shared/services/common.service';
import { validate } from 'uuid';

@Component({
  selector: 'app-manage-contractor-billing',
  standalone: false,
  templateUrl: './manage-contractor-billing.component.html',
  styleUrl: './manage-contractor-billing.component.scss'
})
export class ManageContractorBillingComponent {

  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  billingForm: FormGroup = new FormGroup({});
  deleteBilling=false;
  isBtnClicked=false;
  letterList:any[] = [];
  billTypeList:{id:string,name:string}[] = [];
  billCategoryList:{id:string,name:string}[] = [];
  billSubmitAmt =0;
  billSubmitPercentage=0; 
  siteRecommBillAmount=0;
  siteRecommPercentage=0;
  hoRecommBillAmount=0;
  hoRecommBillPercentage=0;
  letterInit=false;
  isRecomm = new FormControl(false);
  isApproved = new FormControl(false);
  private subscription: Subscription = new Subscription();

   readonly dialog = inject(MatDialog);
  
     private defaultdialogoptions:  MatDialogConfig = {
          minWidth: '900px', 
          disableClose: false,
          data: {},
    };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageContractorBillingComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService,  private router: Router,private route: ActivatedRoute,
    private notifiBarService: NotifyBarService, private contratorService:ContractorInterfaceService,
    private commonService:CommonInterfaceService,private letterService:LetterInterfaceService,
    private cmnService: CommonService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteBilling = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Billing';
        break;
      case 'delete':
        this.title = 'Delete Billing';
        break;
      case 'edit':
        this.title = 'Edit Billing';
        break;
    }
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.billingForm = this.formbuilder.group({ 
      id:[],
      projectid:[],
      contractorid:[],
      //bill details
      billtypeid: ['',Validators.required],
      billcategoryid :[,Validators.required],
      billnumber:[,Validators.required],
      billstartdate:[,Validators.required],
      billenddate:[,Validators.required],
      billsubmitdate:[,Validators.required],
      billworkdoneamount:[,Validators.required],
      billescamount:[,Validators.required],
      billgstamount:[,Validators.required],
      billdeductsubamount:[,Validators.required],
      //submittedBillAmount auto calculated
      billsubmittedpercamount:[, [Validators.required,Validators.min(0), Validators.max(100)]],
      //submittedPercentage auto calculated
      billsubmittedletterid:[],

      // sitebill details
      sitebillrecommbilldate:[],
      sitebillldamount:[],
      sitebillwithheldamount:[],
      sitebillworkdoneamount:[],
      sitebillescamount:[],
      sitebillgstamount:[],
      sitebilldeductsubmittedamount:[],
      //siteRecomBillAMount auto calculate
      sitebillrecommpercamount:[],
      //site recommended bill percentage auto calculated
      sitebillreleasedwithheldamount:[],
      sitebillattachmentid:[],//doc
      remarks:[],
      
      // HO bill details
      horecommbilldate:[],
      howorkdoneamount:[],
      hoescamount:[],
      hogstamount:[],
      hodeductedsubmittedamount:[],
      //hoRecomBillAMount auto calculate
      horecommpercentageamount:[],
      //ho recommended bill percentage auto calculated
      holdamount:[],
      howithheldamount:[],
      horeleasedwithheldamount:[],
      hoAttachment:[],
      horecommletterid:[]
    });
    if(!this.deleteBilling){
      this.sessionService.projectEntitySubject$.pipe(take(1),finalize(()=>{
      }),untilDestroyed(this))
      .subscribe((entityData)=>{      
        if(entityData) {     
          this.billingForm.patchValue({
            projectid:entityData.projectId,
            contractorid:entityData.isConsultant ? '' :entityData.contractorId
          });        
          this.sessionService.entityTypeSubject$.subscribe((response:any)=>{
            if(response) {
              let letterTypeitem = response.find((x:any)=>x.name.toLowerCase()==LetterType.BILLING.toLowerCase());
            if(letterTypeitem) {
              forkJoin({
                billTypeAPI: this.commonService.getBillTypeList({},''),
                billCategoryAPI:this.commonService.getBillCategoryList({},''),
                letterAPI: this.letterService.getLettersPartial({
                  projectid:entityData.projectId,
                  contractorid:entityData.isConsultant ? '' :entityData.contractorId,
                    lettertypeid:letterTypeitem.id
                },'').pipe(finalize(()=> this.isLoading=false))
              }).subscribe((response:any)=>{
                if(response && response.billTypeAPI){
                  this.billTypeList= response.billTypeAPI.data
                }
                if(response && response.billTypeAPI){
                  this.billCategoryList= response.billCategoryAPI.data
                }
                if (this.isEdit) {
                  this.setBillingForm(this.data.element);
                } 
                if(response && response.letterAPI) {                  
                  this.letterList = response.letterAPI.data.map((item :any)=>({
                    id: item.id,
                    name:item.letternumber
                  }));
                  this.letterInit=true;                
                };
                this.recommChange();
                this.approveChange();          
              }) 
            }
          }     
        });                  
      }
    });    
  }
  else{    
    this.billingForm.patchValue({
      billnumber: this.data.element.billnumber,
      id:this.data.element.id
    });
    this.isLoading=false;
  }
   
  }
  toggleRecommValidation(flag: boolean): void {
    const controlsToValidate = [
      'sitebillrecommbilldate',
      'sitebillldamount',
      'sitebillwithheldamount',
      'sitebillworkdoneamount',
      'sitebillescamount',
      'sitebillgstamount',
      'sitebilldeductsubmittedamount',
      'sitebillrecommpercamount',
      'sitebillreleasedwithheldamount'
    ];

    controlsToValidate.forEach(controlName => {
      const control = this.billingForm.get(controlName);
      if (control) {
        if (flag) {         
          if(controlName=='sitebillrecommpercamount')
            control.setValidators([Validators.required,Validators.min(0), Validators.max(100)]);
            else
           control.setValidators([Validators.required]);
        } else {
          control.clearValidators();
        }
        control.updateValueAndValidity();
      }
    });
  }
  toggleApprovedValidation(flag: boolean): void {
    const controlsToValidate = [
      'horecommbilldate',
      'howorkdoneamount',
      'hoescamount',
      'hogstamount',
      'hodeductedsubmittedamount',
      'horecommpercentageamount',
      'holdamount',
      'howithheldamount',
      'horeleasedwithheldamount'
    ];

    controlsToValidate.forEach(controlName => {
      const control = this.billingForm.get(controlName);
      if (control) {
        if (flag) {
          control.setValidators([Validators.required]);
        } else {
          control.clearValidators();
        }
        control.updateValueAndValidity();
      }
    });
  }

  recommChange(){
    this.toggleRecommValidation(this.isRecomm.value ?? false);
  }
  approveChange(){
    this.toggleApprovedValidation(this.isApproved.value ??false);
  }
  setBillingForm(data: any) {  
    this.isRecomm.setValue(!!data.sitebillrecommbilldate); 
    this.isApproved.setValue(!!data.horecommbilldate); 
    this.billingForm.patchValue({
      id:data.id,
      //bill details
      billtypeid: data.billtypeid,
      billcategoryid :data.billcategoryid,
      billnumber:data.billnumber,
      billstartdate:data.billstartdate,
      billenddate:data.billenddate,
      billsubmitdate:data.billsubmitdate,
      billworkdoneamount:data.billworkdoneamount,
      billescamount:data.billescamount,
      billgstamount:data.billgstamount,
      billdeductsubamount:data.billdeductsubamount,
      //submittedBillAmount auto calculated
      billsubmittedpercamount:data.billsubmittedpercamount,
      //submittedPercentage auto calculated
      billsubmittedletterid:data.billsubmittedletterid,
      // sitebill details
      sitebillrecommbilldate:data.sitebillrecommbilldate,
      sitebillldamount:data.sitebillldamount,
      sitebillwithheldamount:data.sitebillwithheldamount,
      sitebillworkdoneamount:data.sitebillworkdoneamount,
      sitebillescamount:data.sitebillescamount,
      sitebillgstamount:data.sitebillgstamount,
      sitebilldeductsubmittedamount:data.sitebilldeductsubmittedamount,
      //siteRecomBillAMount auto calculate
      sitebillrecommpercamount:data.sitebillrecommpercamount,
      //site recommended bill percentage auto calculated
      sitebillreleasedwithheldamount:data.sitebillreleasedwithheldamount,
      sitebillattachmentid:data.sitebillattachmentid,//doc
      remarks:data.remarks,      
      // HO bill details
      horecommbilldate:data.horecommbilldate,
      howorkdoneamount:data.howorkdoneamount,
      hoescamount:data.hoescamount,
      hogstamount:data.hogstamount,
      hodeductedsubmittedamount:data.hodeductedsubmittedamount,
      //hoRecomBillAMount auto calculate
      horecommpercentageamount:data.horecommpercentageamount,
      //ho recommended bill percentage auto calculated
      holdamount:data.holdamount,
      howithheldamount:data.howithheldamount,
      horeleasedwithheldamount:data.horeleasedwithheldamount,
      hoAttachment:data.hoAttachment,
      horecommletterid:data.horecommletterid
    });
    this.handleBillChange();
    this.handleSiteBillChange();
    this.handleHoBillChange();
  }

  handleBillChange(){
    let wdAmt= this.billingForm.controls['billworkdoneamount'].value ?? 0;
    let escAmt= this.billingForm.controls['billescamount'].value ?? 0;
    let gstAmt= this.billingForm.controls['billgstamount'].value ?? 0;
    let deductAmt= this.billingForm.controls['billdeductsubamount'].value ?? 0;
    let perAmt= this.billingForm.controls['billsubmittedpercamount'].value ?? 0;   
  
    this.billSubmitAmt=parseFloat(wdAmt)+parseFloat(escAmt)-parseFloat(gstAmt)-parseFloat(deductAmt);
    this.billSubmitPercentage=this.cmnService.roundValue((this.billSubmitAmt*perAmt)/100);
   
  }

  handleSiteBillChange(){
    let wdAmt= this.billingForm.controls['sitebillworkdoneamount'].value ?? 0;
    let escAmt= this.billingForm.controls['sitebillescamount'].value ?? 0;
    let gstAmt= this.billingForm.controls['sitebillgstamount'].value ?? 0;
    let deductAmt= this.billingForm.controls['sitebilldeductsubmittedamount'].value ?? 0;
    let perAmt= this.billingForm.controls['sitebillrecommpercamount'].value ?? 0;
   
    this.siteRecommBillAmount=parseFloat(wdAmt)+parseFloat(escAmt)-parseFloat(gstAmt)-parseFloat(deductAmt);
    this.siteRecommPercentage=this.cmnService.roundValue((perAmt*this.siteRecommBillAmount)/100);
    
   }

   handleHoBillChange(){
    let wdAmt= this.billingForm.controls['howorkdoneamount'].value ?? 0;
    let escAmt= this.billingForm.controls['hoescamount'].value ?? 0;
    let gstAmt= this.billingForm.controls['hogstamount'].value ?? 0;
    let deductAmt= this.billingForm.controls['hodeductedsubmittedamount'].value ?? 0;
    let perAmt= this.billingForm.controls['horecommpercentageamount'].value ?? 0;
   
    this.hoRecommBillAmount=parseFloat(wdAmt)+parseFloat(escAmt)-parseFloat(gstAmt)-parseFloat(deductAmt);
    this.hoRecommBillPercentage=this.cmnService.roundValue((perAmt*this.hoRecommBillAmount)/100);
    
   }
  submit(){  
    this.isBtnClicked=true;
    let formsValue= this.billingForm.value;
    formsValue.billtype= this.billTypeList.find(x=>x.id== this.billingForm.get('billtypeid')?.value)?.name;
    formsValue.billcategory= this.billCategoryList.find(x=>x.id== this.billingForm.get('billcategoryid')?.value)?.name;
     this.subscription= this.sessionService.projectEntitySubject$.pipe(untilDestroyed(this)).subscribe((response)=>{     
      if(response && response.projectId){ 
        if (this.isEdit) {
          this.contratorService.updateContractorBill(this.billingForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked=false })).subscribe({
              next: (response:any) => {
              if(response && response.success)
                this.dialogRef.close({ value: formsValue, valid: true });
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.billingForm.patchValue({
            projectid:response.projectId, 
            contractorid: response.isConsultant? '': response.contractorId
          })
          this.billingForm.value.id=null;
          this.contratorService.createContractorBill(this.billingForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.billingForm.controls["id"].setValue(response.data.id);
                formsValue.id=response.data.id; 
                this.dialogRef.close({ value: formsValue, valid: true });
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
    });
  }

  delete() {
      this.contratorService.deleteContractorBill({id:this.billingForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.billingForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }

  billletterSelect(data:any){ 
    console.log(data); 
    if(data && data.value)
      this.billingForm.patchValue({billsubmittedletterid:data.value.id})
  }

  recommletterSelect(data:any){  
    if(data && data.value)
      this.billingForm.patchValue({horecommletterid:data.value.id})
  }

  bill_letter(){
    this.newLetter(LetterType.CONTRACTORBILL);
  }
  recom_Letter(){
    this.newLetter(LetterType.CONTRACTORREOMMENDED);
  }
  newLetter(letterType:string){
       const config = this.defaultdialogoptions;
      config.data = {
          pageGuid: this.route.snapshot.data['pageGuid'],
          type: this.route.snapshot.data['type'],
          letter_type : letterType,
          letter_entity: LetterEntity.CONTRACTOR
      };
      config.minWidth= '75vw';
      const dialogRef = this.dialog.open(AttachLetterComponent, config);
          dialogRef.afterClosed().subscribe((data:any) => {
            if (data && data.valid) {             
              this.notifiBarService.showsnackbar('The letter created successfully.');              
              this.letterList.unshift({id:data.value.id, name:data.value.letternumber});
            }
            else {
             //this.router.navigate(['../'], { relativeTo: this.route });
            }
      });
    }


}
