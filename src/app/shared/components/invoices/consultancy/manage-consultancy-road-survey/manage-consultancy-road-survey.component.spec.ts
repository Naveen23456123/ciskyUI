import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsultancyRoadSurveyComponent } from './manage-consultancy-road-survey.component';

describe('ManageConsultancyRoadSurveyComponent', () => {
  let component: ManageConsultancyRoadSurveyComponent;
  let fixture: ComponentFixture<ManageConsultancyRoadSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageConsultancyRoadSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageConsultancyRoadSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
