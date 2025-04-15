import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConRoadSurveyComponent } from './add-con-road-survey.component';

describe('AddConRoadSurveyComponent', () => {
  let component: AddConRoadSurveyComponent;
  let fixture: ComponentFixture<AddConRoadSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddConRoadSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConRoadSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
