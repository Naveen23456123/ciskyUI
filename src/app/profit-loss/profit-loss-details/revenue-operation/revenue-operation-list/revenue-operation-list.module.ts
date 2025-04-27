import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevenueOperationListRoutingModule } from './revenue-operation-list-routing.module';
import { RevenueOperationListComponent } from './revenue-operation-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    RevenueOperationListComponent
  ],
  imports: [
    CommonModule,
    RevenueOperationListRoutingModule, SharedModule, MaterialModule
  ],
    exports:[RevenueOperationListComponent]
})
export class RevenueOperationListModule { }
