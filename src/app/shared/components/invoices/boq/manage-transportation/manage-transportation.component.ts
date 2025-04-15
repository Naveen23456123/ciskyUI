import { Component, inject, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { BoqTransportationInterfaceService } from '@app/shared/services/external/boq/boq-transportation-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-manage-transportation',
  standalone: false,
  templateUrl: './manage-transportation.component.html',
  styleUrl: './manage-transportation.component.scss'
})
export class ManageTransportationComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  tpForm: FormGroup = new FormGroup({});
  deletetp=false;
  readonly dialog = inject(MatDialog);

   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '700px', 
        disableClose: false,
        data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageTransportationComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router,private route: ActivatedRoute,
    private notifibarservice: NotifyBarService, private transportService:BoqTransportationInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deletetp = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Transportation';
        break;
      case 'delete':
        this.title = 'Delete Transportation';
        break;
      case 'edit':
        this.title = 'Edit Transportation';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.tpForm = this.formbuilder.group({ 
      id: [''],
      projectid:[],
      description :[],
      constructionperiod:[],
      dlpoandmperiod:[],
      rate:[]
    });
    
    if (this.isEdit || this.deletetp) {
      this.settpForm(this.data.element);
    }
    this.isLoading=false;
  }

  settpForm(data: any) {    
    this.tpForm.patchValue({
      id: data.id,
      description :data.description,
      constructionperiod:data.constructionperiod,
      dlpoandmperiod:data.dlpoandmperiod,
      rate:data.rate,
    });
  }

  ngOnDestroy(){}

  submit(){ 
    this.sessionService.projectEntitySubject$.pipe(take(1),untilDestroyed(this)).subscribe((response:any)=>{
      if(response && response.projectId){
        this.tpForm.patchValue({projectid:response.projectId});
        
        if (this.isEdit) {
          this.transportService.updateBoqTransportation(this.tpForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next: (response:any) => {
              if(response && response.success){
                this.tpForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
                this.dialogRef.close({ value: this.tpForm.value, valid: true });
              }
            },
            error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.tpForm.value.id=null;
          this.transportService.createBoqTransportation(this.tpForm.value, '')
            .pipe(finalize(() => { this.isLoading = false; })).subscribe({
              next:(response: any) => {
              if (response && response.success) {
                this.tpForm.addControl('totalamount', this.formbuilder.control(response.data.totalamount));
                this.tpForm.controls["id"].setValue(response.data.id);
                this.dialogRef.close({ value: this.tpForm.value, valid: true });
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
      this.transportService.deleteBoqTransportation({id:this.tpForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.tpForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}
