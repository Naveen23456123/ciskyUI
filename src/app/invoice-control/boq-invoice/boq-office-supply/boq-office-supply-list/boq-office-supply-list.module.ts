import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoqOfficeSupplyListComponent } from './boq-office-supply-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { BoqOfficeSupplyListRoutingModule } from './boq-office-supply-list-routing.module';



@NgModule({
  declarations: [
    BoqOfficeSupplyListComponent
  ],
  imports: [
    CommonModule,BoqOfficeSupplyListRoutingModule, SharedModule,MaterialModule
  ],
  exports:[BoqOfficeSupplyListComponent]
})
export class BoqOfficeSupplyListModule { }
