import { Component,Inject,Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-reading-image',
  standalone: false,
  templateUrl: './view-reading-image.component.html',
  styleUrl: './view-reading-image.component.scss'
})
export class ViewReadingImageComponent {
  isLoading=true;
  data:any;
  startReading='';
  endReading='';
 
    constructor(@Inject(MAT_DIALOG_DATA) data: any,
      @Optional() private dialogRef: MatDialogRef<ViewReadingImageComponent>){
        this.data = data || {};
    }
  ngOnInit(){
    
    if(this.data.element){
      this.startReading= this.data.element.initialimageaddress;
      this.endReading= this.data.element.endimageaddress;
      this.isLoading=false;
    }
    
  }

}
