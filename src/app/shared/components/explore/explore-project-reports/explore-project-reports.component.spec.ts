import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreProjectReportsComponent } from './explore-project-reports.component';

describe('ExploreProjectReportsComponent', () => {
  let component: ExploreProjectReportsComponent;
  let fixture: ComponentFixture<ExploreProjectReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreProjectReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreProjectReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
