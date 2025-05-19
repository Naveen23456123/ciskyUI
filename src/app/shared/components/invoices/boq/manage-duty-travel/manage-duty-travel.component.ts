import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { LetterType } from '@app/shared/models/constant.config';
import { BoqDutyTravelInterfaceService } from '@app/shared/services/external/boq/boq-duty-travel-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-manage-duty-travel',
  standalone: false,
  templateUrl: './manage-duty-travel.component.html',
  styleUrl: './manage-duty-travel.component.scss'
})
export class ManageDutyTravelComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  dtForm: FormGroup = new FormGroup({});
  deletedt=false;
  readonly dialog = inject(MatDialog);
  isBtnClicked=false;
   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageDutyTravelComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService,private dutyTravelService:BoqDutyTravelInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deletedt = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Duty Travel';
        break;
      case 'delete':
        this.title = 'Delete Duty Travel';
        break;
      case 'edit':
        this.title = 'Edit Duty Travel';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.dtForm = this.formbuilder.group({ 
      id: [''],
      projectid:[],
      description :[,Validators.required],
      numberofminimumtrips:[,Validators.required],
      ratepertrip:[,Validators.required]
    });
    
    if (this.isEdit || this.deletedt) {
      this.setdtForm(this.data.element);
    }
    this.isLoading=false;
  }

  setdtForm(data: any) {    
    this.dtForm.patchValue({
      id: data.id,
      description :data.description,
      numberofminimumtrips:data.numberofminimumtrips,
      ratepertrip:data.ratepertrip
    });
  }

 ngOnDestroy(){}

  submit(){   
    this.isBtnClicked=true;  
    this.sessionService.projectEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.projectId){
        this.dtForm.patchValue({projectid:response.projectId});       
        if (this.isEdit) {
          this.dutyTravelService.updateBoqDutyTravel(this.dtForm.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.dtForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
                this.dialogRef.close({ value: this.dtForm.value, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {          
          this.dtForm.value.id=null;
          this.dutyTravelService.createBoqDutyTravel(this.dtForm.value, '')
            .pipe(finalize(() => { this.isLoading = false;this.isBtnClicked=false })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.dtForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
                this.dtForm.controls["id"].setValue(response.data.id);
                this.dialogRef.close({ value: this.dtForm.value, valid: true });
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
      this.dutyTravelService.deleteBoqDutyTravel({id:this.dtForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.dtForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }

}