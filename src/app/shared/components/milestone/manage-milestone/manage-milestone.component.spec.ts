import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMilestoneComponent } from './manage-milestone.component';

describe('ManageMilestoneComponent', () => {
  let component: ManageMilestoneComponent;
  let fixture: ComponentFixture<ManageMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageMilestoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
