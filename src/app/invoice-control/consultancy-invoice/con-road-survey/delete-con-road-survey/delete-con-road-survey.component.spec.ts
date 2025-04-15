import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConRoadSurveyComponent } from './delete-con-road-survey.component';

describe('DeleteConRoadSurveyComponent', () => {
  let component: DeleteConRoadSurveyComponent;
  let fixture: ComponentFixture<DeleteConRoadSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConRoadSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConRoadSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
