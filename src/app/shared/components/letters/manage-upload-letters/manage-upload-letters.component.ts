import { Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '@app/shared/services/common.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-upload-letters',
  standalone: false,
  templateUrl: './manage-upload-letters.component.html',
  styleUrl: './manage-upload-letters.component.scss'
})
export class ManageUploadLettersComponent {

  allColumnsData:any;
  replyByList:any[]=[];
  statusList:any[]=[];
  exchangeTypeList:any[]=[];
  relatedToList:any[]=[];
  errors:any[]=[];
  isImporting:boolean=false;

  constructor(@Optional() private dialogRef: MatDialogRef<ManageUploadLettersComponent>,private letterService:LetterInterfaceService, private sessionService:SessionService,
    private commonService:CommonService, private commonIntService:CommonInterfaceService
  ){

  }
  ngOnInit(){
   this.sessionService.exchangeTypeSubject$.subscribe((response)=>{
      if(response)
        this.exchangeTypeList=response;
    });

    this.sessionService.generalStatusSubject$.subscribe((response)=>{
      if(response)
        this.statusList=response;
    });
    this.sessionService.workOwnerSubject$.subscribe((response)=>{
      if(response)
        this.relatedToList=response;
    });
    this.sessionService.officeTypeSubject$.subscribe((response)=>{
      if(response)
        this.replyByList=response;
    });
    this.allColumnsData = this.letterService.getTemplateColumnList();
  }
  importing(data:any){
    this.isImporting=true;
    let letterData=data.map((item:any) => ({ ...item }));
    let rbElement = letterData.filter((ele:any) => {
      if(!this.replyByList.find(x=>x.name==ele.replybyid)){          
        ele.error = true;           
        return ele;
      }
      else{
        ele.replybyid=this.replyByList.find(x=>x.name==ele.replybyid).id;  
      }
    });
    if(rbElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Reply By.');

    let etElement= letterData.filter((ele:any) => {
      if(!this.exchangeTypeList.find(x=>x.name==ele.exchangetypeid)){          
        ele.error = true;           
        return ele;
      } else{
        ele.exchangetypeid=this.exchangeTypeList.find(x=>x.name==ele.exchangetypeid).id;  
      }
    });
    if(etElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Exchange Type.');
    let relatedtoElement= letterData.filter((ele:any) => {
      if(!this.relatedToList.find(x=>x.name==ele.relatedtoid)){          
        ele.error = true;           
        return ele;
      } else{
        ele.relatedtoid=this.relatedToList.find(x=>x.name==ele.relatedtoid).id;  
      }
    });
    if(relatedtoElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Related To.');
    let statusElement= letterData.filter((ele:any) => {
      if(!this.statusList.find(x=>x.name==ele.statusid)){          
        ele.error = true;           
        return ele;
      } else{
        ele.status=ele.statusid;
        ele.statusid=this.statusList.find(x=>x.name==ele.statusid).id;  
      }
    });
    if(statusElement.length > 0)
      this.insertErrors('Kindly provide the correct value for Status.');
  
    letterData.filter((ele:any) => {
      ele.letterdate=this.commonService.convertDateToISO(ele.letterdate);  
    });
    if(this.errors.length == 0){
      this.letterService.createBulkLetter(letterData, '')
        .pipe(finalize(() => { this.isImporting = false; })).subscribe({
          next:(response: any) => {             
            if (response && response.success)  {
              letterData.forEach((element:any) => {
                element.id= response.data.find((x:any)=>x.letternumber==element.letternumber).id;   
                element.project=response.data.find((x:any)=>x.letternumber==element.letternumber).project;        
              });
              this.dialogRef.close({ value: letterData, valid: true });
          } else {              
            this.dialogRef.close({ value: null, valid: false });
          }
        },
        error: (err: any) => {
            this.errors = [...this.errors,err.error.error.message];
          }
      });
    }
    else
      this.isImporting=false;
}
  insertErrors(message:any){
    this.errors = [...this.errors, message];
  }
}

