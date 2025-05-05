import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreMilestoneComponent } from './explore-milestone.component';

describe('ExploreMilestoneComponent', () => {
  let component: ExploreMilestoneComponent;
  let fixture: ComponentFixture<ExploreMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreMilestoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
