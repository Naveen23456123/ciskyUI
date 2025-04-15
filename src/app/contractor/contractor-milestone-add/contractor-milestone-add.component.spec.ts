import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorMilestoneAddComponent } from './contractor-milestone-add.component';

describe('ContractorMilestoneAddComponent', () => {
  let component: ContractorMilestoneAddComponent;
  let fixture: ComponentFixture<ContractorMilestoneAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorMilestoneAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorMilestoneAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
