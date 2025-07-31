import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { BoqContingencyInterfaceService } from '@app/shared/services/external/boq/boq-contingency-interface.service';
import { InvContingencyInterfaceService } from '@app/shared/services/external/invoice/inv-contingency-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';


@Component({
  selector: 'app-manage-contingencies',
  standalone: false,
  templateUrl: './manage-contingencies.component.html',
  styleUrl: './manage-contingencies.component.scss'
})
export class ManageContingenciesComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  isHeading: boolean = false;
  title: string='Add';
  conForm: FormGroup = new FormGroup({});
  deletecon=false;
  headingForm: FormGroup = new FormGroup({});
  readonly dialog = inject(MatDialog);
  isBtnClicked=false;
   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '800px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageContingenciesComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private contingencyService:InvContingencyInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if(type=='heading'){
      this.isHeading=true;
    }
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deletecon = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Contingencies';
        break;
      case 'delete':
        this.title = 'Delete Contingencies';
        break;
      case 'edit':
        this.title = 'Edit Contingencies';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.conForm = this.formbuilder.group({ 
      id: [''],
      projectid:[],
      unit :[],
      amount:[,Validators.required],
      description:[,Validators.required]
    });
    if(this.isHeading){
      console.log(this.data);
      this.headingForm= this.formbuilder.group({ 
        id: [''],
        description:[this.data.element.description]
      });
      this.sessionService.projectEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
        if(response && response.projectId){
          this.headingForm.patchValue({id:response.projectId});
        }
      });
     
    }
    if (this.isEdit || this.deletecon) {
      this.setconForm(this.data.element);
    }
    console.log(this.data);
    this.isLoading=false;
  }

  setconForm(data: any) {    
    this.conForm.patchValue({
      id: data.id,
      projectid:data.projectid,
      unit :data.unit,
      amount:data.amount,
      description:data.description,
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.isBtnClicked=true;
    this.sessionService.projectEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.projectId){
        this.conForm.patchValue({projectid:response.projectId});
        if (this.isEdit) {
          this.contingencyService.updateBoqContingency(this.conForm.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.conForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
                this.dialogRef.close({ value: this.conForm.value, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.conForm.value.id=null;
          let formData= {
            projectid:response.projectId,
            scopes:[this.conForm.value]
          }          
          this.contingencyService.createBoqContingency(formData, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.conForm.addControl('totalamount', this.formbuilder.control(response.data.scopes[0].totalamount));
                this.conForm.controls["id"].setValue(response.data.scopes[0].id);               
                this.dialogRef.close({ value: this.conForm.value, valid: true });
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
      this.contingencyService.deleteBoqContingency({id:this.conForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.conForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
  desc_submit(){
    this.isBtnClicked=true;
    this.contingencyService.UpdateContingencyDescription(this.headingForm.value, '')
    .pipe(finalize(() => { this.isBtnClicked = false; })).subscribe({
    next:(response: any) => {
      if (response && response.success) 
        this.dialogRef.close({ value: this.headingForm.value, valid: true });
    },
    error: (err: any) => {
        this.dialogRef.close(err);
      }
    });
  }
}