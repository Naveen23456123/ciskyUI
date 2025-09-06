import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-viewer',
  standalone: false,
  template: `<ngx-extended-pdf-viewer useBrowserLocale="true" [textLayer]="true" [src]="pdfFile"></ngx-extended-pdf-viewer>`,
  styleUrl: './pdf-viewer.component.scss'
})
export class PdfViewerComponent {
  pdfFile:any;
  data:any;
  url=true;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {    
    this.data = data || {};
  }
  ngOnInit(){
    if(this.data.element){
      this.url= this.data.element?.url ?? true;
      if(!this.url){
        this.data.element.arrayBuffer().then((buffer: ArrayBuffer) => {
          this.pdfFile = new Uint8Array(buffer);
        });
      }
      else
        this.pdfFile = this.data.element;
    }
  }
}
