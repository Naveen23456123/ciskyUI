import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRoadSurveyComponent } from './manage-road-survey.component';

describe('ManageRoadSurveyComponent', () => {
  let component: ManageRoadSurveyComponent;
  let fixture: ComponentFixture<ManageRoadSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageRoadSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRoadSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
