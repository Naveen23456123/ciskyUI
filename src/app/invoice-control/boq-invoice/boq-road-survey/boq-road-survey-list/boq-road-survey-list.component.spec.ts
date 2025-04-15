import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqRoadSurveyListComponent } from './boq-road-survey-list.component';

describe('BoqRoadSurveyListComponent', () => {
  let component: BoqRoadSurveyListComponent;
  let fixture: ComponentFixture<BoqRoadSurveyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoqRoadSurveyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoqRoadSurveyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
