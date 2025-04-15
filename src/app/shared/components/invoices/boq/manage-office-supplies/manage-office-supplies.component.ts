import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { LetterType } from '@app/shared/models/constant.config';
import { BoqOfficeSupplyInterfaceService } from '@app/shared/services/external/boq/boq-office-supply-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-manage-office-supplies',
  standalone: false,
  templateUrl: './manage-office-supplies.component.html',
  styleUrl: './manage-office-supplies.component.scss'
})
export class ManageOfficeSuppliesComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  osForm: FormGroup = new FormGroup({});
  deleteos=false;
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageOfficeSuppliesComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private officeSupplyService: BoqOfficeSupplyInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteos = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Office Supplies';
        break;
      case 'delete':
        this.title = 'Delete Office Supplies';
        break;
      case 'edit':
        this.title = 'Edit Office Supplies';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.osForm = this.formbuilder.group({ 
      id: [''],
      projectid:[],
      itemname :[],
      numberofmonths:[],
      ratepermonth:[]
    });
    
    if (this.isEdit || this.deleteos) {
      this.setosForm(this.data.element);
    }
    this.isLoading=false;
  }

  setosForm(data: any) {    
    this.osForm.setValue({
      id: data.id,
      itemname:data.itemname,
      projectid:data.projectid,
      numberofmonths :data.numberofmonths,
      ratepermonth:data.ratepermonth,
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.sessionService.projectEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.projectId){
        this.osForm.patchValue({projectid:response.projectId});
        if (this.isEdit) {
          this.officeSupplyService.updateBoqOfficeSupply(this.osForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.osForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
                this.dialogRef.close({ value: this.osForm.value, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.osForm.value.id=null;
          this.officeSupplyService.createBoqOfficeSupply(this.osForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.osForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
                this.osForm.controls["id"].setValue(response.data.id);
                this.dialogRef.close({ value: this.osForm.value, valid: true });
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
      this.officeSupplyService.deleteBoqOfficeSupply({id:this.osForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.osForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }

}