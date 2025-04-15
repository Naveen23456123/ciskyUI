import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoqOfficeRentListComponent } from './boq-office-rent-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { BoqOfficeRentListRoutingModule } from './boq-office-rent-list-routing.module';



@NgModule({
  declarations: [
    BoqOfficeRentListComponent
  ],
  imports: [
    CommonModule,BoqOfficeRentListRoutingModule, SharedModule,MaterialModule
  ],
  exports:[BoqOfficeRentListComponent]
})
export class BoqOfficeRentListModule { }
