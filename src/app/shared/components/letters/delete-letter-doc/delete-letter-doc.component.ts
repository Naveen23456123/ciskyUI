import { Component,Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';

@Component({
  selector: 'app-delete-letter-doc',
  standalone: false,
  templateUrl: './delete-letter-doc.component.html',
  styleUrl: './delete-letter-doc.component.scss'
})
export class DeleteLetterDocComponent {
  public data:any;
  isLoading=true;
  isBtnClicked=false;
  
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private letterService:LetterInterfaceService,
   @Optional() private dialogRef: MatDialogRef<DeleteLetterDocComponent>){
    this.data= data || {};
  }
  ngOnInit(){
    this.isLoading=false;   
  }
  delete(){  
    this.letterService.deleteLetterDocumentsById({id:this.data.element.vehid,documentid:this.data.element.documentid},'')
      .subscribe((response:any)=>{
        if(response && response.success){
          this.dialogRef.close({value:this.data.element, valid: true });
        }
    });
  }
}
