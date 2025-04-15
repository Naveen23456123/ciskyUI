import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoqOfficeFurnitureListComponent } from './boq-office-furniture-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { BoqOfficeFurnitureListRoutingModule } from './boq-office-furniture-list-routing.module';



@NgModule({
  declarations: [
    BoqOfficeFurnitureListComponent
  ],
  imports: [
    CommonModule,BoqOfficeFurnitureListRoutingModule, SharedModule,MaterialModule
  ],
  exports:[BoqOfficeFurnitureListComponent]
})
export class BoqOfficeFurnitureListModule { }
