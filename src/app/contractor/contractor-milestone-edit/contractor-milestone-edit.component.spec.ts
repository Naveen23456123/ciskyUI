import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorMilestoneEditComponent } from './contractor-milestone-edit.component';

describe('ContractorMilestoneEditComponent', () => {
  let component: ContractorMilestoneEditComponent;
  let fixture: ComponentFixture<ContractorMilestoneEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorMilestoneEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorMilestoneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
