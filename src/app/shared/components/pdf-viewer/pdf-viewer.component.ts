import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { jsPDF } from 'jspdf';

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
  async ngOnInit() {
    if (this.data.element) {
      //default will be url if not send url to false for generation of image for pdf
      this.url = this.data.element?.url ?? true;
      //this.url=false;
      if (this.data?.url == false) {
        this.data.element.arrayBuffer().then((buffer: ArrayBuffer) => {
          this.pdfFile = new Uint8Array(buffer);
        });
      }
      else {
        const isPdf = await this.checkIfPdfFromS3(this.data.element);
        if (!isPdf) {
          this.viewS3Image(this.data.element);
          return;
        }
        this.pdfFile = this.data.element;
      }
    }
  }

  onPdfLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  onPagesLoaded() {
    this.isLoading = false;
  }

  async viewS3Image(imageUrl: string) {
    try {
      const pdfBlob = await this.convertS3ImageToPdf(imageUrl);
      this.pdfFile = URL.createObjectURL(pdfBlob); // bind to viewer
    } catch (error) {
    }
  }
  async convertS3ImageToPdf(imageUrl: string): Promise<Blob> {
    const img = await this.loadImage(imageUrl);

    const pxToMm = 0.264583;

    const pdf = new jsPDF({
      orientation: img.naturalWidth > img.naturalHeight ? "landscape" : "portrait",
      unit: "mm",
      format: [
        img.naturalWidth * pxToMm,
        img.naturalHeight * pxToMm
      ]
    });

    pdf.addImage(
      img,
      "JPEG",
      0,
      0,
      img.naturalWidth * pxToMm,
      img.naturalHeight * pxToMm
    );

    return pdf.output("blob");
  }

  loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Important for S3!

      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);

      img.src = url;
    });
  }
  async checkIfPdfFromS3(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) return false;

      const contentType = response.headers.get("Content-Type");

      if (contentType?.includes("application/pdf")) return true;

      // fallback: check blob type
      const blob = await response.blob();
      return blob.type === "application/pdf";

    } catch (e) {
      return false;
    }
  }
}
