import { ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { untilDestroyed } from '@app/core/until-destroyed';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { TicketInterfaceService } from '@app/shared/services/external/ticket-interface.service';
import { ValidatorService } from '@app/shared/services/validator.service';
import moment from 'moment';
import { finalize, forkJoin } from 'rxjs';


@Component({
  selector: 'app-manage-ticket',
  standalone: false,
  templateUrl: './manage-ticket.component.html',
  styleUrl: './manage-ticket.component.scss'
})
export class ManageTicketComponent {
  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string='Add';
  ticketForm: FormGroup = new FormGroup({});
  employeeList:any[]=[];
  vehicleList:any[]=[];
  empInit=false;
  deleteTicket=false;
  projectName='';
  isBtnClicked=false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageTicketComponent>, private formbuilder: FormBuilder,
    private employeeService: EmployeeInterfaceService, private ticketService:TicketInterfaceService,
  private cdr:ChangeDetectorRef){
      this.data = data || {};
  }
  
  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('500px');
      this.deleteTicket = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Ticket';
        break;
      case 'delete':
        this.title = 'Delete Ticket';
        break;
      case 'edit':
        this.title = 'Edit Ticket';
        break;
    }
  }

  openFromIcon(timepicker: { open: () => void }) {    
      timepicker.open();
  
  }

  ngOnInit(){
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.ticketForm = this.formbuilder.group({ 
      id: [],
      projectid :[,Validators.required],
      source:[,Validators.required],
      ticketnumber:[],
      employeeids:[],
      destination:[],
      bookingdate:[],
      personname:[],
      ticketamount:[],
      proof:[],
      proofaddress:[]
    });
    if(!this.deleteTicket){
      if (this.isEdit) {      
        this.setTicketForm(this.data.element);
        this.projectChange();
      }
      else{
        this.isLoading=false;
        this.empInit=true;
      }

    } else {      
      this.ticketForm.patchValue({
        ticketnumber:this.data.element.ticketnumber,
        id:this.data.element.id});
      this.isLoading=false;
    }
    
  }
  ngOnDestroy(){

  }
  ngAfterViewInit(){
    this.cdr.detectChanges();
  }
  projectChange(data:any=null){
    this.empInit=false;
    if(data && data.value){
      this.ticketForm.patchValue({projectid:data.value.id});
      this.projectName= data.value.projectshortname;
    }
    let projectId = this.ticketForm.controls['projectid'].value;   
    if(projectId){     
      forkJoin({       
        empAPI:this.employeeService.getSiteEmployeeParital({projectId: projectId},'')
      }).pipe(untilDestroyed(this), finalize(()=> this.isLoading=false))
      .subscribe((response:any)=>{           
       if(response && response.empAPI.success){
         this.employeeList= response.empAPI.data.map((item:any)=>({
          id:item.id,
          name:item.code+ ' - '+item.name        
         }));
         this.empInit=true;
       }
      })
    }
    this.cdr.detectChanges();
  }

  setTicketForm(data: any) {    
    this.ticketForm.patchValue({
      id: data.id,
      projectid :data.projectid,
      ticketnumber:data.ticketnumber,
      source:data.source,
      employeeids:data.employeeids,
      destination:data.destination,
      bookingdate:data.bookingdate,
      personname:data.personname,
      ticketamount:data.ticketamount,
      proofaddress:data.proofaddress,
      proof:data.proof
    });
  }

  empSelect(event:any){
    if(event.value){
      this.ticketForm.patchValue({employeeids:event.value.map((item:any)=>item.id)});  
    }
  }

  fileUploded(data:any){
    if(data)
      this.ticketForm.patchValue({proof:data});
  }
  
  submit(){   
    let formsValue= this.ticketForm.value;    
    this.isBtnClicked=true;
    let formData = new FormData(); 
    Object.entries(this.ticketForm.controls).forEach(([key, value]) => {
      if(key!='bookingdate'){          
        if (value.value != null) {
          formData.append(key, value.value);
        } else {
          formData.delete(key);
        }
      }  
      if(key=='employeeids'){   
        formData.delete(key);     
        this.ticketForm.get('employeeids')?.value.forEach((id:any) => formData.append('employeeids', id));
      }   
    });    
    formData.append('bookingdate', moment(this.ticketForm.controls['bookingdate']?.value).toISOString());

    formsValue.projectname= this.projectName;
    if (this.isEdit) { 
      this.ticketService.updateTicket(formData, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next: (response:any) => {
          if(response && response.success)
            this.dialogRef.close({ value: formsValue, valid: true });
        },
        error: (err: any) => {
            this.dialogRef.close(err);
          }
        });
    } else {
      this.ticketForm.value.id=null;  
      this.ticketService.createTicket(formData, '')
        .pipe(finalize(() => { this.isLoading = false; })).subscribe({
          next:(response: any) => {
          if (response && response.success) {
            formsValue.id=response.data.id;
            formsValue.proofaddress=response.data.proofaddress;
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
      this.ticketService.deleteTicket({id:this.ticketForm.value.id}, '')
       .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next:(response: any) => {
          if (response && response.success) 
           this.dialogRef.close({ value: this.ticketForm.value, valid: true });
      },
      error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }
}




