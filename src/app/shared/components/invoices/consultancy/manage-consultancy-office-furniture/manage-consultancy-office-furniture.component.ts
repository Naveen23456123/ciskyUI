import { Component, inject, Inject, Optional } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { ManageOfficeFurnitureComponent } from '../../boq/manage-office-furniture/manage-office-furniture.component';
import { finalize, take } from 'rxjs';
import { untilDestroyed } from '@app/core/until-destroyed';
import { InvOfcFurnitureInterfaceService } from '@app/shared/services/external/invoice/inv-ofc-furniture-interface.service';
import { BOQ_INVOICE } from '@app/shared/models/constant.config';
import { InvoiceInterfaceService } from '@app/shared/services/external/invoice-interface.service';

@Component({
  selector: 'app-manage-consultancy-office-furniture',
  standalone: false,
  templateUrl: './manage-consultancy-office-furniture.component.html',
  styleUrl: './manage-consultancy-office-furniture.component.scss'
})
export class ManageConsultancyOfficeFurnitureComponent {
  public data: any;
  isLoading = true;
  isEdit: boolean = false;
  pageGuid: any;
  title: string = 'Add';
  ofForm: FormGroup = new FormGroup({});
  deleteof = false;
  readonly dialog = inject(MatDialog);
  boqList: any[] = [];
  private defaultdialogoptions: MatDialogConfig = {
    minWidth: '700px',
    disableClose: false,
    data: {},
  };
  empty_message = '';
  isBtnClicked = false;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageOfficeFurnitureComponent>, private formbuilder: FormBuilder,
    private sessionService: SessionService, private router: Router, private route: ActivatedRoute,
    private boqService: InvOfcFurnitureInterfaceService, private officeFurnitureService: InvOfcFurnitureInterfaceService,
    private invoiceService: InvoiceInterfaceService) {
    this.data = data || {};
  }

  checkMode(type: string) {
    if (type === 'edit' && !this.data.separate)
      this.isEdit = true;
    else if (type == 'delete') {
      this.dialogRef.updateSize('35%');
      this.deleteof = true;
    }
    else
      this.isEdit = false;
  }

  getTitle(val: string) {
    switch (val) {
      case 'add':
        this.title = 'New Office Furniture';
        break;
      case 'delete':
        this.title = 'Delete Office Furniture';
        break;
      case 'edit':
        this.title = 'Edit Office Furniture';
        break;
    }
  }

  ngOnInit() {
    this.checkMode(this.data.type);
    this.getTitle(this.data.type);
    this.ofForm = this.formbuilder.group({
      id: [''],
      invoiceid: [],
      controls: this.formbuilder.array([])
    });
    if (!this.deleteof) {
      this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((projectEntity: any) => {
        if (projectEntity && projectEntity.projectId) {
          if (!this.isEdit) {
            this.boqService.getBoqOfficeFurnitureListForInsertByProjectId({ invid: projectEntity.invoiceId, id: projectEntity.projectId }, '')
              .pipe(finalize(() => this.isLoading = false))
              .subscribe((response: any) => {
                if (response && response.success) {
                  this.boqList = response.data;
                  response.data.forEach((element: any) => {
                    this.addControls(element, projectEntity.invoiceId);
                  });
                }
                this.subscribeChange();
                this.empty_message = BOQ_INVOICE.ALL_RECORD_INSERTED_MESSAGE;
              });
          } else {
            this.addControls(this.data.element, projectEntity.invoiceId);
            this.boqList = [this.data.element];
            this.subscribeChange();
            this.isLoading = false;
          }
        }
      });
    } else {
      this.setofForm(this.data.element);
      this.isLoading = false;
    }
  }
  addControls(data: any, invId: any) {
    const group = this.formbuilder.group({
      id: [data.pid],
      boqid: [data.id],
      invoiceid: [invId],
      description: [data.description],
      currentbillmonths: [data.currentbillmonths, Validators.required],
      currentbillamount: [data.currentbill]
    });
    this.controls.push(group);
  }
  subscribeChange() {
    (this.ofForm.get('controls') as FormArray).controls.forEach((group: AbstractControl, index: number) => {
      const quantityControl = group.get('currentbillmonths');
      if (quantityControl) {
        quantityControl.statusChanges.subscribe(value => {
          setTimeout(() => {
            group.get('currentbillamount')?.setValue(quantityControl.value * (this.boqList.find(x => x.id == group.get('boqid')?.value).ratepermonth));
          });
        });
      }
    });
  }
  get controls() {
    return this.ofForm.get('controls') as FormArray;
  }
  setofForm(data: any) {
    this.ofForm.patchValue({
      id: data.id,
      description: data.description,
      unit: data.unit,
      quantity: data.quantity,
      rateperunit: data.rateperunit,
      previousbillmonths: data.previousbillmonths,
      currentbillmonths: data.currentbillmonths
    });
  }

  ngOnDestroy() { }

  submit() {
    this.isBtnClicked = true;
    this.sessionService.invoiceEntitySubject$.pipe(take(1), untilDestroyed(this)).subscribe((response: any) => {
      if (response && response.invoiceId) {
        this.ofForm.patchValue({ invoiceid: response.invoiceId });
        if (this.isEdit) {
          this.invoiceService.upsertOfcFurnitureInvoiceScope(this.ofForm.get('controls')?.value, '')
            .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked = false })).subscribe({
              next: (response: any) => {
                if (response && response.success) {
                  this.dialogRef.close({ value: this.ofForm.get('controls')?.value[0], valid: true });
                }
              },
              error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        } else {
          this.ofForm.value.id = null;
          this.invoiceService.upsertOfcFurnitureInvoiceScope(this.ofForm.get('controls')?.value, '')
            .pipe(finalize(() => { this.isLoading = false; this.isBtnClicked = false })).subscribe({
              next: (response: any) => {
                if (response && response.success) {
                  let responseData: any[] = [];
                  response.data.forEach((element: any) => {
                    responseData.push({
                      id: element.boqid,
                      boqid: element.boqid,
                      currentbillmonths: element.currentbillmonths,
                      invoiceid: element.invoiceid,
                      description: this.boqList.find((x: any) => x.id == element.boqid)?.description,
                      rate: this.boqList.find((x: any) => x.id == element.boqid)?.ratepermonth,
                      months: this.boqList.find((x: any) => x.id == element.boqid)?.numberofmonths,
                      previousbillmonths: this.boqList.find((x: any) => x.id == element.boqid)?.uptolastbill
                    })
                  });
                  this.dialogRef.close({ value: responseData, valid: true });
                } else {
                  this.dialogRef.close({ value: null, valid: false });
                }
              },
              error: (err: any) => {
                this.dialogRef.close(err);
              }
            });
        }
      }
    })
  }

  delete() {
    this.invoiceService.deleteInvoiceOfcFurnitureScope(this.data.element, '')
      .pipe(finalize(() => { this.isLoading = false; })).subscribe({
        next: (response: any) => {
          if (response && response.success)
            this.dialogRef.close({ value: this.data.element, valid: true });
        },
        error: (err: any) => {
          this.dialogRef.close(err);
        }
      });
  }

}
