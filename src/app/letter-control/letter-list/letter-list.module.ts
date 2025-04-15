import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LetterListRoutingModule } from './letter-list-routing.module';
import { LetterListComponent } from './letter-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    LetterListComponent
  ],
  imports: [
    CommonModule,
    LetterListRoutingModule, SharedModule,MaterialModule
  ]
})
export class LetterListModule { }
