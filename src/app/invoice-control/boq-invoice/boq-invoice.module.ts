import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoqInvoiceRoutingModule } from './boq-invoice-routing.module';
import { BoqInvoiceComponent } from './boq-invoice.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { BoqStaffListModule } from './boq-staff/boq-staff-list/boq-staff-list.module';
import { BoqRoadSurveyListModule } from './boq-road-survey/boq-road-survey-list/boq-road-survey-list.module';
import { BoqReportDocListModule } from './boq-report-doc/boq-report-doc-list/boq-report-doc-list.module';
import { BoqOfficeFurnitureListModule } from './boq-office-furniture/boq-office-furniture-list/boq-office-furniture-list.module';
import { BoqOfficeRentListModule } from './boq-office-rent/boq-office-rent-list/boq-office-rent-list.module';
import { BoqOfficeSupplyListModule } from './boq-office-supply/boq-office-supply-list/boq-office-supply-list.module';
import { BoqContingencyListModule } from './boq-contingency/boq-contingency-list/boq-contingency-list.module';
import { BoqDutyTravelListModule } from './boq-duty-travel/boq-duty-travel-list/boq-duty-travel-list.module';
import { BoqTransportationListModule } from './boq-transportation/boq-transportation-list/boq-transportation-list.module';


@NgModule({
  declarations: [
    BoqInvoiceComponent,
  ],
  imports: [
    CommonModule,
    BoqInvoiceRoutingModule,BoqStaffListModule,
    BoqRoadSurveyListModule,BoqReportDocListModule,BoqOfficeFurnitureListModule,
    BoqOfficeRentListModule,BoqOfficeSupplyListModule, BoqContingencyListModule,
    BoqDutyTravelListModule,BoqTransportationListModule, SharedModule, MaterialModule
  ]
})
export class BoqInvoiceModule { }
