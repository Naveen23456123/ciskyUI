import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorMilestoneListComponent } from './contractor-milestone-list.component';

describe('ContractorMilestoneListComponent', () => {
  let component: ContractorMilestoneListComponent;
  let fixture: ComponentFixture<ContractorMilestoneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorMilestoneListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorMilestoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
