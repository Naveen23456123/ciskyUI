import { ChangeDetectorRef, Component,ContentChild,EventEmitter,Inject,inject, Input, Optional, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonService } from '@app/shared/services/common.service';
import { GenerateCsvService } from '@app/shared/services/generate-csv.service';

@Component({
  selector: 'app-upload-data',
  standalone: false,
  templateUrl: './upload-data.component.html',
  styleUrl: './upload-data.component.scss'
})
export class UploadDataComponent {
  isLoading=true;
   title:string ='';
  dataSource : MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns:string[]=[];
  @Input() templateColumns:any[]=[];
  @Input() errorLoadingCSV: any[]=[];
  dateTimeFormat = "YYYY-MM-DD HH:mm:ss";
  @Input() isUploading: boolean = false; 
  dialogData:any;
  @Output() onImportClick: EventEmitter<any> = new EventEmitter();
  actualData:any[]=[];
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
  @Optional() private dialogRef: MatDialogRef<UploadDataComponent>,
  private csvService:GenerateCsvService,
  private cdRef: ChangeDetectorRef, private commonService:CommonService
  ) {
    this.dialogData= data;
  }

  ngOnInit(){
    let apiCalls: any={};
    if(this.dialogData){
    this.title = this.dialogData.template_type;
    }
    this.isLoading=false;
  }

ngAfterViewInit() {
  
  this.cdRef.detectChanges();
}

  download_sample(){
    this.csvService.downloadFile([],this.templateColumns,this.title);
  }

  PushDataInArray(data: []) {

    const dataObect = this.displayedColumns.reduce((element:any, key, index) => {      
      element[this.templateColumns.find(x=>x.label==key).value] = data[index]; 
      return element;
    }, {});
    const dataTableObect = this.displayedColumns.reduce((element:any, key, index) => {      
      element[key] = data[index]; 
      return element;
    }, {});
    if(!this.commonService.isRowEmpty(dataTableObect)){
      this.uploadedDetails.push(dataTableObect);
      this.actualData.push(dataObect);
    }
  }

  uploadedDetails: any[] = [];
  fileuploaded(event: any) {
    this.displayedColumns = this.templateColumns.map((x:any) => x.label);   
    this.uploadedDetails = [];
    let columnerror = false;
    this.errorLoadingCSV = [];
    if(event){
    event.forEach((element: [], index: number) => {
      if (element !== null) {
        if (index === 0) {
          for (let i = 0; i < element.length; i++) {
            for (let j = 0; j < this.templateColumns.length; j++) {
              if (i == j) {
                if (this.templateColumns[j].label !== element[i] && !columnerror) {
                  columnerror = true;
                  this.errorLoadingCSV.push(`Please provide the CSV with the same column list and names as mentioned in ${this.title} template.`);
                }
              }
            }
          }
        }
        else {
          this.PushDataInArray(element);
        }
      }
    });
    this.updateTable(this.uploadedDetails);
    }
    else{
      this.uploadedDetails=[];
      this.updateTable([]);
    }
  }

  private updateTable(info: any) {   
    let ErrorData = info.filter((ele:any) => {
      return ele.error === true;
    });
    if (typeof (ErrorData[0]) === 'undefined')
      this.dataSource =  new MatTableDataSource(this.uploadedDetails);
    else
      this.dataSource = new MatTableDataSource(ErrorData);

  }

  importData(){
    this.onImportClick.emit(this.actualData);
  }


}

