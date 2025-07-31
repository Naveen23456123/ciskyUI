import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultancyInvoiceRoutingModule } from './consultancy-invoice-routing.module';
import { ConsultancyInvoiceComponent } from './consultancy-invoice.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { EditConDutyTravelComponent } from './con-duty-travel/edit-con-duty-travel/edit-con-duty-travel.component';
import { ConDutyTravelListModule } from './con-duty-travel/con-duty-travel-list/con-duty-travel-list.module';
import { ConOfcFurnitureListModule } from './con-ofc-furniture/con-ofc-furniture-list/con-ofc-furniture-list.module';
import { ConOfcRentListModule } from './con-ofc-rent/con-ofc-rent-list/con-ofc-rent-list.module';
import { ConOfcSupplyListModule } from './con-ofc-supply/con-ofc-supply-list/con-ofc-supply-list.module';
import { ConReportDocListModule } from './con-report-doc/con-report-doc-list/con-report-doc-list.module';
import { ConRoadSurveyListModule } from './con-road-survey/con-road-survey-list/con-road-survey-list.module';
import { ConStaffListModule } from './con-staff/con-staff-list/con-staff-list.module';
import { ConTransportationListModule } from './con-transportation/con-transportation-list/con-transportation-list.module';
import { ConContingencyListModule } from './con-contigency/con-contingency-list/con-contingency-list.module';


@NgModule({
  declarations: [
    ConsultancyInvoiceComponent,
    EditConDutyTravelComponent
  ],
  imports: [
    CommonModule,
    ConsultancyInvoiceRoutingModule,ConDutyTravelListModule,ConOfcFurnitureListModule,
    ConOfcRentListModule,ConOfcSupplyListModule, ConReportDocListModule,ConRoadSurveyListModule,
    ConStaffListModule,ConTransportationListModule, SharedModule,MaterialModule, ConContingencyListModule
  ]
})
export class ConsultancyInvoiceModule { }
