import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoqRoadSurveyComponent } from './add-boq-road-survey.component';

describe('AddBoqRoadSurveyComponent', () => {
  let component: AddBoqRoadSurveyComponent;
  let fixture: ComponentFixture<AddBoqRoadSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBoqRoadSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoqRoadSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
