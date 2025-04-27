import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEmpBenefitExpenseComponent } from './delete-emp-benefit-expense.component';

describe('DeleteEmpBenefitExpenseComponent', () => {
  let component: DeleteEmpBenefitExpenseComponent;
  let fixture: ComponentFixture<DeleteEmpBenefitExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteEmpBenefitExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEmpBenefitExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
