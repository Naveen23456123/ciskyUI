import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LetterEntity } from '@app/shared/models/constant.config';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { finalize, take } from 'rxjs';
import { PdfViewerComponent } from '../../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-view-letter-details',
  standalone: false,
  templateUrl: './view-letter-details.component.html',
  styleUrl: './view-letter-details.component.scss'
})
export class ViewLetterDetailsComponent {
  private dialogData: any;
  isLoading=true;
  letterDetails:any;
  isconsultant=true;
  isSend=true;
  typetitle='';
  letterInit=false;
  letterList:any=[];
  displayedColumns: string[] = ['serial','name', 'doc'];
  dataSource!: MatTableDataSource<any[]>;
  defaultdialogOptionConfig: MatDialogConfig = {
    minWidth: '45vw',
    data: {}
  }
  constructor(@Inject(MAT_DIALOG_DATA) data: any,@Optional() private dialogRef: MatDialogRef<ViewLetterDetailsComponent>,
  private letterService: LetterInterfaceService, private route:ActivatedRoute,private dialog: MatDialog){
    this.dialogData= data || {};
  }
  ngOnInit(){
   
    if(this.dialogData && this.dialogData.element.id){
     this.letterService.getLetterDetailsById({id:this.dialogData.element.id},'').pipe(take(1), finalize(()=>this.isLoading=false))
      .subscribe((response:any)=>{
        if(response && response.success){
          if(response.data) {
            this.letterDetails = response.data;
            this.isconsultant= this.letterDetails.relatedto.toLowerCase()== LetterEntity.CONSULTANT.toLocaleLowerCase();
            this.isSend= this.letterDetails.exchangetype.toLowerCase()=='send';
            this.typetitle = this.isSend ? 'Send' :'Recieve';
            this.dataSource = new MatTableDataSource(response.data.files);
            this.letterList= response.data.associatedletters.map((item:any)=>({
              id:item.id,
              name:item.letternumber
            }));
            this.letterInit=true;
          }
        }
      })
    }
  }
  letterSelect(data:any){
    //this.letterInit=false;
    if(data && data.value){
      this.isLoading=true;
      this.letterService.getLetterDetailsById({id:data.value.id},'').pipe(take(1), finalize(()=>this.isLoading=false))
      .subscribe((response:any)=>{
        if(response && response.success){
          if(response.data) {
            this.letterDetails = response.data;
            this.isconsultant= this.letterDetails.relatedto.toLowerCase()== LetterEntity.CONSULTANT.toLocaleLowerCase();
            this.isSend= this.letterDetails.exchangetype.toLowerCase()=='send';
            this.typetitle = this.isSend ? 'Send' :'Recieve';
            this.dataSource = new MatTableDataSource(response.data.files);
            // this.letterList= response.data.associatedletters.map((item:any)=>({
            //   id:item.id,
            //   name:item.letternumber
            // }));
            this.letterInit=true;
        }
        }
      })
    }
  }
  viewPdf(data:any){
    const config = this.defaultdialogOptionConfig;
    config.minWidth='80vw';
    config.data = {
      element:data
    };
    this.dialog.open(PdfViewerComponent,config);
  }
}
