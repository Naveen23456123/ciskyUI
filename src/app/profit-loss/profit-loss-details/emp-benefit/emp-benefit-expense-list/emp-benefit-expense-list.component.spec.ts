import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBenefitExpenseListComponent } from './emp-benefit-expense-list.component';

describe('EmpBenefitExpenseListComponent', () => {
  let component: EmpBenefitExpenseListComponent;
  let fixture: ComponentFixture<EmpBenefitExpenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpBenefitExpenseListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpBenefitExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
