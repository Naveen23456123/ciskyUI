import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, input } from '@angular/core';
import * as uploader from 'lodash';
import { Logger } from '@app/core/logger.service';
import { FormControl, Validators } from '@angular/forms';

const log = new Logger('File Uploader');
@Component({
  standalone: false,
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @Input() title: string = "";
  Error: string = '';
  isImageSaved: boolean = false;
  cardImageBase64: string = '';
  @ViewChild('fileUpload') fileUpload!: ElementRef;
  @Output() onfileUpload: EventEmitter<any> = new EventEmitter();
  @Input() Header: string = '';
  @Input() AllowedType: string[] = [];
  @Input() UploadType: any;
  isFileUploaded = false;
  fileName = '';
  @Input() required = false;
  isClicked = false;
  constructor() { }

  ngOnInit(): void {
    if (this.title !== '')
      this.title = 'Upload ' + this.title;
  }
  onClick() {
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }

  fileChangeEvent(fileInput: any) {
    this.isClicked = true;
    this.Error = '';
    if (fileInput.target.files && fileInput.target.files[0]) {

      if (this.UploadType == 'csv') {
        this.fileChangeListener(fileInput);
      }
      else if (this.UploadType == 'image') {
        this.imageManage(fileInput);
      }
      else {
        this.onfileUpload.emit(fileInput.target.files[0]);
      }
    }
    this.isFileUploaded = fileInput.target.files.length > 0;
    this.fileName = fileInput.target.files[0]?.name;


  }
  imageManage(fileInput: any) {
    // Size Filter Bytes
    const max_size = 20971520;
    // allowed_types = ['image/png', 'image/jpeg','application/vnd.ms-excel'];
    const max_height = 15200;
    const max_width = 25600;

    if (fileInput.target.files[0].size > max_size) {
      this.Error =
        'Maximum size allowed is ' + max_size / 1000 + 'Mb';

      return false;
    }

    if (!uploader.includes(this.AllowedType, fileInput.target.files[0].type)) {
      //this.imageError = 'Only Images are allowed ( JPG | PNG )';     
      var types = this.AllowedType.join(' | ');
      types = (types.replace(new RegExp('image/', "g"), ''));
      this.Error = `Only ( ${types} ) are allowed.`;
      return false;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = (rs: Event) => {
        const img_height = (rs.target as HTMLImageElement).height;
        const img_width = (rs.target as HTMLImageElement).width;

        // const img_height = rs.currentTarget['height'];
        // const img_width = rs.currentTarget['width'];

        if (img_height > max_height && img_width > max_width) {
          this.Error =
            'Maximum dimentions allowed ' +
            max_height +
            '*' +
            max_width +
            'px';
          return false;
        } else {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;
          log.debug(this.cardImageBase64);
          this.onfileUpload.emit({ base64: this.cardImageBase64, file: fileInput.target.files[0] });
          // this.previewImagePath = imgBase64Path;
          return true;
        }
      };
    };
    reader.readAsDataURL(fileInput.target.files[0]);
    return true;
  }

  public csvRecords: any[] = [];
  // fileChangeListener($event: any): void {
  //   this.csvRecords = [];
  //   let errormsg = '';
  //   var files = $event.srcElement.files;
  //   if (files[0].name.endsWith('.csv')) {
  //     var input = $event.target;
  //     var reader = new FileReader();
  //     reader.readAsText(input.files[0]);
  //     reader.onload = (data) => {
  //       let csvData = reader.result;
  //       let csvRecordsArray = (csvData as string).split(/\r\n|\n/);
  //       for (let i = 0; i < csvRecordsArray.length; i++) {
  //         // .match(/(“[^”]*”)|[^,]+/g);
  //         //let rowdata = csvRecordsArray[i].split(',');
  //         let rowdata = csvRecordsArray[i].match(/("([^"]|"")*"|[^,]+)(?=,|$)/g) as string[] | null;
  //         if (!rowdata) continue;

  //         rowdata = rowdata.map(x => x.replace(/^"(.*)"$/, '$1').trim());
  //         this.csvRecords.push(rowdata);
  //       }
  //       this.csvRecords = this.csvRecords.slice(0, -1);
  //       this.onfileUpload.emit(this.csvRecords);
  //       this.fileUpload.nativeElement.value = null;
  //     };
  //     reader.onerror = function () {
  //       errormsg = 'Unable to read ' + input.files[0];
  //     };
  //   } else {
  //     errormsg = 'Please import valid .csv file.';
  //     this.fileUpload.nativeElement.value = null;
  //     this.csvRecords = [];
  //   }
  //   this.Error = errormsg;
  // }

  removeFile() {
    this.cardImageBase64 = '';
    this.isImageSaved = false;
    this.fileUpload.nativeElement.value = null;
    this.isFileUploaded = false;
    this.onfileUpload.emit(null)
  }
  fileChangeListener($event: any): void {
    this.csvRecords = [];
    this.Error = '';

    const files = $event.srcElement.files;
    if (!files || !files.length || !files[0].name.endsWith('.csv')) {
      this.Error = 'Please import valid .csv file.';
      this.fileUpload.nativeElement.value = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsText(files[0]);

    reader.onload = () => {
      const csvText = reader.result as string;
      this.csvRecords = this.parseCSV(csvText);

      // Ensure empty cells are ''
      this.csvRecords = this.csvRecords.map(row =>
        row.map((cell:any) => (cell ? cell.trim() : ''))
      );

      this.onfileUpload.emit(this.csvRecords);
      this.fileUpload.nativeElement.value = null;
    };

    reader.onerror = () => {
      this.Error = 'Unable to read file.';
    };
  }
  parseCSV(csv: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let cell = '';
    let insideQuotes = false;

    for (let i = 0; i < csv.length; i++) {
      const char = csv[i];
      const next = csv[i + 1];

      if (char === '"' && insideQuotes && next === '"') {
        cell += '"'; // Escaped quote
        i++;
      }
      else if (char === '"') {
        insideQuotes = !insideQuotes; // Toggle quoted state
      }
      else if (char === ',' && !insideQuotes) {
        row.push(cell);
        cell = '';
      }
      else if ((char === '\n' || char === '\r') && !insideQuotes) {
        if (cell || row.length) {
          row.push(cell);
          rows.push(row);
        }
        row = [];
        cell = '';
      }
      else {
        cell += char;
      }
    }

    // Push last data if needed
    if (cell || row.length) {
      row.push(cell);
      rows.push(row);
    }

    return rows;
  }
}
