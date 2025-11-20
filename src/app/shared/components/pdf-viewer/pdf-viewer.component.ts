import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  standalone: false,
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss'
})
export class PdfViewerComponent {
  pdfFile: any;
  data: any;
  url = true;
  @Input() isLoading = false;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private pdfService: NgxExtendedPdfViewerService) {
    this.data = data || {};
  }
  ngOnInit() {
    if (this.data.element) {
      this.url = this.data.element?.url ?? true;
      if (!this.url) {
        this.data.element.arrayBuffer().then((buffer: ArrayBuffer) => {
          this.pdfFile = new Uint8Array(buffer);
        });
      }
      else
        this.pdfFile = this.data.element;
    }
  }

  onPdfLoading(isLoading: boolean) {
    console.log(isLoading);
    this.isLoading = isLoading;
  }

  onPagesLoaded() {
    this.isLoading = false;
  }
}
