import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoqRoadSurveyComponent } from './edit-boq-road-survey.component';

describe('EditBoqRoadSurveyComponent', () => {
  let component: EditBoqRoadSurveyComponent;
  let fixture: ComponentFixture<EditBoqRoadSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBoqRoadSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBoqRoadSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
