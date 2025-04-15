import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoqDutyTravelListComponent } from './boq-duty-travel-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { BoqDutyTravelListRoutingModule } from './boq-duty-travel-list-routing.module';



@NgModule({
  declarations: [
    BoqDutyTravelListComponent
  ],
  imports: [
    CommonModule,BoqDutyTravelListRoutingModule, SharedModule,MaterialModule
  ],
  exports:[BoqDutyTravelListComponent]
})
export class BoqDutyTravelListModule { }
