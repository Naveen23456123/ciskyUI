import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-download-csv',
  standalone: false,
  templateUrl: './download-csv.component.html',
  styleUrl: './download-csv.component.scss'
})
export class DownloadCsvComponent {

  @Output() clickEvent: EventEmitter<any> = new EventEmitter();
    
      clicked(){
        this.clickEvent.emit();
      }
}
