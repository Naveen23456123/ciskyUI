import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpBenefitExpenseComponent } from './add-emp-benefit-expense.component';

describe('AddEmpBenefitExpenseComponent', () => {
  let component: AddEmpBenefitExpenseComponent;
  let fixture: ComponentFixture<AddEmpBenefitExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmpBenefitExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmpBenefitExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
