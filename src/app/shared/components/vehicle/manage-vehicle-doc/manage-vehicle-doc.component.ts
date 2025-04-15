import { Component,ElementRef,Inject, Optional, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from '@app/core/until-destroyed';
import { DialogService } from '@app/shared/services/dialog.service';
import { VehicleInterfaceService } from '@app/shared/services/external/vehicle-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { finalize } from 'rxjs';
import { DeleteVehicleDocComponent } from '../delete-vehicle-doc/delete-vehicle-doc.component';

@Component({
  selector: 'app-manage-vehicle-doc',
  standalone: false,
  templateUrl: './manage-vehicle-doc.component.html',
  styleUrl: './manage-vehicle-doc.component.scss'
})
export class ManageVehicleDocComponent {
  public data:any;
  isLoading=true;
  isBtnClicked=false;
  docForm: FormGroup = new FormGroup({});
  dataSource!: MatTableDataSource<any[]>;
  deleteVehicleDoc=false;
  displayedColumns: string[] = ['serial','name', 'doc', 'action'];
  defaultdialogOptionConfig: MatDialogConfig = {
    minWidth: '45vw',
    disableClose: true,
    data: {}
  }
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
   private formbuilder : FormBuilder, private vehicleService:VehicleInterfaceService,
  private notifyBarService:NotifyBarService, private dialogService:DialogService,private dialog: MatDialog){
    this.data= data || {};
  }
  ngOnInit(){
    this.docForm= this.formbuilder.group({
      files: this.formbuilder.array([])
    });
    this.vehicleService.getVehicleDocumentsById({id:this.data.element.id},'').pipe(untilDestroyed(this),finalize(()=> this.isLoading=false))
    .subscribe((response:any)=>{
      if(response && response.success){
        this.dataSource= new MatTableDataSource(response.data);
      }
    });
    this.addDocControls();
  }
  ngOnDestroy(){}

  get files() {
    return this.docForm.get('files') as FormArray;
  }

  addDocControls() {
    const group = this.formbuilder.group({
      id:[],
      name: ['',Validators.required], 
      file: ['',Validators.required]
    });
    this.files.push(group);
  }

  onDocNameUpdate(value:string, index:number){
    (this.docForm.controls['files'] as FormArray).at(index).patchValue({
      name:value
    });
  }

  fileUploded(file:any,index:number){      
    (this.docForm.get('files') as FormArray).at(index).patchValue({
      file:file
    });
  }

  removeDocControl(index: number) {
    this.files.removeAt(index);
  }
  submit(){
    this.isBtnClicked=true;  
    let formData = new FormData(); 
    formData.append('id', this.data.element.id);
      this.docForm.controls['files']?.value?.forEach((item:any, index:any) => {                
        formData.append(`files[${index}].name`, item.name);
        formData.append(`files[${index}].file`, item.file);
      });
      this.vehicleService.createVehicleDocumentsById(formData, '')
        .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked=false })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            this.notifyBarService.showsnackbar('Vehicle documents saved successfully');
            this.addDocRows(response.data);
            this.docForm.reset();
            this.files.clear();
            this.addDocControls();
          } else {
            //this.dialogRef.close({ value: null, valid: false });
          }
        },
         error: (err: any) => {
            //this.dialogRef.close(err);
          }
      });
  }
  addDocRows(data:any){
    this.dataSource.data.unshift(...data);  
    this.dataSource._updateChangeSubscription();
  }
  deleteDocRow(id:any){
    const index = this.dataSource.data.findIndex((x:any) => x.id == id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  deleteDoc(row:any){
    this.defaultdialogOptionConfig.data = {     
      element: {vehid:this.data.element.id,
        documentid:row.id,
        name: row.name
      }
    };

    const dialogRef = this.dialog.open(DeleteVehicleDocComponent,this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
          this.notifyBarService.showsnackbar('Vehicle Document removed successfully');
          this.deleteDocRow(data.value.documentid);
      }
      else {
            
      }
    });   
  }

}
