import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoqRoadSurveyComponent } from './delete-boq-road-survey.component';

describe('DeleteBoqRoadSurveyComponent', () => {
  let component: DeleteBoqRoadSurveyComponent;
  let fixture: ComponentFixture<DeleteBoqRoadSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBoqRoadSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBoqRoadSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
