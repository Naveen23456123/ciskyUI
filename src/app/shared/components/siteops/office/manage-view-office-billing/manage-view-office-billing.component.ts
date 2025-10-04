import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PdfViewerComponent } from '@app/shared/components/pdf-viewer/pdf-viewer.component';
import { DialogService } from '@app/shared/services/dialog.service';
import { OfficeInterfaceService } from '@app/shared/services/external/office-interface.service';
import { VehicleBillingInterfaceService } from '@app/shared/services/external/vehicle-billing-interface.service';
import { GeneratePdfService } from '@app/shared/services/generate-pdf.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-view-office-billing',
  standalone: false,
  templateUrl: './manage-view-office-billing.component.html',
  styleUrl: './manage-view-office-billing.component.scss'
})
export class ManageViewOfficeBillingComponent {
data:any;
  isLoading=true;
  billingList:any=[];
  today= new Date();
  billing:any={};
  displayedColumns: string[] = ['serial','desc', 'entity', 'amount'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  private defaultdialogoptions:  MatDialogConfig = {       
    disableClose: false,
    data: {},
  };
  constructor(@Inject(MAT_DIALOG_DATA) data: any,private pdfService:GeneratePdfService, 
  private dialogService:DialogService,private dialog: MatDialog,
  private billingService:OfficeInterfaceService){
      this.data= data || {};
      this.dataSource = new MatTableDataSource(this.billingList);
  }

  ngOnInit(){
    this.billing.overallstatus= this.data.element.overallstatus;
    this.billingService.getOfficeBillingDetailsById({id:this.data.element.id},'')
    .pipe(finalize(() => {this.isLoading = false;})).subscribe((response:any)=>{
      if(response && response.success){
        this.billing={...this.billing,... response.data};
        var objData = response.data;
        if(objData){
        let data:any = {
          1: {desc: objData.name+' Rent', entity: objData.days, amount: objData.billingamount },
          
        };
        this.billingList = Object.keys(data).map(key => {
          return {
            srno: key,
            ...data[key]  
          };
        });
        this.dataSource = new MatTableDataSource<any>(this.billingList);
      }
      }
    })
  }
  getTotalAmount(): number {
    return this.billing.billamount;
  }
 download(){
    this.pdfService.generateAndGetPDF(this.pdfContent, this.billing.vehicleno+'.pdf').then((pdf) => {
      if (pdf) {
        const config = this.defaultdialogoptions;
        config.minWidth='80vw';
        config.data = {
          url:false,
          element:pdf
        };
        this.dialog.open(PdfViewerComponent,config);
      }
    });
  }
}

