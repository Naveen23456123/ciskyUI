import { Component, Inject, inject, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { untilDestroyed } from '@app/core/until-destroyed';
import { InvoiceService } from '@app/invoice-control/invoice.service';
import { BOQInvoice } from '@app/shared/models/Invoice';
import { CommonService } from '@app/shared/services/common.service';
import { InvoiceInterfaceService } from '@app/shared/services/external/invoice-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { replace } from 'lodash';
import moment from 'moment';
import { finalize, forkJoin, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-manage-release-invoice',
  standalone: false,
  templateUrl: './manage-release-invoice.component.html',
  styleUrl: './manage-release-invoice.component.scss'
})
export class ManageReleaseInvoiceComponent {
  invoiceForm!: FormGroup;
  releaseForm!: FormGroup;
  deductionForm!: FormGroup;
  withHeldForm!: FormGroup;
  recoverForm!: FormGroup;
  escForm!: FormGroup;
  isLoading = true;
  billingYears: number = 0;
  isBtnClicked = false;
  data: any = {};
  invDetails: any = {};
  invlist: any = [];
  subscription: Subscription = new Subscription();
  rows: any[] = [
    { srno: 1, key: BOQInvoice.LOCALSTAFF_KEY, value: BOQInvoice.LOCALSTAFF, contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 2, key: BOQInvoice.SUPPORTSTAF_KEY, value: BOQInvoice.SUPPORTSTAF, contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 3, key: BOQInvoice.TRANSPORTATION_KEY, value: BOQInvoice.TRANSPORTATION, contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 4, key: BOQInvoice.DUTY_TRAVEL_SITE_KEY, value: BOQInvoice.DUTY_TRAVEL_SITE, contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 5, key: BOQInvoice.OFFICE_RENT_KEY, value: BOQInvoice.OFFICE_RENT, contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 6, key: BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM_KEY, value: BOQInvoice.OFFICE_SUPPLY_UTILITY_COMM, contract_amount: 0, current_release: 0, previous_amount: 0, current_amount: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 7, key: BOQInvoice.OFFICE_FURN_EPUIP_KEY, value: BOQInvoice.OFFICE_FURN_EPUIP, contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 8, key: BOQInvoice.REPORT_DOCUMENT_REPORTING_KEY, value: BOQInvoice.REPORT_DOCUMENT_REPORTING, contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 9, key: BOQInvoice.ROAD_SURVEY_EQUIP_KEY, value: BOQInvoice.ROAD_SURVEY_EQUIP, contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
    { srno: 10, key: BOQInvoice.CONTINGENCIES_KEY, value: BOQInvoice.CONTINGENCIES, contract_amount: 0, previous_amount: 0, current_amount: 0, current_release: 0, commulative_amt: 0, net_amount: 0, type: 'data' },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) data: any, @Optional() private dialogRef: MatDialogRef<ManageReleaseInvoiceComponent>,
    private fb: FormBuilder, private invoiceService: InvoiceService,private commonService:CommonService,
    private sessionService: SessionService, private notifyBarService: NotifyBarService) {
    this.data = data || {};
  }

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      invoiceid: [this.data.element.values.id],
      projectid: [this.data.element.values.projectid],
      tds: [18, Validators.required],
      tdsgst: [0, Validators.required],
      gst: [0, Validators.required],
      scopes: this.fb.array([]),
      totalrelease: []
    });
    this.releaseForm = this.fb.group({
      releases: this.fb.array([]) // dynamic rows
    });
    this.deductionForm = this.fb.group({
      deductions: this.fb.array([]) // dynamic rows
    });
    this.escForm = this.fb.group({
      escalations: this.fb.array([]) // dynamic rows
    });
    this.withHeldForm = this.fb.group({
      helds: this.fb.array([]) // dynamic rows
    });
    this.recoverForm = this.fb.group({
      recovers: this.fb.array([]) // dynamic rows
    });
    if (this.data) {
      this.subscription = this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((invEntity: any) => {
        if (invEntity && invEntity.projectId) {
          this.invDetails = invEntity.invoiceData;
          forkJoin({
            scopeApi: this.invoiceService.getProjectScopeDurationById({ id: invEntity.projectId, invid: invEntity.invoiceId }, ''),
            releaseInvoiceApi: this.invoiceService.getReleaseInvoiceDetails({ invoiceid: invEntity.invoiceId, projectid: invEntity.projectId }, '')
          }).pipe(take(1), untilDestroyed(this), finalize(() => this.isLoading = false)).subscribe((apiResponse: any) => {

            if (apiResponse && apiResponse.scopeApi && apiResponse.scopeApi.success) {
              this.billingYears = apiResponse.scopeApi.data.years;
            }
            if (apiResponse && apiResponse.releaseInvoiceApi && apiResponse.releaseInvoiceApi.success) {
              let response = apiResponse.releaseInvoiceApi;
              this.invoiceForm.patchValue({
                tds: response?.data?.tds ?? 0,
                gst: response?.data?.gst ?? 0,
                tdsgst: response?.data?.tdsgst ?? 0,
                totalrelease: response?.data?.totalrelease
              })
              if (response.data?.scopes) {
                this.rowControls.clear();
                this.rows = this.rows.map(row => {
                  const matched = response.data.scopes.find((scope: any) => scope.key === row.key);

                  let updatedRow = { ...row };

                  // ✅ Special Case: key = "ls" → sum kps + sps
                  if (row.key === 'ls') {
                    const kps = response.data.scopes.find((x: any) => x.key === 'kps')?.amount || 0;
                    const sps = response.data.scopes.find((x: any) => x.key === 'sps')?.amount || 0;
                    updatedRow.current_release = kps + sps;
                    updatedRow.id = null; // or handle logic if needed
                  }
                  else if (matched) {
                    updatedRow.current_release = matched.amount;
                    updatedRow.id = matched.id;
                  }
                  else {
                    updatedRow.current_release = 0;
                  }

                  const formGroup = this.fb.group({
                    id: [updatedRow.id],
                    srno: [updatedRow.srno],
                    value: [updatedRow.value],
                    key: [updatedRow.key],
                    amount: [updatedRow.current_release]
                  });
                  this.rowControls.push(formGroup);

                  return updatedRow;
                });
              }
              else {
                this.rows = this.rows.map(row => {
                  const formGroup = this.fb.group({
                    id: [row.id],
                    srno: [row.srno],
                    value: [row.value],
                    key: [row.key],
                    amount: [row.current_release]
                  });
                  this.rowControls.push(formGroup);
                });
              }
              if (response.data?.releases) {
                this.getInvoices();
                this.rows = response.data.releases.map((row: any) => {

                  const formGroup = this.fb.group({
                    id: [row.id],
                    invoiceId: [row.invoiceid],
                    key: [row.key],
                    amount: [row.amount]
                  });
                  this.releases.push(formGroup);
                });
              }
              if (response.data?.deductions) {
                this.rows = response.data.deductions.map((row: any) => {

                  const formGroup = this.fb.group({
                    id: [row.id],
                    key: [row.key],
                    amount: [row.amount]
                  });
                  this.deductions.push(formGroup);
                });
              }
              if (response.data?.escalations) {
                this.rows = response.data.escalations.map((row: any) => {
                  const formGroup = this.fb.group({
                    id: [row.id],
                    key: [BOQInvoice.ESC_KEY.replace('{esc}', this.invDetails.escalation)],
                    amount: [row.amount]
                  });
                  this.escalations.push(formGroup);
                });
              }
              if (response.data?.helds) {
                this.getInvoices();
                this.rows = response.data.helds.map((row: any) => {

                  const formGroup = this.fb.group({
                    id: [row.id],
                    invoiceId: [row.invoiceid],
                    key: [row.key],
                    amount: [row.amount]
                  });
                  this.helds.push(formGroup);
                });
              }
              if (response.data?.recovers) {
                this.getInvoices();
                this.rows = response.data.recovers.map((row: any) => {

                  const formGroup = this.fb.group({
                    id: [row.id],
                    invoiceId: [row.invoiceid],
                    key: [row.key],
                    amount: [row.amount]
                  });
                  this.recovers.push(formGroup);
                });
              }
              if (response?.data == null) {
                this.createEscalationRows();
              }
              this.totalRows();
            }

          });
        }
      });

    }
  }
  createEscalationRows() {
    this.escalations.clear();
    for (let i = 1; i <= this.billingYears; i++) {
      this.escalations.push(
        this.fb.group({
          key: [BOQInvoice.ESC_KEY.replace('{esc}', this.invDetails.escalation)],
          amount: [0]
        })
      );
    }
  }
  getInvoices() {
    if (this.invlist.length == 0) {
      this.isLoading = true;
      this.invoiceService.getInvoicePartial({ monthyear: this.invDetails.monthandyear, projectid: this.invDetails.projectid }, '')
        .pipe(take(1), finalize(() => this.isLoading = false)).subscribe((response: any) => {
          if (response && response.success) {
            this.invlist = response.data;
          }
        });
    }
  }
  get rowControls() {
    return this.invoiceForm.get('scopes') as FormArray;
  }

  get totalCurrentRelease(): number {
    return this.rowControls.controls.reduce(
      (sum, row) => sum + (Number(row.get('amount')?.value) || 0),
      0
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSubmit() {
    this.isBtnClicked = true;
    const { scopes, ...invoiceValue } = this.invoiceForm.getRawValue();
    var obj = { ...invoiceValue, ...this.deductionForm.value, ...this.releaseForm.value, ...this.escForm.value,...this.withHeldForm.value,...this.recoverForm.value };
    this.invoiceService.upsertReleaseInvoiceAmount(obj, '')
      .pipe(finalize(() => this.isBtnClicked = false)).subscribe((response: any) => {
        if (response && response.success) {
          this.notifyBarService.showsnackbar('The Release payment saved successfully');
          this.dialogRef.close({ valid: true });
        } else {
          this.notifyBarService.showsnackbar('Something went wrong, Please try again!!.');
        }
      })
  }
  // release 
  get releases(): FormArray {
    return this.releaseForm.get('releases') as FormArray;
  }

  addReleaseRow() {
    this.getInvoices();
    const row = this.fb.group({
      invoiceId: ['', Validators.required],
      key: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]]
    });
    this.releases.push(row);
    this.totalRows();
  }

  removeRow(index: number) {
    this.releases.removeAt(index);
    this.totalRows();
  }
  get totalRelease(): number {
    return this.releases.controls.reduce(
      (sum, row) => sum + (Number(row.get('amount')?.value) || 0),
      0
    );
  }
  // esc 

  get escalations(): FormArray {

    return this.escForm.get('escalations') as FormArray;
  }

  addEscRow() {
    const row = this.fb.group({
      key: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]]
    });
    this.escalations.push(row);
    this.totalRows();
  }

  removeEscRow(index: number) {
    this.escalations.removeAt(index);
    this.totalRows();
  }
  get totalEsc(): number {
    return this.escalations.value.reduce((sum: number, d: any) => sum + (+d.amount || 0), 0);
  }

  // held
  get helds(): FormArray {
    return this.withHeldForm.get('helds') as FormArray;
  }

  addHeldRow() {
    this.getInvoices();
    const row = this.fb.group({
      invoiceId: [''],
      key: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]]
    });
    this.helds.push(row);
    this.totalRows();
  }

  removeHeldRow(index: number) {
    this.helds.removeAt(index);
    this.totalRows();
  }
  get totalHeld(): number {
    return this.helds.value.reduce((sum: number, d: any) => sum + (+d.amount || 0), 0);
  }

  //recover
  get recovers(): FormArray {
    return this.recoverForm.get('recovers') as FormArray;
  }

  addRecoverRow() {
    this.getInvoices();
    const row = this.fb.group({
      invoiceId: [''],
      key: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]]
    });
    this.recovers.push(row);
    this.totalRows();
  }

  removeRecoverRow(index: number) {
    this.recovers.removeAt(index);
    this.totalRows();
  }
  get totalRecover(): number {
    return this.recovers.value.reduce((sum: number, d: any) => sum + (+d.amount || 0), 0);
  }

  //deduction 
  get deductions() {
    return this.deductionForm.get('deductions') as FormArray;
  }

  addDeductionRow() {
    this.deductions.push(
      this.fb.group({
        key: ['', Validators.required],
        amount: [0, [Validators.required, Validators.min(0)]],
      })
    );
    this.totalRows();
  }

  removeDeductionRow(j: number) {
    this.deductions.removeAt(j);
    this.totalRows();
  }

  get totalDeduction() {
    return this.deductions.value.reduce((sum: number, d: any) => sum + (+d.amount || 0), 0);
  }
  computeRows: any = [];
  index=0;
  totalRows() {
    this.index=1;
    this.computeRows = [];
    let total = this.rowControls.controls.reduce(
      (sum, row) => sum + (Number(row.get('amount')?.value) || 0),
      0
    );
    let totaldeduction = this.deductions.controls.reduce(
      (sum, row) => sum + (Number(row.get('amount')?.value) || 0),
      0
    );
    let totalrelease = this.releases.controls.reduce(
      (sum, row) => sum + (Number(row.get('amount')?.value) || 0),
      0
    );
    let totalesc = this.escalations.controls.reduce(
      (sum, row) => sum + (Number(row.get('amount')?.value) || 0),
      0
    );
    let totalhelds = this.helds.controls.reduce(
      (sum, row) => sum + (Number(row.get('amount')?.value) || 0),
      0
    );
    let totalrecovers = this.recovers.controls.reduce(
      (sum, row) => sum + (Number(row.get('amount')?.value) || 0),
      0
    );
    let grandTotal = total + totalrelease + totalesc - totaldeduction;
    this.computeRows.push({ srno: this.commonService.toRoman(this.index++), key: 'Grand Total', value: grandTotal, type: 'grandtotal' });
    let gstamount = grandTotal * (this.invoiceForm.value?.gst / 100);
    this.computeRows.push({ srno: this.commonService.toRoman(this.index++), key: 'GST @ ' + (this.invoiceForm.value?.gst ?? 0) + '%', value: gstamount });
    let grossamount = grandTotal + gstamount;
    this.computeRows.push({ srno: this.commonService.toRoman(this.index++), key: 'Gross Amount', value: grossamount, type: 'grandtotal' });
    let tdsamount = (grandTotal * this.invoiceForm.value?.tds) / 100;
    this.computeRows.push({ srno: this.commonService.toRoman(this.index++), key: 'TDS @ ' + (this.invoiceForm.value?.tds ?? 0) + '%', value: tdsamount });
    let tdsgstamount = (grandTotal * this.invoiceForm.value?.tdsgst) / 100;
    this.computeRows.push({ srno: this.commonService.toRoman(this.index++), key: 'TDS GST @ ' + (this.invoiceForm.value?.tdsgst ?? 0) + '%', value: tdsgstamount });
    if(this.helds && this.helds.length>0)
      this.computeRows.push({ srno: this.commonService.toRoman(this.index++), key: 'With Held Amount', value: totalhelds });
    if(this.recovers && this.recovers.length>0)
      this.computeRows.push({ srno: this.commonService.toRoman(this.index++), key: 'Recover Amount', value: totalrecovers });
    this.computeRows.push({ srno: '', key: 'Net Payable', value: (grossamount - tdsamount - tdsgstamount-totalhelds-totalrecovers), type: 'final' });
    this.invoiceForm.patchValue({
      totalrelease: (grossamount - tdsamount - tdsgstamount-totalhelds-totalrecovers)
    });
  }
}
