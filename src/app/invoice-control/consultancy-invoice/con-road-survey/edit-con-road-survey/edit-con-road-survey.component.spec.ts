import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConRoadSurveyComponent } from './edit-con-road-survey.component';

describe('EditConRoadSurveyComponent', () => {
  let component: EditConRoadSurveyComponent;
  let fixture: ComponentFixture<EditConRoadSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditConRoadSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConRoadSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
