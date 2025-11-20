import { Component } from '@angular/core';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
//import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

@Component({
  selector: 'app-pdf-read',
  standalone: false,
  templateUrl: './pdf-read.component.html',
  styleUrl: './pdf-read.component.scss'
})
export class PdfReadComponent {
pdfText = '';

  constructor() {
    //GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
  }

  async onFileSelected(event: any) {
    // const file = event.target.files[0];
    // if (!file) return;

    // const arrayBuffer = await file.arrayBuffer();
    // const pdf = await getDocument(arrayBuffer).promise;

    // let fullText = '';
    // for (let i = 1; i <= pdf.numPages; i++) {
    //   const page = await pdf.getPage(i);
    //   const content = await page.getTextContent();
    //   const pageText = content.items.map((item: any) => item.str).join(' ');
    //   fullText += pageText + '\n';
    // }

    // this.pdfText = fullText;
    // console.log(fullText);
  }
}
