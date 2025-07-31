import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReportsListComponent } from './project-reports-list.component';

describe('ProjectReportsListComponent', () => {
  let component: ProjectReportsListComponent;
  let fixture: ComponentFixture<ProjectReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectReportsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
