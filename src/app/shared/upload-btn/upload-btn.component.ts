import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-upload-btn',
  standalone: false,
  templateUrl: './upload-btn.component.html',
  styleUrl: './upload-btn.component.scss'
})
export class UploadBtnComponent {

  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  clicked(){
    this.clickEvent.emit();
  }
}
