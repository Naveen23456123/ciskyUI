import { Component, EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-download-pdf',
  standalone: false,
  templateUrl: './download-pdf.component.html',
  styleUrl: './download-pdf.component.scss'
})
export class DownloadPdfComponent {

  @Input() toolTip:string='';
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  clicked(){
    this.clickEvent.emit();
  }
}
