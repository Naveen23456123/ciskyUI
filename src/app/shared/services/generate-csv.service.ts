import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateCsvService {

  constructor() { }

  downloadFile(data: any,header:any, filename = 'data') {
    let csvData = this.ConvertToCSV(data,header);
    console.log(csvData);
    let blob = new Blob(['\ufeff' + csvData], {
      type: 'text/csv;charset=utf-8;'
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);

    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
  ConvertToCSV(objArray: any, headerList: any) {
    let array =
      typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      console.log(array);
    let str = '';
    let row = '';
    for (let index in headerList) {
      row += headerList[index].label + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';    
    for (let i = 0; i < array.length; i++) {
    let line = '';
    for (let index in headerList) {
      let head = headerList[index].value;
      let cell = array[i][head];

      if (cell === undefined || cell === null) {
        cell = '';
      } else {
        cell = String(cell).replace(/"/g, '""');
        if (cell.includes(',') || cell.includes('\n') || cell.includes('"')) {
          cell = `"${cell}"`;
        }
      }

      line += cell + ',';
    }
    line = line.slice(0, -1);
    str += line + '\r\n';
  }
    return str;
  }

}
