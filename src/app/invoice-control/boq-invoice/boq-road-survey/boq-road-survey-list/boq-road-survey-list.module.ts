import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoqRoadSurveyListComponent } from './boq-road-survey-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { BoqRoadSurveyListRoutingModule } from './boq-road-survey-list-routing.module';



@NgModule({
  declarations: [
    BoqRoadSurveyListComponent
  ],
  imports: [
    CommonModule,BoqRoadSurveyListRoutingModule, SharedModule, MaterialModule
  ],
  exports:[BoqRoadSurveyListComponent]
})
export class BoqRoadSurveyListModule { }
