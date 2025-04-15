import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { InventoryInterfaceService } from '@app/shared/services/external/inventory-interface.service';
import { ItemInterfaceService } from '@app/shared/services/external/item-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-site-inventory',
  standalone: false,
  templateUrl: './manage-site-inventory.component.html',
  styleUrl: './manage-site-inventory.component.scss'
})
export class ManageSiteInventoryComponent {
public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  inventoryForm: FormGroup = new FormGroup({});
  deleteInventory=false;
  empList:any[] = [];
  itemList:any[] = [];
  isProject=true;
  projectName='';
  empInit=false;
  private subscription: Subscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageSiteInventoryComponent>, private formbuilder: FormBuilder,
    private sessionservice: SessionService,  private router: Router,
    private inventoryService: InventoryInterfaceService, private projectService:ProjectInterfaceService,
    private employeeService:EmployeeInterfaceService, private itemService:ItemInterfaceService){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteInventory = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Inventory';
        break;
      case 'delete':
        this.title = 'Delete Inventory';
        break;
      case 'edit':
        this.title = 'Edit Inventory';
        break;
    }
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.inventoryForm = this.formbuilder.group({
      id:[], 
      projectid: [, Validators.required],
      itemid:[, Validators.required],
      employeeid :[[], Validators.required],
      description:[],
      quantity:[, Validators.required],
      costperitem:[, Validators.required],
      purchasedate:[, Validators.required]
    });

    if(!this.deleteInventory){
      this.subscription =this.sessionservice.projectEntitySubject$.subscribe((entityResponse:any)=>{
        if(entityResponse && entityResponse.projectId){
          this.inventoryForm.patchValue({projectid:entityResponse.projectId});
        }
        else
          this.isProject=false;
          forkJoin({
            itemAPI:this.itemService.getItemListByOrgId({  }, ''),
            employeeAPI:this.employeeService.getSiteEmployeeParital({ },'')
          }).pipe(finalize(() => { this.isLoading = false })).subscribe((response:any) => {
              if(response && response.itemAPI && response.itemAPI.success)
                this.itemList= response.itemAPI.data;
              if(response && response.employeeAPI && response.employeeAPI.success){
                this.empList= response.employeeAPI.data.map((item:any)=>({
                  id:item.id,
                  name: item.code+' - '+item.name
                }));
                this.empInit=true;
              }
          });
    
          if (this.isEdit) {
            this.setCompanyForm(this.data.element);
            this.projectName= this.data.element.project;
            this.projectChange();
          }
      });     
    }
    else{
      this.inventoryForm.patchValue({
        description:this.data.element.description,
        id:this.data.element.id
      });
      this.isLoading=false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  empSelect(event:any){
    if(event.value){
      this.inventoryForm.patchValue({employeeid:event.value.id});  
    }
  }

  projectChange(data:any=null){
    this.empInit=false;
    if(data && data.value){
      this.inventoryForm.patchValue({projectid:data.value.id});
      this.projectName= data.value.projectshortname;
    }
    let projectId = this.inventoryForm.controls['projectid'].value;
    if(projectId){
      forkJoin({        
        empAPI:this.employeeService.getSiteEmployeeParital({},'')
      }).pipe(untilDestroyed(this), finalize(()=> this.isLoading=false))
      .subscribe((response:any)=>{       
       if(response && response.empAPI.success){
         this.empList= response.empAPI.data.map((item:any)=>({
          id:item.id,
          name:item.code+ ' - '+item.name        
         }));
         this.empInit=true;
       }
      })
    }
  }

  setCompanyForm(data: any) {    
    this.inventoryForm.setValue({
      id:data.id, 
      projectid: data.projectid,
      itemid:data.itemid,
      employeeid:data.employeeid,
      description:data.description,
      quantity:data.quantity,
      costperitem:data.costperitem,
      purchasedate:data.purchasedate
    });
  }

  submit(){   
    let formsValue= this.inventoryForm.value;
    formsValue.employee = this.empList.find(x=>x.id== this.inventoryForm.get('employeeid')?.value).name?.split('-')[1];
    formsValue.project = this.projectName;
    formsValue.item = this.itemList.find(x=>x.id== this.inventoryForm.get('itemid')?.value).name;
    if (this.isEdit) {
      this.inventoryService.updateInventory(this.inventoryForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success) 
              this.dialogRef.close({ value: formsValue, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.inventoryForm.value.id=null;
      this.inventoryService.createInventory(this.inventoryForm.value, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
            if (response && response.success)  {             
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

  delete() {
      this.inventoryService.deleteInventory({id:this.inventoryForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
            this.dialogRef.close({ value: this.inventoryForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}

