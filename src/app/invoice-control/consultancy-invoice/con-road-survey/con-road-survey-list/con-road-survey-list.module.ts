import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConRoadSurveyListRoutingModule } from './con-road-survey-list-routing.module';
import { ConRoadSurveyListComponent } from './con-road-survey-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';


@NgModule({
  declarations: [
    ConRoadSurveyListComponent
  ],
  imports: [
    CommonModule,
    ConRoadSurveyListRoutingModule, SharedModule, MaterialModule
  ],
  exports:[ConRoadSurveyListComponent]
})
export class ConRoadSurveyListModule { }
