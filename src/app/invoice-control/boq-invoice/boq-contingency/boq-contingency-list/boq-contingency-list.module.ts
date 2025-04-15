import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoqContingencyListComponent } from './boq-contingency-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { BoqContingencyListRoutingModule } from './boq-contingency-list-routing.module';



@NgModule({
  declarations: [
    BoqContingencyListComponent
  ],
  imports: [
    CommonModule,BoqContingencyListRoutingModule, SharedModule,MaterialModule
  ],
  exports:[BoqContingencyListComponent]
})
export class BoqContingencyListModule { }
