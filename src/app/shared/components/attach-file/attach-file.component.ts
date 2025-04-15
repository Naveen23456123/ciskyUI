import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-attach-file',
  standalone: false,
  templateUrl: './attach-file.component.html',
  styleUrl: './attach-file.component.scss'
})
export class AttachFileComponent {
  
  @Input() Uploadtitle:string="";
  fileName:string='';
  @Input() showRemove =true;
  @Output() textChanged = new EventEmitter<string>(); 
  @Output() onfileUpload: EventEmitter<any> = new EventEmitter();
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();
  onInputChange() {
    this.textChanged.emit(this.fileName); 
  }

  onfileUploaded(file:any){
     this.onfileUpload.emit(file);
  }
  clicked(){
    this.clickEvent.emit();
  }
}
