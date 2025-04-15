import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoqReportDocListComponent } from './boq-report-doc-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { BoqReportDocListRoutingModule } from './boq-report-doc-list.-routingmodule';



@NgModule({
  declarations: [
    BoqReportDocListComponent
  ],
  imports: [
    CommonModule,BoqReportDocListRoutingModule, SharedModule, MaterialModule
  ],
   exports:[BoqReportDocListComponent]
})
export class BoqReportDocListModule { }
