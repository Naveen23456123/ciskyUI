import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultantAccountListRoutingModule } from './consultant-account-list-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { ConsultantAccountListComponent } from './consultant-account-list.component';


@NgModule({
  declarations: [ConsultantAccountListComponent],
  imports: [
    CommonModule,
    ConsultantAccountListRoutingModule, SharedModule, MaterialModule
  ]
})
export class ConsultantAccountListModule { }
