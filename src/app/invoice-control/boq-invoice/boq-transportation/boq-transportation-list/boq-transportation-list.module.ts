import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoqTransportationListComponent } from './boq-transportation-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { BoqTransportationListRoutingModule } from './boq-transportation-list-routing.module';



@NgModule({
  declarations: [
    BoqTransportationListComponent
  ],
  imports: [
    CommonModule, BoqTransportationListRoutingModule, SharedModule, MaterialModule
  ],
   exports:[BoqTransportationListComponent]
})
export class BoqTransportationListModule { }
