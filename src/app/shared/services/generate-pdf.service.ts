import { ElementRef, Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {

  constructor() { }

   generatePDF(contentRef: ElementRef, fileName: string = 'form-data.pdf') {
    const content = contentRef?.nativeElement;

    if (!content) {
      console.error("PDF content element not found.");
      return;
    }

    content.classList.add('export-pdf-mode');

    setTimeout(() => {
      html2canvas(content).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);

        const margin = 5; // 5mm left and right
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pdfWidth = pageWidth - margin * 2;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', margin, 0, pdfWidth, pdfHeight);
        pdf.save(fileName);

        // Remove export styling
        content.classList.remove('export-pdf-mode');
      });
    }, 100); 
  }
}
