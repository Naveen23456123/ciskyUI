import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { InvoiceService } from '@app/invoice-control/invoice.service';
import { BOQInvoice } from '@app/shared/models/Invoice';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, forkJoin, Subscription, take } from 'rxjs';
import { ManageReleaseInvoiceComponent } from './dialog/manage-release-invoice/manage-release-invoice.component';
import { CommonService } from '@app/shared/services/common.service';
import { GenerateCsvService } from '@app/shared/services/generate-csv.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CONSTANTS } from '@app/shared/models/constant.config';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { GeneratePdfService } from '@app/shared/services/generate-pdf.service';
import { PdfViewerComponent } from '@app/shared/components/pdf-viewer/pdf-viewer.component';

export interface ReleaseInvoiceRow {
  srno?: number | string;
  key: string;
  value: string;
  contract_amount?: number;
  previous_amount?: number;
  current_amount?: number;
  current_release?: number;
  commulative_amt?: number;
  keyField?: string;
  net_amount?: number;
  type?: 'data' | 'subtotal' | 'deduction' | 'grandtotal' | 'tds' | 'final'; // for styling footers
}

@Component({
  selector: 'app-release-invoice',
  standalone: false,
  templateUrl: './release-invoice.component.html',
  styleUrl: './release-invoice.component.scss'
})
export class ReleaseInvoiceComponent {
  isLoading = true;
  isPdfGenerating = false;
  subscription: Subscription = new Subscription();
  tds: number = 0;
  tdsgst: number = 0;
  gst: number = 0;
  invDetails: any = {};
  today = new Date();
  scopeData!: any;
  downloadingTemplate = false;
  showUpload: boolean = false;
  showSave: boolean = false;
  isBtnClicked = false;
  index = 0;
  isEditMode = false;
  readonly dialog = inject(MatDialog);
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  @ViewChild('scopePdfContent', { static: false }) scopePdfContent!: ElementRef;
  private defaultdialogoptions: MatDialogConfig = {
    panelClass: 'custom-dialog-container',
    minWidth: '80vw',
    disableClose: false,
    data: {},
  };
  pagePermissions: any = {};
  constructor(private cdr: ChangeDetectorRef, private invoiceService: InvoiceService, private sessionService: SessionService,
    private router: Router, private route: ActivatedRoute, private commonService: CommonService,
    private csvService: GenerateCsvService, private notifyBarService: NotifyBarService, private pdfService: GeneratePdfService,

  ) {
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  dataSource = new MatTableDataSource<ReleaseInvoiceRow>();

  rows: ReleaseInvoiceRow[] = [
    { srno: 1, key: BOQInvoice.LOCALSTAFF_KEY, value: BOQInvoice.LOCALSTAFF, keyField: 'designation', contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 2, key: BOQInvoice.SUPPORTSTAF_KEY, value: BOQInvoice.SUPPORTSTAF, keyField: 'designation', contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 3, key: BOQInvoice.TRANSPORTATION_KEY, value: BOQInvoice.TRANSPORTATION, keyField: 'designation', contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 4, key: BOQInvoice.DUTY_TRAVEL_SITE_KEY, value: BOQInvoice.DUTY_TRAVEL_SITE, keyField: 'designation', contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 5, key: BOQInvoice.OFFICE_RENT_KEY, value: BOQInvoice.OFFICE_RENT, keyField: 'designation', contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 6, key: BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM_KEY, value: BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM, keyField: 'designation', contract_amount: 0, current_release: 0, previous_amount: 0, current_amount: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 7, key: BOQInvoice.OFFICE_FURN_EPUIP_KEY, value: BOQInvoice.OFFICE_FURN_EPUIP, keyField: 'designation', contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 8, key: BOQInvoice.REPORT_DOCUMENT_REPORTING_KEY, value: BOQInvoice.REPORT_DOCUMENT_REPORTING, keyField: 'designation', contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 9, key: BOQInvoice.ROAD_SURVEY_EQUIP_KEY, value: BOQInvoice.ROAD_SURVEY_EQUIP, keyField: 'designation', contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 10, key: BOQInvoice.CONTINGENCIES_KEY, value: BOQInvoice.CONTINGENCIES, keyField: 'designation', contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 'A', key: 'TOTAL', value: 'Total', contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'subtotal' },
  ];
  releaseRows: ReleaseInvoiceRow[] = [
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
  ngOnInit(): void {
    let pageGuid = this.route.snapshot.data['pageGuid'];
    this.commonService.getPermissionsForCurrentPage(pageGuid).then((permissions: any) => {
      this.pagePermissions = permissions;
      if (this.pagePermissions?.canRead) {
        this.getReleasePaymentDetails();
      }
    });

  }

  getReleasePaymentDetails() {
    this.isLoading = true;
    this.subscription = this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((invEntity: any) => {
      if (invEntity && invEntity.projectId) {
        this.invDetails = invEntity.invoiceData;
        forkJoin({
          boqApi: this.invoiceService.getProjectBoqAmountSummary({ id: invEntity.projectId }, ''),
          releaseInvoiceApi: this.invoiceService.getReleaseInvoiceAmount({ invoiceid: invEntity.invoiceId, projectid: invEntity.projectId }, '')
        }).pipe(take(1), untilDestroyed(this), finalize(() => this.isLoading = false)).subscribe((response: any) => {

          if (response && response.boqApi && response.boqApi.success) {
            response.boqApi.data.forEach((d: any) => {
              const match = this.rows.find(c => c.key === d.name);
              if (match) {
                match.contract_amount = d.amount;
              }
            });
            this.cdr.detectChanges();
          }
          if (response && response.releaseInvoiceApi && response.releaseInvoiceApi.success) {
            this.gst = +response.releaseInvoiceApi.data.gst;
            this.tds = +response.releaseInvoiceApi.data.tds;
            this.tdsgst = +response.releaseInvoiceApi.data.tdsgst;

            this.rows = this.rows.map(row => {
              const matchingScope = response.releaseInvoiceApi.data.scopes.find((s: any) => s.key === row.key);

              if (matchingScope) {
                return {
                  ...row,
                  previous_amount: matchingScope.lastbillamount,
                  current_amount: matchingScope.claimedamount,
                  current_release: matchingScope.currentreleaseamount,
                  commulative_amt: matchingScope.lastbillamount + matchingScope.currentreleaseamount,
                  net_amount: matchingScope.currentreleaseamount
                };
              }

              return row; // no matching scope, keep row as is
            });
            this.calculationForTotals(this.rows, response.releaseInvoiceApi.data);
            this.dataSource = new MatTableDataSource([...this.rows]);

          }
        });
      }
    });

  }
  // utility to format numbers as Indian currency with commas (or you can use built-in pipes)
  formatAmount(v?: number): string {
    if (v === null || v === undefined) return '-';
    return v.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  printPage() {
    this.isPdfGenerating = true;
    this.pdfService.generateAndGetPDF(this.pdfContent, 'Release_Payment.pdf').then((pdf) => {
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
  printScopePage() {
    this.isPdfGenerating = true;
    this.pdfService.generateAndGetPDF(this.scopePdfContent, 'Release_Detailed.pdf').then((pdf) => {
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

  calculationForTotals(datarows: ReleaseInvoiceRow[], data: any) {
    this.index = 1;
    // preseve duplicate of rows 
    this.rows = this.rows.filter(r =>
      (typeof r.srno === 'number' && r.srno >= 1 && r.srno <= 10) ||
      r.key === 'TOTAL'
    );

    const dataRowsOnly = datarows.filter(r => typeof r.srno === 'number' && r.srno >= 1 && r.srno <= 10);

    const totalContract = dataRowsOnly.reduce((acc, row) => acc + (row.contract_amount ?? 0), 0);
    const totalPrevious = dataRowsOnly.reduce((acc, row) => acc + (row.previous_amount ?? 0), 0);
    const totalCurrent = dataRowsOnly.reduce((acc, row) => acc + (row.current_amount ?? 0), 0);
    const totalRelease = dataRowsOnly.reduce((acc, row) => acc + (row.current_release ?? 0), 0);
    const totalCommulative = dataRowsOnly.reduce((acc, row) => acc + (row.commulative_amt ?? 0), 0);
    const totalNet = dataRowsOnly.reduce((acc, row) => acc + (row.net_amount ?? 0), 0);


    const totalRow = datarows.find(r => r.key === 'TOTAL');
    if (totalRow) {
      totalRow.contract_amount = totalContract;
      totalRow.previous_amount = totalPrevious;
      totalRow.current_amount = totalCurrent;
      totalRow.current_release = totalRelease;
      totalRow.commulative_amt = totalCommulative;
      totalRow.net_amount = totalNet;
    }
    const deductionRowValues = data?.deductions
      .reduce((acc: any, row: any) => {
        return {
          contract_amount: 0,
          previous_amount: acc.previous_amount + (row.lastbillamount ?? 0),
          current_amount: 0,
          current_release: acc.current_release + (row.currentamount ?? 0),
          commulative_amt: acc.commulative_amt + (row.total ?? 0),
          net_amount: acc.net_amount + (row.currentamount ?? 0)
        };
      }, { contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0 });

    const deducationHead: ReleaseInvoiceRow = {
      srno: this.commonService.indexToAlphabetName(this.index++),
      key: '',
      value: 'Deduction(s)',
      contract_amount: 0,
      previous_amount: 0,
      current_amount: 0,
      current_release: 0,
      commulative_amt: 0,
      net_amount: 0,
      type: 'deduction'
    };
    if (data?.deductions?.length > 0)
      this.rows.push(deducationHead);

    if (data?.deductions) {
      data?.deductions.forEach((item: any) => {
        this.rows.push({
          srno: '',
          key: 'DEDUCTIONS',
          value: item.key,
          contract_amount: 0,
          previous_amount: item.lastbillamount,
          current_amount: 0,
          current_release: item.currentamount,
          commulative_amt: item.total,
          net_amount: item.currentamount,
          type: 'data'
        });
      });

    }
    const releaseHead: ReleaseInvoiceRow = {
      srno: this.commonService.indexToAlphabetName(this.index++),
      key: 'GRAND_TOTAL',
      value: 'Releases',
      contract_amount: 0,
      previous_amount: 0,
      current_amount: 0,
      current_release: 0,
      commulative_amt: 0,
      net_amount: 0,
      type: 'final'
    };
    if (data?.releases?.length > 0)
      this.rows.push(releaseHead);
    const releaseRowValues = data?.releases
      .reduce((acc: any, row: any) => {
        return {
          contract_amount: 0,
          previous_amount: acc.previous_amount + (row.lastbillamount ?? 0),
          current_amount: 0,
          current_release: acc.current_release + (row.currentamount ?? 0),
          commulative_amt: acc.commulative_amt + (row.total ?? 0),
          net_amount: acc.net_amount + (row.currentamount ?? 0)
        };
      }, { contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0 });

    if (data?.releases) {
      data?.releases.forEach((item: any) => {
        this.rows.push({
          srno: '',
          key: 'RELEASES',
          value: item.key,
          contract_amount: 0,
          previous_amount: item.lastbillamount,
          current_amount: 0,
          current_release: item.currentamount,
          commulative_amt: item.total,
          net_amount: item.currentamount,
          type: 'data'
        });
      });

    }
    const escHead: ReleaseInvoiceRow = {
      srno: this.commonService.indexToAlphabetName(this.index++),
      key: 'ESC',
      value: 'Escalation',
      contract_amount: 0,
      previous_amount: 0,
      current_amount: 0,
      current_release: 0,
      commulative_amt: 0,
      net_amount: 0,
      type: 'final'
    };
    if (data?.escalations?.length > 0)
      this.rows.push(escHead);
    const escRowValues = data?.escalations
      .reduce((acc: any, row: any) => {
        return {
          contract_amount: 0,
          previous_amount: acc.previous_amount + (row.lastbillamount ?? 0),
          current_amount: 0,
          current_release: acc.current_release + (row.currentamount ?? 0),
          commulative_amt: acc.commulative_amt + (row.total ?? 0),
          net_amount: acc.net_amount + (row.currentamount ?? 0)
        };
      }, { contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0 });

    if (data?.escalations) {
      data?.escalations.forEach((item: any) => {
        this.rows.push({
          srno: '',
          key: 'ESC',
          value: item.key,
          contract_amount: 0,
          previous_amount: item.lastbillamount,
          current_amount: 0,
          current_release: item.currentamount,
          commulative_amt: item.total,
          net_amount: item.currentamount,
          type: 'data'
        });
      });

    }
    let grandIndex = this.index;
    const grandTotal: ReleaseInvoiceRow = {
      srno: this.commonService.indexToAlphabetName(this.index),
      key: 'GRAND_TOTAL',
      value: 'Grand Total',
      contract_amount: totalContract + escRowValues.contract_amount + releaseRowValues.contract_amount - deductionRowValues.contract_amount,
      previous_amount: totalPrevious + escRowValues.previous_amount + releaseRowValues.previous_amount - deductionRowValues.previous_amount,
      current_amount: totalCurrent + escRowValues.current_amount + releaseRowValues.current_amount - deductionRowValues.current_amount,
      current_release: totalRelease + escRowValues.current_release + releaseRowValues.current_release - deductionRowValues.current_release,
      commulative_amt: totalCommulative + escRowValues.commulative_amt + releaseRowValues.commulative_amt - deductionRowValues.commulative_amt,
      net_amount: totalNet + escRowValues.net_amount + releaseRowValues.net_amount - deductionRowValues.net_amount,
      type: 'grandtotal'
    };

    this.rows.push(grandTotal);
    const gstRow: ReleaseInvoiceRow = {
      srno: this.commonService.indexToAlphabetName(this.index++),
      key: 'GST',
      value: 'GST @ ' + this.gst + '%',
      contract_amount: (grandTotal.contract_amount ?? 0) * (this.gst / 100),
      previous_amount: (grandTotal.previous_amount ?? 0) * (this.gst / 100),
      current_amount: (grandTotal.current_amount ?? 0) * (this.gst / 100),
      current_release: (grandTotal.current_release ?? 0) * (this.gst / 100),
      commulative_amt: (grandTotal.commulative_amt ?? 0) * (this.gst / 100),
      net_amount: (grandTotal.net_amount ?? 0) * (this.gst / 100),
      type: 'data'
    };
    this.rows.push(gstRow);

    const grossAmountRow: ReleaseInvoiceRow = {
      srno: this.commonService.indexToAlphabetName(this.index++),
      key: 'GROSS_AMOUNT',
      value: 'Gross Amount',
      contract_amount: (grandTotal.contract_amount ?? 0) + (gstRow.contract_amount ?? 0),
      previous_amount: (grandTotal.previous_amount ?? 0) + (gstRow.previous_amount ?? 0),
      current_amount: (grandTotal.current_amount ?? 0) + (gstRow.current_amount ?? 0),
      current_release: (grandTotal.current_release ?? 0) + (gstRow.current_release ?? 0),
      commulative_amt: (grandTotal.commulative_amt ?? 0) + (gstRow.commulative_amt ?? 0),
      net_amount: (grandTotal.net_amount ?? 0) + (gstRow.net_amount ?? 0),
      type: 'grandtotal'
    };
    this.rows.push(grossAmountRow);

    // held
    const heldHead: ReleaseInvoiceRow = {
      srno: this.commonService.indexToAlphabetName(this.index++),
      key: 'WITH_HELD',
      value: 'With Held Amount',
      contract_amount: 0,
      previous_amount: 0,
      current_amount: 0,
      current_release: 0,
      commulative_amt: 0,
      net_amount: 0,
      type: 'deduction'
    };
    if (data?.helds?.length > 0)
      this.rows.push(heldHead);
    const heldRowValues = data?.helds
      .reduce((acc: any, row: any) => {
        return {
          contract_amount: 0,
          previous_amount: acc.previous_amount + (row.lastbillamount ?? 0),
          current_amount: 0,
          current_release: acc.current_release + (row.currentamount ?? 0),
          commulative_amt: acc.commulative_amt + (row.total ?? 0),
          net_amount: acc.net_amount + (row.currentamount ?? 0)
        };
      }, { contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0 });

    if (data?.helds) {
      data?.helds.forEach((item: any) => {
        this.rows.push({
          srno: '',
          key: 'HELDS',
          value: item.key,
          contract_amount: 0,
          previous_amount: item.lastbillamount,
          current_amount: 0,
          current_release: item.currentamount,
          commulative_amt: item.total,
          net_amount: item.currentamount,
          type: 'data'
        });
      });

    }
    //recover
    const recoverHead: ReleaseInvoiceRow = {
      srno: this.commonService.indexToAlphabetName(this.index++),
      key: 'GRAND_TOTAL',
      value: 'Recover Amount',
      contract_amount: 0,
      previous_amount: 0,
      current_amount: 0,
      current_release: 0,
      commulative_amt: 0,
      net_amount: 0,
      type: 'deduction'
    };
    if (data?.recovers?.length > 0)
      this.rows.push(recoverHead);
    const recoverRowValues = data?.recovers
      .reduce((acc: any, row: any) => {
        return {
          contract_amount: 0,
          previous_amount: acc.previous_amount + (row.lastbillamount ?? 0),
          current_amount: 0,
          current_release: acc.current_release + (row.currentamount ?? 0),
          commulative_amt: acc.commulative_amt + (row.total ?? 0),
          net_amount: acc.net_amount + (row.currentamount ?? 0)
        };
      }, { contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0 });

    if (data?.recovers) {
      data?.recovers.forEach((item: any) => {
        this.rows.push({
          srno: '',
          key: 'RECOVERS',
          value: item.key,
          contract_amount: 0,
          previous_amount: item.lastbillamount,
          current_amount: 0,
          current_release: item.currentamount,
          commulative_amt: item.total,
          net_amount: item.currentamount,
          type: 'data'
        });
      });

    }
    
    const tdsAmount = ((grandTotal.net_amount ?? 0) * this.tds) / 100;

    const tdsRow: ReleaseInvoiceRow = {
      srno: this.commonService.indexToAlphabetName(this.index++),
      key: 'TDS',
      value: 'TDS @ ' + this.tds + '% on (' + this.commonService.indexToAlphabetName(grandIndex) + ')',
      contract_amount: 0,
      previous_amount: 0,
      current_amount: 0,
      current_release: 0,
      commulative_amt: 0,
      net_amount: tdsAmount,
      type: 'tds'
    };
    this.rows.push(tdsRow);


    const tdsGstAmount = ((grandTotal.net_amount ?? 0) * this.tdsgst) / 100;

    const tdsGstRow: ReleaseInvoiceRow = {
      srno: this.commonService.indexToAlphabetName(this.index++),
      key: 'TDS_GST',
      value: 'TDS GST @ ' + this.tdsgst + '% on (' + this.commonService.indexToAlphabetName(grandIndex) + ')',
      contract_amount: 0,
      previous_amount: 0,
      current_amount: 0,
      current_release: 0,
      commulative_amt: 0,
      net_amount: tdsGstAmount,
      type: 'tds'
    };
    this.rows.push(tdsGstRow);

    const netPayable = (grossAmountRow.net_amount ?? 0) - tdsAmount - tdsGstAmount-recoverRowValues.net_amount-recoverRowValues.net_amount;

    const netPayableRow: ReleaseInvoiceRow = {
      srno: this.commonService.indexToAlphabetName(this.index++),
      key: 'NET_PAYABLE',
      value: 'Net Payable',
      contract_amount: 0,
      previous_amount: 0,
      current_amount: 0,
      current_release: 0,
      commulative_amt: 0,
      net_amount: netPayable,
      type: 'final'
    };
    this.rows.push(netPayableRow);

  }
  isSingleCellRow(row: any): boolean {

    const singleCellKeys = ['tds', 'final', 'deduction'];
    return singleCellKeys.includes(row.type);
  }
  manageRelease() {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element: {
        values: this.invDetails
      }
    };
    const dialogRef = this.dialog.open(ManageReleaseInvoiceComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        this.getReleasePaymentDetails();
      }
      else {
        // this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  months: string[] = [];          // display labels: 'Apr 24'
  monthKeys: any[] = [];
  quarter = 1;
  tableRows: any[] = [];
  apiObj: any = {};
  defaultTableHeaders = [
    { label: 'Sr. No', value: 'srNo' },
    { label: 'Designation', value: 'position' },
    { label: 'Name', value: 'name' },
    { label: 'Contract Amount', value: 'contractAmount' }];
  tableheaders = [...this.defaultTableHeaders];
  setQuarter(q: number) {
    this.quarter = q;
    // map quarters to 4 months each as your screenshot uses 4 months (Apr-Jul etc.)
    const quarterMap: Record<number, string[]> = {
      1: ['2024-04', '2024-05', '2024-06', '2024-07'],
      2: ['2024-07', '2024-08', '2024-09', '2024-10'],
      3: ['2024-10', '2024-11', '2024-12', '2025-01'],
      4: ['2025-01', '2025-02', '2025-03', '2025-04']
    };
    this.monthKeys = quarterMap[q] || quarterMap[1];
    this.months = this.monthKeys.map(k => this.labelForKey(k));
  }

  labelForKey(key: string) {
    const d = new Date(key + '-01');
    const m = d.toLocaleString('en-US', { month: 'short' });
    const yy = (d.getFullYear() % 100).toString().padStart(2, '0');
    return `${m} ${yy}`;
  }


  // returns suggested monthly value for a scope for a given month
  suggestedValueFor(scope: any, monthKey: any): number {
    // Priority:
    // 1. If scope has ratepermonth or rate, assume that's monthly
    // 2. If scope has totalamount and numberofmonths, do total/num
    // 3. If uptolastbill available, you might decide - but for UI we show rate or computed
    if (scope.ratepermonth != null) return scope.ratepermonth;
    if (scope.rate != null) return scope.rate;
    if (scope.totalamount && scope.numberofmonths) {
      return Math.round(scope.totalamount / scope.numberofmonths);
    }
    // fallback: if totalamount but no months, treat as total one-time -> show full total in first month
    if (scope.totalamount) {
      const firstMonth = this.monthKeys[0];
      return monthKey === firstMonth ? scope.totalamount : 0;
    }
    return 0;
  }

  // get value (override merged)
  cellValue(scopeId: string, scope: any, monthKey: any): number {
    // const override = this.overrides?.[scopeId]?.[monthKey];
    // if (override != null) return override;
    // return this.suggestedValueFor(scope, monthKey);
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

  dateChange(data: any) {
    if (data) {
      this.apiObj.startdate = data.value.startDate;
      this.apiObj.enddate = data.value.endDate;
      this.apiObj.year = data.value.year;
    }
  }
  onTabChange(event: MatTabChangeEvent) {
    this.showUpload = false;
    this.showSave = false;
    if (event.index === 0) {
      this.getReleasePaymentDetails();
    }
    if (event.index === 1) {
      this.getReleaseInvoiceDetails();
    }
  }
  getReleaseInvoiceDetails() {
    this.tableRows = [];
    this.isLoading = true;

    this.invoiceService.getReleaseInvoiceTemplate({ projectid: this.invDetails.projectid, invoiceid: this.invDetails.id }, '')
      .pipe(take(1), untilDestroyed(this), finalize(() => this.isLoading = false)).subscribe((response: any) => {
        if (response && response.success) {
          this.scopeData = response.data;
          this.buildTable();
          //let dates = this.commonService.getMonthlyDates(this.apiObj.startdate, this.apiObj.enddate);
          this.monthKeys = [];
          // dates.forEach((item) => {
          //   this.monthKeys.push(item.toISOString());
          //   this.tableheaders.push({
          //     label: item.toISOString(), value: item.toISOString()
          //   })
          // })
          //this.monthKeys.push(this.invDetails.monthandyear);
          this.monthKeys.push(this.invDetails.monthandyear);
          this.tableheaders = [...this.defaultTableHeaders];
          this.tableheaders.push({
            label: this.invDetails.monthandyear, value: this.invDetails.monthandyear
          })
          this.tableRows = this.tableRows.map(row => {
            this.monthKeys.forEach(key => {
              if (!(key in row)) {
                row[key] = row.release ?? 0;
              }
              if (Object.prototype.hasOwnProperty.call(row, key)) {
                row[key] = row.release ?? 0;
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

  isDate(value: any): boolean {
    const d = new Date(value);
    return !isNaN(d.getTime());
  }
  csvRecords: any = [];
  csvHeaders: any = [];
  fileuploaded(data: any) {
    this.csvRecords = (data.slice(1));
    this.csvHeaders = data[0];
    this.mapCsvToTableRows();
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

    let categoryTotals: any = { contractAmount: 0 };
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
        categoryTotals = { contractAmount: 0 };
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
    }
    if (currentCategoryKey) {
      const totalRow: any = {
        srNo: '',
        type: 'total',
        skey: currentCategoryKey,
        position: 'Total',
        name: '',
        contractAmount: categoryTotals.contractAmount,
        scopeid: null
      };

      this.monthKeys.forEach(mk => totalRow[mk] = categoryTotals[mk]);
      newTableRows.push(totalRow);
    }

    this.tableRows = [...newTableRows];
    this.convertGrouped();
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
  submit() {
    this.isBtnClicked = true;
    let apiObj = {
      projectid: this.invDetails.projectid,
      invoiceid: this.invDetails.id,
      scopedetails: [...this.convertGrouped()]
    }
    this.invoiceService.upsertReleaseInvoiceScopes(apiObj, '')
      .pipe(take(1), untilDestroyed(this), finalize(() => { this.isLoading = false; this.isBtnClicked = false })).subscribe((response: any) => {
        if (response && response.success) {
          this.notifyBarService.showsnackbar('Release details saved successfully.');
        }
      });
  }
  manageDetailedRelease() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.showUpload = false;
      this.showSave = false;
    }
  }
  downloadTemplate() {
    this.csvService.downloadFile(this.tableRows, this.tableheaders, 'Release Template');
    this.showUpload = true;
    this.showSave = true;
    this.isEditMode = true;
  }
}
