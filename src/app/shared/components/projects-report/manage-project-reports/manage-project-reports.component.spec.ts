import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectReportsComponent } from './manage-project-reports.component';

describe('ManageProjectReportsComponent', () => {
  let component: ManageProjectReportsComponent;
  let fixture: ComponentFixture<ManageProjectReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageProjectReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProjectReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
