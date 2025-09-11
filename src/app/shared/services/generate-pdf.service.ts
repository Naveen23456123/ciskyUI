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

  generateAndGetPDF(contentRef: ElementRef,fileName: string = 'form-data.pdf'): Promise<File | null> {
    const content = contentRef?.nativeElement;

    if (!content) {
      console.error('PDF content element not found.');
      return Promise.resolve(null);
    }

    content.classList.add('export-pdf-mode');

     return new Promise((resolve, reject) => {
      setTimeout(() => {
        html2canvas(content, { scale: 1.2 })
          .then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const margin = 3; 
            const usableWidth = pageWidth - margin * 2;

            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = usableWidth;
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

            let heightLeft = imgHeight;
            let position = 0;

            // Add first page with margin
            pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Add more pages with same margins
            while (heightLeft > 0) {
              position -= pageHeight;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }

            const pdfBlob = pdf.output('blob');
            const pdfFile = new File([pdfBlob], fileName, {
              type: 'application/pdf',
            });

            content.classList.remove('export-pdf-mode');
            resolve(pdfFile);
          })
          .catch(err => {
            console.error('Error generating PDF:', err);
            content.classList.remove('export-pdf-mode');
            reject(err);
          });
      }, 100);
    });
  }
  
}


