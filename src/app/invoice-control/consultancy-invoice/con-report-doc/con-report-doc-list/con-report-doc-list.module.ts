import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConReportDocListRoutingModule } from './con-report-doc-list-routing.module';
import { ConReportDocListComponent } from './con-report-doc-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ConReportDocListComponent
  ],
  imports: [
    CommonModule,
    ConReportDocListRoutingModule, SharedModule, MaterialModule
  ],
  exports:[ConReportDocListComponent]
})
export class ConReportDocListModule { }
