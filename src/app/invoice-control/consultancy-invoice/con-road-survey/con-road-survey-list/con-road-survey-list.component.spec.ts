import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConRoadSurveyListComponent } from './con-road-survey-list.component';

describe('ConRoadSurveyListComponent', () => {
  let component: ConRoadSurveyListComponent;
  let fixture: ComponentFixture<ConRoadSurveyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConRoadSurveyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConRoadSurveyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
