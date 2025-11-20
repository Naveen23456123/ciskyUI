import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BOQ_INVOICE, StaffType } from '@app/shared/models/constant.config';
import { BOQInvoice } from '@app/shared/models/Invoice';
import { InvoiceService } from '../invoice.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';
import { CommonService } from '@app/shared/services/common.service';

@Component({
  selector: 'app-consultancy-invoice',
  standalone: false,
  templateUrl: './consultancy-invoice.component.html',
  styleUrl: './consultancy-invoice.component.scss'
})
export class ConsultancyInvoiceComponent {
  isLoading = true;
  displayedColumns: string[] = ['serial', 'value', 'contract_amount', 'previous_amount', 'current_amount', 'commulated', 'remaining'];
  contdataColumn: string[] = ['serial', 'month', 'actualmonth', 'curr_amount', 'action'];

  dataSource!: MatTableDataSource<any[]>;
  contDataSource!: MatTableDataSource<any[]>;
  readonly dialog = inject(MatDialog);
  private defaultdialogoptions: MatDialogConfig = {
    minWidth: '900px',
    disableClose: false,
    data: {},
  };
  bidDueDate!: any;
  billingYears = 0;
  billing: number = 0;
  gst: number = 0;
  isInit = false;
  today = new Date();
  invoiceData: any;
  subTotalKey = 'Sub Total';
  scopeTotalKey = 'Total (1 to 10)';
  billingKey = '';
  totalKey = 'Total';
  gstKey = '';
  pagePermissions: any = {};
  grandTotalKey = "Grand Total";
  columnsList: any[] = [this.subTotalKey, this.totalKey, this.grandTotalKey, this.scopeTotalKey];

  consultancyList: any[] = [
    { srno: 1, key: BOQInvoice.LOCALSTAFF_KEY, value: BOQInvoice.LOCALSTAFF, contract_amount: 0, previous_amount: 0, current_amount: 0, commulative_amt: 0, remaining_amt: 0 },
    { srno: 2, key: BOQInvoice.SUPPORTSTAF_KEY, value: BOQInvoice.SUPPORTSTAF, contract_amount: 0, previous_amount: 0, current_amount: 0, commulative_amt: 0, remaining_amt: 0 },
    { srno: 3, key: BOQInvoice.TRANSPORTATION_KEY, value: BOQInvoice.TRANSPORTATION, contract_amount: 0, previous_amount: 0, current_amount: 0, commulative_amt: 0, remaining_amt: 0 },
    { srno: 4, key: BOQInvoice.DUTY_TRAVEL_SITE_KEY, value: BOQInvoice.DUTY_TRAVEL_SITE, contract_amount: 0, previous_amount: 0, current_amount: 0, commulative_amt: 0, remaining_amt: 0 },
    { srno: 5, key: BOQInvoice.OFFICE_RENT_KEY, value: BOQInvoice.OFFICE_RENT, contract_amount: 0, previous_amount: 0, current_amount: 0, commulative_amt: 0, remaining_amt: 0 },
    { srno: 6, key: BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM_KEY, value: BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM, contract_amount: 0, previous_amount: 0, current_amount: 0, commulative_amt: 0, remaining_amt: 0 },
    { srno: 7, key: BOQInvoice.OFFICE_FURN_EPUIP_KEY, value: BOQInvoice.OFFICE_FURN_EPUIP, contract_amount: 0, previous_amount: 0, current_amount: 0, commulative_amt: 0, remaining_amt: 0 },
    { srno: 8, key: BOQInvoice.REPORT_DOCUMENT_REPORTING_KEY, value: BOQInvoice.REPORT_DOCUMENT_REPORTING, contract_amount: 0, previous_amount: 0, current_amount: 0, commulative_amt: 0, remaining_amt: 0 },
    { srno: 9, key: BOQInvoice.ROAD_SURVEY_EQUIP_KEY, value: BOQInvoice.ROAD_SURVEY_EQUIP, contract_amount: 0, previous_amount: 0, current_amount: 0, commulative_amt: 0, remaining_amt: 0 },
    { srno: 10, key: BOQInvoice.CONTINGENCIES_KEY, value: BOQInvoice.CONTINGENCIES, contract_amount: 0, previous_amount: 0, current_amount: 0, commulative_amt: 0, remaining_amt: 0 },
  ];
  tpList: any[] = [];

  ngOnInit() {
    let pageGuid = this.route.snapshot.data['pageGuid'];
    this.commonService.getPermissionsForCurrentPage(pageGuid).then((permissions: any) => {
      this.pagePermissions = permissions;
      if (this.pagePermissions?.canRead) {
        this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((projectEntity: any) => {
          if (projectEntity && projectEntity.projectId) {
            this.invoiceData = projectEntity.invoiceData;
            this.invoiceService.getProjectBoqAmountSummary({ id: projectEntity.projectId }, '')
              .pipe(finalize(() => this.isLoading = false)).subscribe((response: any) => {
                if (response && response.success) {
                  response.data.forEach((d: any) => {
                    const match = this.consultancyList.find(c => c.key === d.name);
                    if (match) {
                      match.contract_amount = d.amount;
                    }
                  });
                  this.dataSource = new MatTableDataSource(this.consultancyList);
                  this.cdr.detectChanges();
                }
              })
          }
        });
      }
    });
  }

  constructor(private cdr: ChangeDetectorRef, private invoiceService: InvoiceService, private sessionService: SessionService,
    private commonService: CommonService, private route: ActivatedRoute
  ) {
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  stf_amt(event: any) {
    if (event) {
      this.bindLocalStaffAmount(event);
      this.bindAmount(BOQInvoice.SUPPORTSTAF, event.ss);
    }

  }

  private chargesInitialized = false;
  private chargesInitPromise: Promise<void> | null = null;

  initializeCharges(): Promise<void> {
    if (this.chargesInitPromise) return this.chargesInitPromise;

    this.chargesInitPromise = new Promise((resolve) => {
      this.sessionService.invoiceEntitySubject$
        .pipe(take(1))
        .subscribe((projectEntity: any) => {
          if (!projectEntity?.projectId) {
            this.chargesInitialized = true;
            resolve();
            return;
          }

          this.invoiceData = projectEntity.invoiceData;
          this.gst = this.invoiceData.gst;
          this.billing = this.invoiceData.escalation;

          this.billingKey = BOQInvoice.ESC_KEY.replace('{esc}', this.invoiceData.escalation);
          this.gstKey = `GST @ ${this.gst}%`;

          if (!this.columnsList.includes(this.billingKey)) this.columnsList.push(this.billingKey);
          if (!this.columnsList.includes(this.gstKey)) this.columnsList.push(this.gstKey);

          this.invoiceService.getProjectScopeDurationById(
            { id: projectEntity.projectId, invid: this.invoiceData.id },
            ''
          )
            .pipe(finalize(() => this.isLoading = false))
            .subscribe((response: any) => {
              if (response?.success) {
                this.billingYears = response.data.years;
                //this.billing = this.billing * this.billingYears;
              }

              this.chargesInitialized = true;
              resolve();
            });
        });
    });

    return this.chargesInitPromise;
  }


  dt_amt(event: any) {
    this.bindAmount(BOQInvoice.DUTY_TRAVEL_SITE, event);
  }
  os_amt(event: any) {
    this.bindAmount(BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM, event);
  }
  or_amt(event: any) {
    this.bindAmount(BOQInvoice.OFFICE_RENT, event);
  }
  of_amt(event: any) {
    this.bindAmount(BOQInvoice.OFFICE_FURN_EPUIP, event);
  }
  rd_amt(event: any) {
    this.bindAmount(BOQInvoice.REPORT_DOCUMENT_REPORTING, event);
  }
  rs_amt(event: any) {
    this.bindAmount(BOQInvoice.ROAD_SURVEY_EQUIP, event);
  }
  tp_amt(event: any) {
    this.bindAmount(BOQInvoice.TRANSPORTATION, event);
  }
  cont_amt(event: any) {
    this.bindAmount(BOQInvoice.CONTINGENCIES, event);
  }
  async bindAmount(valueKey: any, event: any) {
    await this.initializeCharges();
    if (!this.dataSource?.data) return;
    const element: any = this.dataSource.data.find((x: any) => x.value == valueKey);
    if (element && event) {
      element.previous_amount = event.previous;
      element.current_amount = event.current;
      element.commulative_amt = event.commulative;
      element.remaining_amt = event.remaining;
    }

    this.dataSource._updateChangeSubscription();
    this.addBillingDetails();
  }
  async bindLocalStaffAmount(event: any) {
    await this.initializeCharges();
    if (this.dataSource && this.dataSource.data) {
      const element: any = this.dataSource.data.find((x: any) => x.value == BOQInvoice.LOCALSTAFF);
      if (element && event) {
        element.previous_amount = event.kp.previous + event.sps.previous;
        element.current_amount = event.kp.current + event.sps.current;
        element.commulative_amt = event.kp.commulative + event.sps.commulative;
        element.remaining_amt = event.kp.remaining + event.sps.remaining;
      }
      this.dataSource._updateChangeSubscription();
      this.addBillingDetails();
    }
  }
  getAmountTotal() {
    let filteredData = this.dataSource.data.filter((row: any) => !row.footer) //(!this.columnsList.includes(row.value)
    return {
      contract_amount: filteredData.map((t: any) => t.contract_amount).reduce((acc, value) => acc + value, 0),
      previous_amount: filteredData.map((t: any) => t.previous_amount).reduce((acc, value) => acc + value, 0),
      current_amount: filteredData.map((t: any) => t.current_amount).reduce((acc, value) => acc + value, 0),
      commulative_amt: filteredData.map((t: any) => t.commulative_amt).reduce((acc, value) => acc + value, 0),
      remaining_amt: filteredData.map((t: any) => t.remaining_amt).reduce((acc, value) => acc + value, 0),
    };
  }
  addBillingDetails() {
    let scopeTotalRow: any = this.dataSource.data.find((x: any) => x.value == this.scopeTotalKey);
    if (scopeTotalRow) {
      const index = this.dataSource.data.findIndex((x: any) => x.value == this.scopeTotalKey);
      this.dataSource.data.splice(index, 1);
    }
    let amountObj = this.getAmountTotal();
    let scopeTotal: any = {
      srno: 11,
      value: this.scopeTotalKey,
      contract_amount: amountObj.contract_amount,
      previous_amount: amountObj.previous_amount,
      current_amount: amountObj.current_amount,
      commulative_amt: amountObj.commulative_amt,
      remaining_amt: amountObj.remaining_amt,
      footer: true
    };


    let subTotal: any = this.dataSource.data.find((x: any) => x.value == this.subTotalKey);
    // if (subTotal) {
    //   const index = this.dataSource.data.findIndex((x: any) => x.value == this.subTotalKey);
    //   this.dataSource.data.splice(index, 1);
    // }
    this.dataSource.data = (this.dataSource.data as any[]).filter(
      row => !row.value?.toString().startsWith(this.subTotalKey)
    );

    subTotal = {
      srno: '',
      value: this.subTotalKey,
      contract_amount: this.getAmountTotal().contract_amount,
      previous_amount: this.getAmountTotal().previous_amount,
      current_amount: this.getAmountTotal().current_amount,
      commulative_amt: this.getAmountTotal().commulative_amt,
      remaining_amt: this.getAmountTotal().remaining_amt,
      footer: true
    };
    // let billing: any = this.dataSource.data.find((x: any) => x.value == this.billingKey);
    // if (billing && this.billingYears > 0) {
    //   const index = this.dataSource.data.findIndex((x: any) => x.value == this.billingKey);
    //   this.dataSource.data.splice(index, 1);
    // }
    this.dataSource.data = (this.dataSource.data as any[]).filter(
      row => row.value !== this.billingKey
    );
    let billingRows: any[] = [];
    let subTotals: any[] = [];
    let latestSubTotals = subTotal;
    let latestBilling = [...billingRows]
      .filter((x: any) => x.value === this.billingKey)
      .pop();
    let cumulative = 0;

    for (let i = 1; i <= this.billingYears; i++) {

      latestBilling = [...billingRows]
        .filter((x: any) => x.value === this.billingKey)
        .pop();

      const billing = {
        srno: '',
        value: this.billingKey,
        contract_amount: 0,
        previous_amount: this.applyBilling(subTotal.previous_amount),
        current_amount: this.applyBilling(subTotal.current_amount),
        commulative_amt: this.applyBilling(0),
        remaining_amt: this.applyBilling(subTotal.remaining_amt),
        footer: true
      };

      // Update cumulative value
      cumulative += this.applyBilling(subTotal.commulative_amt);
      billing.commulative_amt = cumulative;

      billingRows.push(billing);

      // Sub-total row for this year
      const subtotalRow = {
        srno: '',
        value: `${this.subTotalKey}`,  // unique key
        previous_amount: subTotal.previous_amount + billing.previous_amount,
        current_amount: subTotal.current_amount + billing.current_amount,
        commulative_amt: subTotal.commulative_amt + billing.commulative_amt,
        remaining_amt: subTotal.remaining_amt + billing.remaining_amt,
        footer: true
      };
      billingRows.push(subtotalRow);
      subTotals.push(subtotalRow);
      subTotal = [...subTotals]
        .filter((x: any) => x.value?.toString().startsWith(this.subTotalKey))
        .pop();
    }

    if (subTotals && subTotals.length > 0) {
      subTotal = [...subTotals]
        .filter((x: any) => x.value?.toString().startsWith(this.subTotalKey))
        .pop();
    }

    // 3. Check if TOTAL row already exists
    //let totalIndex = this.dataSource.data.findIndex((x: any) => x.value === this.totalKey);

    // let totalRow = {
    //   srno: '',
    //   value: this.totalKey,
    //   contract_amount: 0,
    //   previous_amount: subTotal.previous_amount + latestBilling.previous_amount,
    //   current_amount: subTotal.current_amount + latestBilling.current_amount,
    //   commulative_amt: subTotal.commulative_amt + latestBilling.commulative_amt,
    //   remaining_amt: subTotal.remaining_amt + latestBilling.remaining_amt,
    //   footer: true
    // };


    // billing = {
    //   srno: '',
    //   value: this.billingKey,
    //   contract_amount: 0,
    //   previous_amount: this.applyBilling(subTotal.previous_amount),
    //   current_amount: this.applyBilling(subTotal.current_amount),
    //   commulative_amt: this.applyBilling(subTotal.commulative_amt),
    //   remaining_amt: this.applyBilling(subTotal.remaining_amt),
    //   footer: true
    // };
    let total: any = this.dataSource.data.find((x: any) => x.value == this.totalKey);
    if (total && this.billingYears > 0) {
      const index = this.dataSource.data.findIndex((x: any) => x.value == this.totalKey);
      this.dataSource.data.splice(index, 1);
    }

    //let total: any = this.dataSource.data.find((x: any) => x.value == this.totalKey);
    total = {
      srno: '',
      value: this.totalKey,
      contract_amount: 0,
      previous_amount: subTotal.previous_amount,
      current_amount: subTotal.current_amount,
      commulative_amt: subTotal.commulative_amt,
      remaining_amt: subTotal.remaining_amt,
      footer: true
    };
    let gst: any = this.dataSource.data.find((x: any) => x.value == this.gstKey);
    if (gst) {
      const index = this.dataSource.data.findIndex((x: any) => x.value == this.gstKey);
      this.dataSource.data.splice(index, 1);
    }
    gst = {
      srno: '',
      value: this.gstKey,
      contract_amount: this.applyGst(this.getAmountTotal().contract_amount),
      previous_amount: this.applyGst(total.previous_amount),
      current_amount: this.applyGst(total.current_amount),
      commulative_amt: this.applyGst(total.commulative_amt),
      remaining_amt: this.applyGst(total.remaining_amt),
      footer: true
    };
    let grandTotal: any = this.dataSource.data.find((x: any) => x.value == this.grandTotalKey);
    if (grandTotal) {
      const index = this.dataSource.data.findIndex((x: any) => x.value == this.grandTotalKey);
      this.dataSource.data.splice(index, 1);
    }
    grandTotal = {
      srno: '',
      value: this.grandTotalKey,
      contract_amount: this.getAmountTotal().contract_amount + gst.contract_amount,
      previous_amount: total.previous_amount + gst.previous_amount,
      current_amount: total.current_amount + gst.current_amount,
      commulative_amt: total.commulative_amt + gst.commulative_amt,
      remaining_amt: total.remaining_amt + gst.remaining_amt,
      footer: true
    };
    this.dataSource.data = [...this.dataSource.data, scopeTotal];
    if (this.billingYears > 0) {
      //this.dataSource.data = [...this.dataSource.data, billing];
      //this.dataSource.data = [...this.dataSource.data, total];
      this.dataSource.data.push(...billingRows);
      this.dataSource.data = [...this.dataSource.data, total];
    }
    this.dataSource.data = [...this.dataSource.data, gst];
    this.dataSource.data = [...this.dataSource.data, grandTotal];
    this.dataSource._updateChangeSubscription();

  }
  applyBilling(amount: number) {
    return amount * this.billing / 100;
  }
  applyGst(amount: number) {
    return amount * this.gst / 100;
  }
  addEscalationAmounts() {

  }
}

