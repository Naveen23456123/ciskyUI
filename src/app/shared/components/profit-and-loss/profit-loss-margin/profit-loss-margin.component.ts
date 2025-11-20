import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BOQInvoice } from '@app/shared/models/Invoice';
import { ProfitLossInterfaceService } from '@app/shared/services/external/profit-loss-interface.service';
import { GeneratePdfService } from '@app/shared/services/generate-pdf.service';
import { finalize } from 'rxjs';
import { PdfViewerComponent } from '../../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-profit-loss-margin',
  standalone: false,
  templateUrl: './profit-loss-margin.component.html',
  styleUrl: './profit-loss-margin.component.scss'
})
export class ProfitLossMarginComponent {
  isLoading = true;
  isPdfGenerating = false; 
  selectedQuarter = 'Q1'; // Default Quarter (Apr-Jun)
  data: any[] = [];       // API Data
  filteredData: any[] = [];
  apiObj: any = {};
  today = new Date();
  months: any;
  isSearching = false;
  tableRows: any;
  totalActual = 0;
  totalExpected = 0;
  totalMargin = 0;
  projectObj: any = {};
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  private defaultdialogoptions: MatDialogConfig = {
    minWidth: '80vw',
    disableClose: false,
    data: {},
  };
  readonly dialog = inject(MatDialog);
  rows: any[] = [
    { srno: 1, key: BOQInvoice.LOCALSTAFF_KEY, label: BOQInvoice.LOCALSTAFF, months: [], type: 'data' },
    { srno: 2, key: BOQInvoice.SUPPORTSTAF_KEY, label: BOQInvoice.SUPPORTSTAF, months: [], type: 'data' },
    { srno: 3, key: BOQInvoice.TRANSPORTATION_KEY, label: BOQInvoice.TRANSPORTATION, months: [], type: 'data' },
    { srno: 4, key: BOQInvoice.DUTY_TRAVEL_SITE_KEY, label: BOQInvoice.DUTY_TRAVEL_SITE, months: [], type: 'data' },
    { srno: 5, key: BOQInvoice.OFFICE_RENT_KEY, label: BOQInvoice.OFFICE_RENT, months: [], type: 'data' },
    { srno: 6, key: BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM_KEY, label: BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM, months: [], type: 'data' },
    { srno: 7, key: BOQInvoice.OFFICE_FURN_EPUIP_KEY, label: BOQInvoice.OFFICE_FURN_EPUIP, months: [], type: 'data' },
    { srno: 8, key: BOQInvoice.REPORT_DOCUMENT_REPORTING_KEY, label: BOQInvoice.REPORT_DOCUMENT_REPORTING, months: [], type: 'data' },
    { srno: 9, key: BOQInvoice.ROAD_SURVEY_EQUIP_KEY, label: BOQInvoice.ROAD_SURVEY_EQUIP, months: [], type: 'data' },
    { srno: 10, key: BOQInvoice.CONTINGENCIES_KEY, label: BOQInvoice.CONTINGENCIES, months: [], type: 'data' },
    { srno: 'A', key: 'TOTAL', label: 'Total', months: [], type: 'subtotal' }
  ];

  constructor(private profitLossServcie: ProfitLossInterfaceService, private pdfService: GeneratePdfService) {

  }
  ngOnInit() {
    this.getMarginData();
  }
  dateChange(data: any) {
    if (data) {
      this.apiObj.startdate = data.value.startDate;
      this.apiObj.enddate = data.value.endDate;
      this.apiObj.year = data.value.year;
      this.getMarginData();
    }
  }
  getMarginData() {
    this.isSearching = true;
    if (this.apiObj && Object.keys(this.apiObj).length !== 0 && this.apiObj.startdate) {
      this.profitLossServcie.getProfitLossMarginFinancial(this.apiObj, '').pipe(finalize(() => { this.isLoading = false; this.isSearching = false }))
        .subscribe((response: any) => {
          if (response && response.success) {
            this.data = response.data;
            this.prepareTableData(this.data);
          }
        })
    }
    else {
      this.isLoading = this.isSearching = false;
    }
  }
  projectChange(data: any = null) {
    if (data && data.value) {
      this.projectObj = data.value;
      this.apiObj.projectid = data.value.id;
      this.getMarginData();
    }
  }
  printPage() {
    this.isPdfGenerating = true; 
    this.pdfService.generateAndGetPDF(this.pdfContent, 'Project_Variance_Detailed.pdf').then((pdf) => {
      if (pdf) {
        const config = this.defaultdialogoptions;
        config.minWidth = '80vw';
        config.data = {
          url: false,
          element: pdf
        };
        this.dialog.open(PdfViewerComponent, config);
      }
    }).finally(() => {
      this.isPdfGenerating = false; 
    });
  }
  prepareTableData(apiData: any[]) {
    // Convert months to readable labels (Apr-2025)
    this.months = apiData.map(x => ({
      raw: x.month,
      label: new Date(x.month).toLocaleString('default', { month: 'short', year: 'numeric' })
    }));

    // Extract categories dynamically from first item
    const categories = Object.keys(apiData[0].details);
    this.tableRows = categories.map(category => {
      const row: any = {
        category,
        value: this.rows.find(x => x.key.toLowerCase() == category.toLowerCase()).label,
        srno: this.rows.find(x => x.key.toLowerCase() == category.toLowerCase()).srno
      };
      // Actual Values
      apiData.forEach(item => {
        const monthLabel = new Date(item.month).toLocaleString('default', { month: 'short', year: 'numeric' });
        row[`${monthLabel}_Actual`] = item.details[category]?.actual;
      });

      // Expected Values
      apiData.forEach(item => {
        const monthLabel = new Date(item.month).toLocaleString('default', { month: 'short', year: 'numeric' });
        row[`${monthLabel}_Expected`] = item.details[category]?.expected;
      });

      // Margin = Expected - Actual
      apiData.forEach(item => {
        const monthLabel = new Date(item.month).toLocaleString('default', { month: 'short', year: 'numeric' });
        const exp = item.details[category]?.expected || 0;
        const act = item.details[category]?.actual || 0;
        row[`${monthLabel}_Margin`] = act - exp;
      });
      row.Total_Actual = this.months.reduce((sum: any, m: any) => sum + (row[m.label + '_Actual'] || 0), 0);
      row.Total_Expected = this.months.reduce((sum: any, m: any) => sum + (row[m.label + '_Expected'] || 0), 0);
      row.Total_Margin = this.months.reduce((sum: any, m: any) => sum + (row[m.label + '_Margin'] || 0), 0);

      return row;
    });


    // ----------- Add Total Row -------------
    const totalRow: any = { category: 'total', value: 'Total', srno: 'A' };

    this.months.forEach((m: any) => {
      const monthLabel = m.label;

      totalRow[`${monthLabel}_Actual`] = this.tableRows
        .map((r: any) => r[`${monthLabel}_Actual`] || 0)
        .reduce((a: any, b: any) => a + b, 0);

      totalRow[`${monthLabel}_Expected`] = this.tableRows
        .map((r: any) => r[`${monthLabel}_Expected`] || 0)
        .reduce((a: any, b: any) => a + b, 0);

      totalRow[`${monthLabel}_Margin`] = this.tableRows
        .map((r: any) => r[`${monthLabel}_Margin`] || 0)
        .reduce((a: any, b: any) => a + b, 0);

    });
    this.totalActual = totalRow.Total_Actual = this.tableRows.reduce((sum: number, r: any) => sum + (r.Total_Actual || 0), 0);
    this.totalExpected = totalRow.Total_Expected = this.tableRows.reduce((sum: number, r: any) => sum + (r.Total_Expected || 0), 0);
    this.totalMargin = totalRow.Total_Margin = this.tableRows.reduce((sum: number, r: any) => sum + (r.Total_Margin || 0), 0);

    // Push total row at the end
    this.tableRows.push(totalRow);


  }


}
