import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { untilDestroyed } from '@app/core/until-destroyed';
import { BOQInvoice } from '@app/shared/models/Invoice';
import { CommonService } from '@app/shared/services/common.service';
import { ReleaseExpenseInterfaceService } from '@app/shared/services/external/release-expense-interface.service';
import { GenerateCsvService } from '@app/shared/services/generate-csv.service';
import { GeneratePdfService } from '@app/shared/services/generate-pdf.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, Subscription, take } from 'rxjs';
import { PdfViewerComponent } from '../../pdf-viewer/pdf-viewer.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-profit-loss-expense-details',
  standalone: false,
  templateUrl: './profit-loss-expense-details.component.html',
  styleUrl: './profit-loss-expense-details.component.scss'
})
export class ProfitLossExpenseDetailsComponent {
  isLoading = true;
  subscription: Subscription = new Subscription();
  invDetails: any = {};
  today = new Date();
  scopeData!: any;
  downloadingTemplate = false;
  showUpload: boolean = false;
  showSave: boolean = false;
  months: string[] = [];          // display labels: 'Apr 24'
  monthKeys: any[] = [];
  quarter = 1;
  tableRows: any[] = [];
  apiObj: any = {};
  isInvoice = true;
  isBtnClicked = false;
  isPdfGenerating = false;
  @ViewChild('scopePdfContent', { static: false }) scopePdfContent!: ElementRef;
  private defaultdialogoptions: MatDialogConfig = {
    minWidth: '80vw',
    disableClose: false,
    data: {},
  };
  readonly dialog = inject(MatDialog);
  defaultTableHeaders = [
    { label: 'Sr. No', value: 'srNo' },
    { label: 'Designation', value: 'position' },
    { label: 'Name', value: 'name' },
    { label: 'Contract Amount', value: 'contractAmount' },
    { label: 'Release Amount', value: 'release' }];
  tableheaders = [...this.defaultTableHeaders];
  csvRecords: any = [];
  csvHeaders: any = [];
  index = 0;
  invoiceData: any = {};
  releaseRows: any[] = [
    { srno: 1, key: BOQInvoice.KEYPROFESSIONAL_KEY, value: BOQInvoice.KEYPROFESSIONAL, keyField: 'designation' },
    { srno: 2, key: BOQInvoice.SUB_PROFESSIONAL_KEY, value: BOQInvoice.SUB_PROFESSIONAL, keyField: 'designation' },
    { srno: 2, key: BOQInvoice.SUPPORTSTAF_KEY, value: BOQInvoice.SUPPORTSTAF, keyField: 'designation', contract_amount: 0 },
    { srno: 3, key: BOQInvoice.TRANSPORTATION_KEY, value: BOQInvoice.TRANSPORTATION, keyField: 'description', contract_amount: 0 },
    { srno: 4, key: BOQInvoice.DUTY_TRAVEL_SITE_KEY, value: BOQInvoice.DUTY_TRAVEL_SITE, keyField: 'description', contract_amount: 0 },
    { srno: 5, key: BOQInvoice.OFFICE_RENT_KEY, value: BOQInvoice.OFFICE_RENT, keyField: 'description' },
    { srno: 6, key: BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM_KEY, value: BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM, keyField: 'description' },
    { srno: 7, key: BOQInvoice.OFFICE_FURN_EPUIP_KEY, value: BOQInvoice.OFFICE_FURN_EPUIP, keyField: 'description' },
    { srno: 8, key: BOQInvoice.REPORT_DOCUMENT_REPORTING_KEY, value: BOQInvoice.REPORT_DOCUMENT_REPORTING, keyField: 'description' },
    { srno: 9, key: BOQInvoice.ROAD_SURVEY_EQUIP_KEY, value: BOQInvoice.ROAD_SURVEY_EQUIP, keyField: 'description' },
    { srno: 10, key: BOQInvoice.CONTINGENCIES_KEY, value: BOQInvoice.CONTINGENCIES, keyField: 'description' },
  ];

  constructor(private sessionService: SessionService, private commonService: CommonService,
    private csvService: GenerateCsvService, private notifyBarService: NotifyBarService, private pdfService: GeneratePdfService,
    private expenseService: ReleaseExpenseInterfaceService
  ) {
  }

  downloadTemplate() {
    this.csvService.downloadFile(this.tableRows, this.tableheaders, 'Release Template');
    this.showUpload = true;
    this.showSave = true;
  }
  fileuploaded(data: any) {
    this.csvRecords = (data.slice(1));
    this.csvHeaders = data[0];
    this.mapCsvToTableRows();
  }
  ngOnInit() {
    this.invoiceData = window.history.state.value;
    this.getReleaseInvoiceDetails();
  }
  getReleaseInvoiceDetails() {
    this.tableRows = [];
    this.isLoading = true;
    this.isInvoice = this.invoiceData.invoice.invoiceid != "";

    this.expenseService.getExpenseTemplate({ projectid: this.invoiceData.project.id, invoiceid: this.invoiceData.invoice.invoiceid }, '')
      .pipe(take(1), untilDestroyed(this), finalize(() => this.isLoading = false)).subscribe((response: any) => {
        if (response && response.success) {
          this.scopeData = response.data;
          this.buildTable();
          this.monthKeys = [];
          this.monthKeys.push(this.invoiceData.invoice.monthandyear);
          this.tableheaders = [...this.defaultTableHeaders];
          this.tableheaders.push({
            label: this.invoiceData.invoice.monthandyear, value: this.invoiceData.invoice.monthandyear
          })
          this.tableRows = this.tableRows.map(row => {
            this.monthKeys.forEach(key => {
              if (!(key in row)) {
                row[key] = row.expense ?? 0;
              }
              if (Object.prototype.hasOwnProperty.call(row, key)) {
                row[key] = row.expense ?? 0;
              }
            });
            return row;
          });
          // to generate the totla rows in intital page load asign the values 
          let headerResult = this.tableheaders.map(h => h.value)
          this.csvRecords = this.tableRows.map(row =>
            headerResult.map(key => row[key])
          );
          this.csvHeaders = this.tableheaders.map(x => x.label);
          this.mapCsvToTableRows();
        }
      });
  }
  cellValue(scopeId: string, scope: any, monthKey: any): number {
    if (!scope || !monthKey) return 0;

    // Assuming scope has a "months" object mapping monthKey to value
    // Example: scope.months = { '2025-03-31T18:30:00.000Z': 1000, ... }
    if (scope.months && scope.months[monthKey] != null) {
      return Number(scope.months[monthKey]);
    }

    // If your month data is directly in the object
    if (scope[monthKey] != null) {
      return Number(scope[monthKey]);
    }
    // Default fallback
    return 0;
  }

  buildTable() {
    this.tableRows = [];
    const rows: any[] = [];
    this.index = 0;
    for (const category of this.releaseRows) {
      this.index = this.index + 1;
      // Head row
      rows.push({
        srNo: this.commonService.toRoman(this.index),
        type: 'head',
        position: category.value,
        skey: category.key,
        name: '',
        contractAmount: 0,
        scopeid: null
      });
      let data = this.scopeData[category.key];
      if (Array.isArray(data) && data.length) {
        let idx = 1;
        let key = category.keyField ?? '';
        for (const s of data) {
          let row: any = {
            srNo: idx.toString(),
            position: s[key],
            skey: category.key,
            //position: '',
            name: s.name,
            contractAmount: Number(s.totalamount) || 0,
            release: s.release,
            expense: s.expense,
            scopeid: s.id,
            type: 'normal'
          };

          for (const mk of this.monthKeys) {
            row[mk] = this.cellValue(s.id, s, mk);
          }

          rows.push(row);
          idx++;
        }
      }
    }
    this.tableRows = rows;
  }
  mapCsvToTableRows() {
    if (!this.csvHeaders || !this.csvRecords) return;

    const monthColumnMap: { csvIndex: number, monthKey: string }[] = [];
    this.csvHeaders.forEach((header: any, index: any) => {
      const parsedDate = new Date(header);

      if (!isNaN(parsedDate.getTime())) {
        const iso = parsedDate.toISOString().replace('.000', '');
        if (this.monthKeys.includes(iso)) {
          monthColumnMap.push({ csvIndex: index, monthKey: iso });
        }
      }
    });
    const newTableRows: any[] = [];

    let currentCategoryKey: string | null = null;

    let categoryTotals: any = { contractAmount: 0, release: 0 };
    this.monthKeys.forEach(mk => categoryTotals[mk] = 0);

    for (let r = 0; r < this.csvRecords.length && r < this.tableRows.length; r++) {
      const csvRow = this.csvRecords[r];
      const tableRow = this.tableRows[r];
      // If we hit a new category head row
      if (tableRow.type === 'head') {

        // If previous category existed -> push total row
        if (currentCategoryKey) {
          const totalRow: any = {
            srNo: '',
            type: 'total',
            skey: currentCategoryKey,
            position: 'Total',
            name: '',
            contractAmount: categoryTotals.contractAmount,
            release: categoryTotals.release,
            scopeid: null
          };

          this.monthKeys.forEach(mk => totalRow[mk] = categoryTotals[mk]);

          // Check if total row already exists for this category
          const existingIndex = newTableRows.findIndex(r =>
            r.type === 'total' && r.skey === currentCategoryKey
          );

          if (existingIndex > -1) {
            // Update existing total row
            newTableRows[existingIndex] = { ...newTableRows[existingIndex], ...totalRow };
          } else {
            // Add new total row only if not present
            newTableRows.push(totalRow);
          }
        }

        // Set new category key
        currentCategoryKey = tableRow.skey;

        // Reset totals
        categoryTotals = { contractAmount: 0, release: 0 };
        this.monthKeys.forEach(mk => categoryTotals[mk] = 0);
      }

      newTableRows.push(tableRow);

      if (tableRow.type !== 'normal') continue;

      monthColumnMap.forEach(col => {
        const rawValue = csvRow[col.csvIndex];

        const value = isNaN(rawValue) ? 0 : Number(rawValue);
        tableRow[col.monthKey] = value;
        categoryTotals[col.monthKey] += value;
      });

      //tableRow.contractAmount = Number(csvRow[3] ?? 0);
      categoryTotals.contractAmount += tableRow.contractAmount;
      categoryTotals.release += tableRow.release;
    }
    if (currentCategoryKey) {
      const totalRow: any = {
        srNo: '',
        type: 'total',
        skey: currentCategoryKey,
        position: 'Total',
        name: '',
        contractAmount: categoryTotals.contractAmount,
        release: categoryTotals.release,
        scopeid: null
      };

      this.monthKeys.forEach(mk => (totalRow[mk] = categoryTotals[mk]));
      newTableRows.push(totalRow);
    }
    this.tableRows = [...newTableRows];
    this.convertGrouped();
  }
  printScopePage() {
    this.isPdfGenerating = true;
    this.pdfService.generateAndGetPDF(this.scopePdfContent, 'Expense_Detailed.pdf').then((pdf) => {
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

  convertGrouped() {
    const finalResult: any = {};

    // Build grouped object first
    this.tableRows.forEach(row => {
      if (row.type === 'head' || row.type === 'total') return;
      const category = row.skey;
      if (!category) return;

      this.monthKeys.forEach(month => {
        const amount = Number(row[month]) || 0;
        if (amount === 0) return;

        if (!finalResult[month]) finalResult[month] = {};
        if (!finalResult[month][category]) {
          finalResult[month][category] = { total: 0, scopes: [] };
        }

        finalResult[month][category].scopes.push({
          scopeid: row.scopeid,
          amount: amount
        });
        finalResult[month][category].total += amount;
      });
    });

    // Convert grouped object into array with 'date' property
    const resultArray = Object.keys(finalResult).map(date => {
      return { date, ...finalResult[date] };
    });

    return resultArray;
  }
  onCellChange(row: any, monthKey: string, newValue: number) {
    row[monthKey] = Number(newValue) || 0;

    const categoryKey = row.skey; // identify which category this row belongs to

    // Get all normal rows of this category
    const categoryRows = this.tableRows.filter(r => r.skey === categoryKey && r.type !== 'head' && r.type !== 'total');

    // Get total row for this category
    const totalRow = this.tableRows.find(r => r.skey === categoryKey && r.type === 'total');

    if (!totalRow) return;
    // Recalculate monthly totals
    this.monthKeys.forEach(mk => {
      totalRow[mk] = categoryRows.reduce((sum, r) => sum + (Number(r[mk]) ?? 0), 0);
    });
    // Recalculate contractAmount total
    totalRow.contractAmount = categoryRows.reduce((sum, r) => sum + (r.contractAmount ?? 0), 0);

  }

  isDate(value: any): boolean {
    const d = new Date(value);
    return !isNaN(d.getTime());
  }
  submit() {
    this.isBtnClicked = true;
    let apiObj = {
      projectid: this.invoiceData.project.id,
      invoiceid: this.invoiceData.invoice.invoiceid,
      scopedetails: [...this.convertGrouped()]
    }
    this.expenseService.upsertReleaseExpenseScopes(apiObj, '')
      .pipe(take(1), untilDestroyed(this), finalize(() => { this.isLoading = false; this.isBtnClicked = false })).subscribe((response: any) => {
        if (response && response.success) {
          this.notifyBarService.showsnackbar('Expense details saved successfully.');
        }
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

