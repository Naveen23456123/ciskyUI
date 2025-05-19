import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { LetterType } from '@app/shared/models/constant.config';
import { BoqOfficeFurnitureInterfaceService } from '@app/shared/services/external/boq/boq-office-furniture-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize,take } from 'rxjs';

@Component({
  selector: 'app-manage-office-furniture',
  standalone: false,
  templateUrl: './manage-office-furniture.component.html',
  styleUrl: './manage-office-furniture.component.scss'
})
export class ManageOfficeFurnitureComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  ofForm: FormGroup = new FormGroup({});
  deleteof=false;
  readonly dialog = inject(MatDialog);
  isBtnClicked=false;
   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageOfficeFurnitureComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private officeFurnitureService: BoqOfficeFurnitureInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteof = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Office Furtinure';
        break;
      case 'delete':
        this.title = 'Delete Office Furtinure';
        break;
      case 'edit':
        this.title = 'Edit Office Furtinure';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.ofForm = this.formbuilder.group({ 
      id: [''],
      description:[ ,Validators.required],
      projectid:[],
      numberofmonths:[,Validators.required],
      ratepermonth:[,Validators.required]
    });
    
    if (this.isEdit || this.deleteof) {
      this.setofForm(this.data.element);
    }
    this.isLoading=false;
  }

  setofForm(data: any) {    
    this.ofForm.setValue({
      id: data.id,
      description:data.description,
      projectid:data.projectid,
      numberofmonths :data.numberofmonths,
      ratepermonth:data.ratepermonth,
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.isBtnClicked=true;
    this.sessionService.projectEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.projectId){
        this.ofForm.patchValue({projectid:response.projectId});
        if (this.isEdit) {
          this.officeFurnitureService.updateBoqOfficeFurniture(this.ofForm.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.ofForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
                this.dialogRef.close({ value: this.ofForm.value, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.ofForm.value.id=null;
          this.officeFurnitureService.createBoqOfficeFurniture(this.ofForm.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.ofForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
                this.ofForm.controls["id"].setValue(response.data.id);
                this.dialogRef.close({ value: this.ofForm.value, valid: true });
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
      this.officeFurnitureService.deleteBoqOfficeFurniture({id:this.ofForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.ofForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }

}