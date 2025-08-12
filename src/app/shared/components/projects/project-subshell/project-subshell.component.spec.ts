import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSubshellComponent } from './project-subshell.component';

describe('ProjectSubshellComponent', () => {
  let component: ProjectSubshellComponent;
  let fixture: ComponentFixture<ProjectSubshellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectSubshellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSubshellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
